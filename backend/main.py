import json
import os
import smtplib
import httpx
from email.mime.text import MIMEText
from datetime import datetime, timedelta
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import fitz  # PyMuPDF
from dotenv import load_dotenv
from apscheduler.schedulers.background import BackgroundScheduler
from fast_flights import FlightData, Passengers, create_filter, get_flights as ff_get_flights

load_dotenv()

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

GROQ_URL = "https://api.groq.com/openai/v1/chat/completions"
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
MODEL = "llama-3.3-70b-versatile"


class AnalyzeRequest(BaseModel):
    resume: str
    job_description: str


async def ask_llm(prompt: str) -> str:
    headers = {"Authorization": f"Bearer {GROQ_API_KEY}", "Content-Type": "application/json"}
    body = {"model": MODEL, "messages": [{"role": "user", "content": prompt}], "temperature": 0.3}
    async with httpx.AsyncClient(timeout=60) as client:
        resp = await client.post(GROQ_URL, json=body, headers=headers)
        return resp.json()["choices"][0]["message"]["content"]


async def extract_resume(resume: str) -> dict:
    prompt = f"""Analyze this resume and return ONLY valid JSON with these keys:
- skills: list of technical skills
- tools: list of tools/frameworks
- domains: list of domain areas
- experience_summary: one sentence summary
- likely_roles: list of 3-5 roles this person could fill

Resume:
{resume}

Return ONLY the JSON object, no explanation."""
    raw = await ask_llm(prompt)
    return parse_json(raw)


async def extract_job(jd: str) -> dict:
    prompt = f"""Analyze this job description and return ONLY valid JSON with these keys:
- role_title: the job title
- required_skills: list of required skills
- preferred_skills: list of preferred/bonus skills
- responsibilities: list of key responsibilities
- seniority: junior/mid/senior

Job Description:
{jd}

Return ONLY the JSON object, no explanation."""
    raw = await ask_llm(prompt)
    return parse_json(raw)


async def compare(resume_profile: dict, job_profile: dict) -> dict:
    prompt = f"""You are a career advisor. Compare this candidate profile with the job requirements.

Candidate Profile:
{json.dumps(resume_profile)}

Job Requirements:
{json.dumps(job_profile)}

Return ONLY valid JSON with these keys:
- match_score: number 0-100
- strengths: list of 3-5 matching strengths
- gaps: list of 3-5 missing skills or gaps
- reasoning: 2-3 sentence explanation of the score
- suggested_roles: list of 3-5 roles this candidate would fit well
- learning_roadmap: list of 3-5 specific things to learn next to improve fit

Return ONLY the JSON object, no explanation."""
    raw = await ask_llm(prompt)
    return parse_json(raw)


def parse_json(text: str) -> dict:
    text = text.strip()
    # Try to extract JSON from markdown code blocks
    if "```" in text:
        start = text.find("```")
        end = text.rfind("```")
        inner = text[start:end].split("\n", 1)[-1] if start != end else text
        text = inner.strip()
    # Try direct parse
    try:
        return json.loads(text)
    except json.JSONDecodeError:
        # Find first { and last }
        s, e = text.find("{"), text.rfind("}")
        if s != -1 and e != -1:
            try:
                return json.loads(text[s:e + 1])
            except json.JSONDecodeError:
                pass
    return {"error": "Failed to parse LLM response", "raw": text[:500]}


@app.post("/analyze-match")
async def analyze_match(req: AnalyzeRequest):
    resume_profile = await extract_resume(req.resume)
    job_profile = await extract_job(req.job_description)
    result = await compare(resume_profile, job_profile)
    return {
        "resume_profile": resume_profile,
        "job_profile": job_profile,
        "analysis": result,
    }


@app.post("/extract-pdf")
async def extract_pdf(file: UploadFile = File(...)):
    content = await file.read()
    doc = fitz.open(stream=content, filetype="pdf")
    text = "\n".join(page.get_text() for page in doc)
    doc.close()
    return {"text": text}


# ── Flight Tracker ────────────────────────────────────────────────────────────

PRICES_FILE = "flight_prices.json"
CONFIG_FILE = "flight_config.json"

_DEFAULT_CFG = {
    "routes": [],
    "threshold": 550,
    "alert_email": os.getenv("ALERT_EMAIL", ""),
    "days_ahead": 30,
}

def _load_config():
    if os.path.exists(CONFIG_FILE):
        with open(CONFIG_FILE) as f:
            return {**_DEFAULT_CFG, **json.load(f)}
    return _DEFAULT_CFG.copy()

def _save_config(cfg):
    with open(CONFIG_FILE, "w") as f:
        json.dump(cfg, f)

def _load_prices():
    if os.path.exists(PRICES_FILE):
        with open(PRICES_FILE) as f:
            return json.load(f)
    return {}

def _save_prices(p):
    with open(PRICES_FILE, "w") as f:
        json.dump(p, f)

def _send_alert(subject, body):
    gmail_user = os.getenv("GMAIL_USER", "")
    gmail_pass = os.getenv("GMAIL_APP_PASSWORD", "")
    cfg = _load_config()
    to = cfg.get("alert_email") or gmail_user
    if not gmail_user or not gmail_pass or not to:
        return
    msg = MIMEText(body)
    msg["Subject"] = subject
    msg["From"] = gmail_user
    msg["To"] = to
    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as s:
        s.login(gmail_user, gmail_pass)
        s.send_message(msg)

def run_tracker():
    cfg = _load_config()
    if not cfg["routes"]:
        return
    last = _load_prices()
    alerts = []
    for route in cfg["routes"]:
        for days in range(1, cfg["days_ahead"] + 1):
            date = (datetime.today() + timedelta(days=days)).strftime("%Y-%m-%d")
            key = f"{route['from']}-{route['to']}-{date}"
            try:
                f = create_filter(
                    flight_data=[FlightData(date=date, from_airport=route["from"], to_airport=route["to"])],
                    seat="economy", trip="one-way", passengers=Passengers(adults=1),
                )
                res = ff_get_flights(f)
                prices = [fl.price for fl in res.flights if fl.price]
                if not prices:
                    continue
                price = min(prices)
            except Exception:
                continue
            prev = last.get(key)
            last[key] = price
            if price <= cfg["threshold"]:
                alerts.append(f"✈️ {route['from']} → {route['to']} on {date}: ${price}")
            elif prev and price < prev:
                alerts.append(f"📉 {route['from']} → {route['to']} on {date}: ${price} (was ${prev})")
    _save_prices(last)
    if alerts:
        _send_alert(
            f"✈️ Flight Deal Alert — {datetime.today().strftime('%Y-%m-%d')}",
            "\n".join(alerts),
        )

try:
    scheduler = BackgroundScheduler()
    scheduler.add_job(run_tracker, "interval", hours=6)
    scheduler.start()
except Exception as e:
    print(f"Scheduler failed to start: {e}")


class FlightConfig(BaseModel):
    routes: list
    threshold: float
    alert_email: str
    days_ahead: int = 30

@app.get("/api/flights/config")
def get_flight_config():
    return _load_config()

@app.post("/api/flights/config")
def set_flight_config(cfg: FlightConfig):
    existing = _load_config()
    existing.update(cfg.dict())
    _save_config(existing)
    return {"status": "saved"}

@app.post("/api/flights/run-now")
def run_now():
    run_tracker()
    return {"status": "done"}

@app.get("/api/flights/prices")
def get_prices():
    return _load_prices()
