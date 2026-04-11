import json
import os
import httpx
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import fitz  # PyMuPDF
from dotenv import load_dotenv

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
