import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../components/ui/button.jsx";

const API = import.meta.env.PROD
  ? "https://website-s4yl.onrender.com"
  : `http://${window.location.hostname}:8001`;

/* ── Architecture Pipeline ── */
const steps = [
  { icon: "📄", label: "Upload", desc: "Resume PDF / Text", color: "from-blue-500/20 to-blue-600/5" },
  { icon: "🔍", label: "Extract", desc: "Document Parsing", color: "from-purple-500/20 to-purple-600/5" },
  { icon: "🧠", label: "LLM", desc: "Llama 3.3 70B", color: "from-amber-500/20 to-amber-600/5" },
  { icon: "⚡", label: "Orchestrate", desc: "FastAPI Pipeline", color: "from-emerald-500/20 to-emerald-600/5" },
  { icon: "📊", label: "Results", desc: "Score · Gaps · Plan", color: "from-rose-500/20 to-rose-600/5" },
];

const techStack = ["FastAPI", "Groq API", "Llama 3.3 70B", "Docker", "React", "PyMuPDF", "Python"];

function Pipeline() {
  return (
    <div className="relative mt-10 mb-2 p-6 rounded-2xl border dark:border-neutral-800 bg-gradient-to-br from-neutral-50 to-white dark:from-neutral-900/50 dark:to-neutral-950">
      <p className="text-xs uppercase tracking-widest text-muted-foreground mb-5 font-medium">System Architecture</p>
      <div className="flex flex-col md:flex-row items-stretch gap-3 md:gap-0">
        {steps.map((s, i) => (
          <div key={i} className="flex items-center flex-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08, type: "spring", stiffness: 200 }}
              className={`flex flex-col items-center justify-center w-full py-4 px-3 rounded-xl bg-gradient-to-b ${s.color} border dark:border-neutral-800 hover:scale-105 transition-transform cursor-default`}
            >
              <span className="text-3xl drop-shadow-sm">{s.icon}</span>
              <span className="text-sm font-semibold mt-2">{s.label}</span>
              <span className="text-[11px] text-muted-foreground mt-0.5">{s.desc}</span>
            </motion.div>
            {i < steps.length - 1 && (
              <motion.div
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 + 0.1 }}
                className="hidden md:flex items-center px-1"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-neutral-400 dark:text-neutral-600">
                  <path d="M5 12h14m-4-4 4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {techStack.map((t, i) => (
          <motion.span
            key={t}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 + i * 0.04 }}
            className="inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-medium bg-white dark:bg-neutral-900 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400"
          >
            {t}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

/* ── Score Ring ── */
function ScoreRing({ score }) {
  const r = 54, c = 2 * Math.PI * r;
  const offset = c - (score / 100) * c;
  const color = score >= 70 ? "#22c55e" : score >= 40 ? "#eab308" : "#ef4444";
  return (
    <div className="relative w-40 h-40 mx-auto">
      <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
        <circle cx="60" cy="60" r={r} fill="none" stroke="currentColor" className="text-neutral-200 dark:text-neutral-800" strokeWidth="8" />
        <motion.circle
          cx="60" cy="60" r={r} fill="none" stroke={color} strokeWidth="8" strokeLinecap="round"
          strokeDasharray={c} initial={{ strokeDashoffset: c }} animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          className="text-4xl font-bold"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
        >{score}</motion.span>
        <span className="text-xs text-muted-foreground">/100</span>
      </div>
    </div>
  );
}

/* ── Result Card ── */
function ResultCard({ title, icon, color, children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className={`rounded-2xl border dark:border-neutral-800 overflow-hidden`}
    >
      <div className={`px-5 py-3 border-b dark:border-neutral-800 bg-gradient-to-r ${color}`}>
        <h3 className="font-semibold text-sm flex items-center gap-2">{icon} {title}</h3>
      </div>
      <div className="p-5">{children}</div>
    </motion.div>
  );
}

/* ── Loading Pulse ── */
function LoadingPulse() {
  return (
    <div className="mt-10 flex flex-col items-center gap-4">
      <div className="relative w-20 h-20">
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-blue-500/30"
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div
          className="absolute inset-2 rounded-full border-2 border-blue-500/50"
          animate={{ scale: [1, 1.3, 1], opacity: [0.7, 0.1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
        />
        <div className="absolute inset-4 rounded-full bg-blue-500/10 flex items-center justify-center">
          <span className="text-2xl">🧠</span>
        </div>
      </div>
      <p className="text-sm text-muted-foreground animate-pulse">Analyzing with Llama 3.3 70B…</p>
    </div>
  );
}

/* ── Main Page ── */
export default function CareerAnalyzer() {
  const [resume, setResume] = useState("");
  const [jd, setJd] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [controller, setController] = useState(null);
  const [dark, setDark] = useState(() => {
    if (typeof window === "undefined") return false;
    return document.documentElement.classList.contains("dark");
  });

  function toggleTheme() {
    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    setDark(isDark);
  }

  async function analyze() {
    const ac = new AbortController();
    setController(ac);
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch(`${API}/analyze-match`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resume, job_description: jd }),
        signal: ac.signal,
      });
      if (!res.ok) throw new Error("Backend error");
      setResult(await res.json());
    } catch (e) {
      if (e.name === "AbortError") setError("Analysis cancelled.");
      else setError(e.message);
    } finally {
      setLoading(false);
      setController(null);
    }
  }

  function stop() { controller?.abort(); }

  const analysis = result?.analysis;

  return (
    <main className="min-h-dvh bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      {/* Nav */}
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-black/30 border-b dark:border-neutral-900">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link to="/" className="font-semibold tracking-tight">amogha.dev</Link>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={toggleTheme}>
              {dark ? "Light" : "Dark"}
            </Button>
            <Link className="text-sm hover:opacity-80 underline underline-offset-4" to="/">← Portfolio</Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden border-b dark:border-neutral-900">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-blue-950/20 dark:via-neutral-950 dark:to-purple-950/20" />
        <div className="relative max-w-6xl mx-auto px-4 py-14 md:py-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-900/30 px-3 py-1 text-xs font-medium text-blue-700 dark:text-blue-300 mb-4">
              🚀 AI-Powered Career Analysis
            </span>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
              Career Opportunity<br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Analyzer</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
              Upload your resume and a job description. Get an AI-powered match score,
              skill gap analysis, and a personalized learning roadmap in seconds.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4">
        {/* Architecture */}
        <Pipeline />

        {/* Input Section */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Try it out</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {/* Resume */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Resume</label>
                <label className="cursor-pointer text-xs px-3 py-1.5 rounded-lg border hover:bg-neutral-50 dark:hover:bg-neutral-800 dark:border-neutral-700 inline-flex items-center gap-1.5 transition-colors">
                  📄 Upload PDF
                  <input type="file" accept=".pdf" className="hidden"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const form = new FormData();
                      form.append("file", file);
                      try {
                        const res = await fetch(`${API}/extract-pdf`, { method: "POST", body: form });
                        const data = await res.json();
                        setResume(data.text);
                      } catch (err) { setError("PDF extraction failed: " + err.message); }
                      e.target.value = "";
                    }}
                  />
                </label>
              </div>
              <textarea
                className="w-full h-52 rounded-xl border dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 p-4 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-shadow"
                placeholder="Paste your resume text here or upload a PDF…"
                value={resume} onChange={(e) => setResume(e.target.value)}
              />
            </div>
            {/* JD */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Job Description</label>
              <textarea
                className="w-full h-52 rounded-xl border dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 p-4 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-shadow mt-2"
                placeholder="Paste the job description here…"
                value={jd} onChange={(e) => setJd(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-5 flex items-center gap-3">
            <Button onClick={analyze} disabled={loading || !resume.trim() || !jd.trim()}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 hover:opacity-90 px-6"
            >
              {loading ? "Analyzing…" : "⚡ Analyze Fit"}
            </Button>
            {loading && <Button variant="outline" onClick={stop}>✕ Stop</Button>}
          </div>

          {error && <p className="mt-4 text-red-500 text-sm">Error: {error}</p>}
        </div>

        {/* Loading */}
        <AnimatePresence>{loading && <LoadingPulse />}</AnimatePresence>

        {/* Results */}
        <AnimatePresence>
          {analysis && !analysis.error && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="mt-12 mb-16 space-y-6"
            >
              {/* Score */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                className="rounded-2xl border dark:border-neutral-800 p-8 text-center bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-900/50 dark:to-neutral-950"
              >
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">Match Score</p>
                <ScoreRing score={analysis.match_score} />
                {analysis.reasoning && (
                  <p className="mt-5 text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">{analysis.reasoning}</p>
                )}
              </motion.div>

              <div className="grid md:grid-cols-2 gap-5">
                <ResultCard title="Strengths" icon="✅" color="from-green-50 to-transparent dark:from-green-950/20 dark:to-transparent" delay={0.1}>
                  <ul className="space-y-2 text-sm">
                    {analysis.strengths?.map((s, i) => (
                      <motion.li key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.05 }}
                        className="flex items-start gap-2"><span className="text-green-500 mt-0.5">●</span>{s}</motion.li>
                    ))}
                  </ul>
                </ResultCard>

                <ResultCard title="Gaps to Address" icon="🔴" color="from-red-50 to-transparent dark:from-red-950/20 dark:to-transparent" delay={0.2}>
                  <ul className="space-y-2 text-sm">
                    {analysis.gaps?.map((g, i) => (
                      <motion.li key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.05 }}
                        className="flex items-start gap-2"><span className="text-red-500 mt-0.5">●</span>{g}</motion.li>
                    ))}
                  </ul>
                </ResultCard>

                <ResultCard title="Suggested Roles" icon="🎯" color="from-blue-50 to-transparent dark:from-blue-950/20 dark:to-transparent" delay={0.3}>
                  <div className="flex flex-wrap gap-2">
                    {analysis.suggested_roles?.map((r, i) => (
                      <motion.span key={i} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 + i * 0.05 }}
                        className="inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-900/30 px-3 py-1.5 text-xs font-medium text-blue-700 dark:text-blue-300"
                      >{r}</motion.span>
                    ))}
                  </div>
                </ResultCard>

                <ResultCard title="Learning Roadmap" icon="🗺️" color="from-amber-50 to-transparent dark:from-amber-950/20 dark:to-transparent" delay={0.4}>
                  <ol className="space-y-2 text-sm">
                    {analysis.learning_roadmap?.map((l, i) => (
                      <motion.li key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.05 }}
                        className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-xs font-bold flex items-center justify-center">{i + 1}</span>
                        {l}
                      </motion.li>
                    ))}
                  </ol>
                </ResultCard>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {analysis?.error && (
          <p className="mt-6 text-red-500 text-sm">LLM parsing error: {analysis.raw?.slice(0, 300)}</p>
        )}
      </div>
    </main>
  );
}
