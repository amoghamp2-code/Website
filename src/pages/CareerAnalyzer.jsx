import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button.jsx";
import { Card, CardContent } from "../components/ui/card.jsx";

const API = import.meta.env.PROD
  ? "https://website-s4yl.onrender.com"
  : `http://${window.location.hostname}:8001`;

export default function CareerAnalyzer() {
  const [resume, setResume] = useState("");
  const [jd, setJd] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [controller, setController] = useState(null);

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

  function stop() {
    controller?.abort();
  }

  const analysis = result?.analysis;

  return (
    <main className="min-h-dvh bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <header className="border-b dark:border-neutral-900">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link to="/" className="font-semibold tracking-tight">amogha.dev</Link>
          <Link className="text-sm hover:opacity-80" to="/">← Home</Link>
        </div>
      </header>

      <section className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">AI Career Opportunity Analyzer</h1>
          <p className="mt-2 text-muted-foreground">
            Paste your resume and a job description to get a structured match analysis powered by a local LLM.
          </p>

          {/* Inputs */}
          <div className="grid md:grid-cols-2 gap-4 mt-8">
            <div>
              <label className="block text-sm font-medium mb-2">Resume</label>
              <div className="flex gap-2 mb-2">
                <label className="cursor-pointer text-xs px-3 py-1.5 rounded-lg border hover:bg-neutral-50 dark:hover:bg-neutral-800 dark:border-neutral-700 inline-flex items-center gap-1">
                  📄 Upload PDF
                  <input
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const form = new FormData();
                      form.append("file", file);
                      try {
                        const res = await fetch(`${API}/extract-pdf`, { method: "POST", body: form });
                        const data = await res.json();
                        setResume(data.text);
                      } catch (err) {
                        setError("PDF extraction failed: " + err.message);
                      }
                      e.target.value = "";
                    }}
                  />
                </label>
              </div>
              <textarea
                className="w-full h-48 rounded-xl border dark:border-neutral-800 bg-white dark:bg-neutral-900 p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-neutral-400"
                placeholder="Paste your resume text here or upload a PDF..."
                value={resume}
                onChange={(e) => setResume(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Job Description</label>
              <textarea
                className="w-full h-48 rounded-xl border dark:border-neutral-800 bg-white dark:bg-neutral-900 p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-neutral-400"
                placeholder="Paste the job description here..."
                value={jd}
                onChange={(e) => setJd(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <Button
              onClick={analyze}
              disabled={loading || !resume.trim() || !jd.trim()}
            >
              {loading ? "Analyzing…" : "Analyze Fit"}
            </Button>
            {loading && (
              <Button variant="outline" onClick={stop}>
                ✕ Stop
              </Button>
            )}
          </div>

          {error && <p className="mt-4 text-red-500 text-sm">Error: {error}</p>}

          {/* Results */}
          {analysis && !analysis.error && (
            <div className="mt-10 space-y-6">
              {/* Score */}
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-sm text-muted-foreground uppercase tracking-wide">Match Score</p>
                  <p className="text-5xl font-bold mt-1">{analysis.match_score}<span className="text-2xl text-muted-foreground">/100</span></p>
                  {analysis.reasoning && <p className="mt-3 text-sm text-muted-foreground max-w-xl mx-auto">{analysis.reasoning}</p>}
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Strengths */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-medium text-green-700 dark:text-green-400">✓ Strengths</h3>
                    <ul className="mt-3 space-y-1 text-sm list-disc pl-5">
                      {analysis.strengths?.map((s, i) => <li key={i}>{s}</li>)}
                    </ul>
                  </CardContent>
                </Card>

                {/* Gaps */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-medium text-red-700 dark:text-red-400">✗ Gaps</h3>
                    <ul className="mt-3 space-y-1 text-sm list-disc pl-5">
                      {analysis.gaps?.map((g, i) => <li key={i}>{g}</li>)}
                    </ul>
                  </CardContent>
                </Card>

                {/* Suggested Roles */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-medium">Suggested Roles</h3>
                    <ul className="mt-3 space-y-1 text-sm list-disc pl-5">
                      {analysis.suggested_roles?.map((r, i) => <li key={i}>{r}</li>)}
                    </ul>
                  </CardContent>
                </Card>

                {/* Learning Roadmap */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-medium">Learning Roadmap</h3>
                    <ol className="mt-3 space-y-1 text-sm list-decimal pl-5">
                      {analysis.learning_roadmap?.map((l, i) => <li key={i}>{l}</li>)}
                    </ol>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {analysis?.error && (
            <p className="mt-6 text-red-500 text-sm">LLM parsing error: {analysis.raw?.slice(0, 300)}</p>
          )}
        </div>
      </section>
    </main>
  );
}
