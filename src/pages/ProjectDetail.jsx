// src/pages/ProjectDetail.jsx
import { Link, useParams } from "react-router-dom";
import { projects } from "@/data/projects.js";

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find(p => p.slug === slug);

  if (!project) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-2xl font-semibold">Not found</h1>
        <p className="mt-2 text-muted-foreground">The project you’re looking for doesn’t exist.</p>
        <Link to="/" className="mt-6 inline-block underline underline-offset-4">← Back to home</Link>
      </main>
    );
  }

  const { title, desc, tags, detail } = project;

  return (
    <main className="min-h-dvh">
      <header className="border-b dark:border-neutral-900">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link to="/" className="font-semibold tracking-tight">amogha.dev</Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link className="hover:opacity-80" to="/">Home</Link>
          </nav>
        </div>
      </header>

      <section className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4">
          <Link to="/" className="text-sm underline underline-offset-4">← Back</Link>
          <h1 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">{title}</h1>
          <p className="mt-2 text-muted-foreground">{desc}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((t, i) => (
              <span key={i} className="inline-flex items-center rounded-full border px-3 py-1 text-xs bg-white/60 dark:bg-white/5 dark:border-neutral-800">
                {t}
              </span>
            ))}
          </div>

          <div className="prose prose-neutral dark:prose-invert mt-8 max-w-none">
            <h3>Problem</h3>
            <p>{detail.problem}</p>
            <h3>Approach</h3>
            <ul>{detail.approach.map((a, i) => <li key={i}>{a}</li>)}</ul>
            <h3>Results</h3>
            <ul>{detail.results.map((r, i) => <li key={i}>{r}</li>)}</ul>
          </div>
        </div>
      </section>
    </main>
  );
}
