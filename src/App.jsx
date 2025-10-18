import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, FileDown } from "lucide-react";
import { Link } from "react-router-dom";
import { projects } from "@/data/projects.js";
import HeroMinimal from "./sections/HeroMinimal.jsx";
import { Button } from "./components/ui/button.jsx";
import { Card, CardContent } from "./components/ui/card.jsx";
import { Badge } from "./components/ui/badge.jsx";

/* Theme handler */
function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "light";
    return localStorage.getItem("theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  });

  useEffect(() => {
    const root = document.documentElement;
    theme === "dark" ? root.classList.add("dark") : root.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return { theme, toggle: () => setTheme(t => (t === "dark" ? "light" : "dark")) };
}

/* Personal Info */
const ME = {
  name: "Amogha M P",
  title: "Embedded Systems Developer",
  tagline: "Rust · C/C++ · Embedded Linux/Yocto · RTOS · Drivers · BLE · OTA",
  email: "amoghamp@gmail.com",
  phone: "+49 155 1021 7648",
  linkedin: "https://www.linkedin.com/in/amogha-m-p-7978881a7/",
  github: "#",
  resume: "/Amogha_CV.pdf",
  reference: "/Belden_Reference.pdf",
  location: "Stuttgart, Germany",
};

/* Marquee Skills */
const skills = [
  "Embedded C/C++17/20", "Rust", "Yocto/Embedded Linux", "Zephyr/FreeRTOS",
  "SPI · I²C · UART · CAN", "BLE/MQTT", "Device Drivers", "Secure Boot/OTA",
  "CMake", "clang-tidy", "Cppcheck", "Unit Testing", "AUTOSAR · ISO 26262 · ASPICE"
];

/* Layout helper */
function Section({ id, title, children, subtitle }) {
  return (
    <section id={id} className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">{title}</h2>
          {subtitle && <p className="text-muted-foreground mt-2 max-w-3xl">{subtitle}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}

export default function App() {
  const { theme, toggle } = useTheme();

  return (
    <div className="min-h-dvh bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      {/* NAV */}
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-black/30 border-b dark:border-neutral-900">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link to="/" className="font-semibold tracking-tight">amogha.dev</Link>
          <nav className="hidden md:flex items-center gap-6 text-sm uppercase tracking-wide">
            <a className="hover:opacity-80" href="#work">Work</a>
            <a className="hover:opacity-80" href="#experience">Experience</a>
            <a className="hover:opacity-80" href="#contact">Contact</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={toggle}>
              {theme === "dark" ? "Light" : "Dark"}
            </Button>
            <a href={ME.resume} target="_blank" rel="noreferrer">
              <Button size="sm" className="hidden sm:inline-flex"><FileDown className="h-4 w-4 mr-2" />Resume</Button>
            </a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <HeroMinimal
        name={ME.name}
        role={ME.title}
        tagline={ME.tagline}
        resumeHref={ME.resume}
        photo="/amogha-portrait.png"
      />

      {/* SKILLS marquee */}
      <section className="border-y dark:border-neutral-900 py-3">
        <div className="max-w-6xl mx-auto px-4 overflow-hidden">
          <div className="animate-[scroll_30s_linear_infinite] whitespace-nowrap text-sm md:text-base">
            {skills.concat(skills).map((s, i) => (
              <span key={i} className="inline-flex items-center gap-2 mr-5 opacity-80">
                <span>•</span> {s}
              </span>
            ))}
          </div>
        </div>
        <style>{`@keyframes scroll {0%{transform:translateX(0)}100%{transform:translateX(-50%)}}`}</style>
      </section>

      {/* WORK */}
      <Section id="work" title="Selected Work" subtitle="Click a project for detailed case study.">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:balance]">
          {projects.map((p) => (
            <div key={p.slug} className="mb-6 break-inside-avoid relative group">
              {/* invisible clickable overlay */}
              <Link to={`/work/${p.slug}`} className="absolute inset-0 z-10" aria-label={`Open ${p.title}`}></Link>

              <div className="hover:shadow-lg transition-shadow relative z-0 rounded-2xl border dark:border-neutral-900 bg-white/60 dark:bg-white/5">
                <div className="p-5">
                  <h3 className="font-medium text-lg">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.tags.map((t, j) => (
                      <span key={j} className="inline-flex items-center rounded-full border px-3 py-1 text-xs bg-white/60 dark:bg-white/5 dark:border-neutral-800">
                        {t}
                      </span>
                    ))}
                  </div>
                  <span className="mt-3 inline-block text-sm underline underline-offset-4 opacity-70 group-hover:opacity-100">
                    Click for details →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* EXPERIENCE */}
      <Section id="experience" title="Experience">
        <div className="grid gap-6">
          <Card className="hover:shadow-sm transition-shadow">
            <CardContent className="p-6">
              <h3 className="font-medium">Master Thesis — Stateful Failure Tracking (Modular Industrial Routers)</h3>
              <p className="text-sm text-muted-foreground">Belden / Hirschmann Automation · 2025 · Stuttgart</p>
              <ul className="mt-3 text-sm list-disc pl-5 space-y-1 text-muted-foreground">
                <li>Dependency-aware fault correlation; robust recovery design.</li>
                <li>Rust/C++ components on Embedded Linux with tests & logging.</li>
                <li>OTA/version binding concept for safe rollbacks.</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="hover:shadow-sm transition-shadow">
            <CardContent className="p-6">
              <h3 className="font-medium">R&D Intern — Embedded/Rust</h3>
              <p className="text-sm text-muted-foreground">Belden / Hirschmann Automation · 2025</p>
              <ul className="mt-3 text-sm list-disc pl-5 space-y-1 text-muted-foreground">
                <li>Rust service bridging app ↔ system daemons; Yocto integration; cxx interop.</li>
                <li>Tooling uplift: clang-tidy, Cppcheck, GitHub Actions CI.</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="hover:shadow-sm transition-shadow">
            <CardContent className="p-6">
              <h3 className="font-medium">Research Assistant — BLE Sensor Nodes</h3>
              <p className="text-sm text-muted-foreground">University of Stuttgart · 2024</p>
              <ul className="mt-3 text-sm list-disc pl-5 space-y-1 text-muted-foreground">
                <li>CC2651R3SIPA firmware; SPI/I²C drivers; power-aware buffering.</li>
                <li>Gateway sync & metrics on Raspberry Pi.</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* CONTACT */}
      <Section id="contact" title="Let’s talk" subtitle="Based in Stuttgart · Open to Embedded Linux / RTOS / Rust–C++ roles.">
        <div className="flex flex-wrap items-center gap-3">
          <a href={`mailto:${ME.email}`}><Button><Mail className="h-4 w-4 mr-2" /> Email</Button></a>
          <a href={ME.linkedin} target="_blank" rel="noreferrer"><Button variant="secondary"><Linkedin className="h-4 w-4 mr-2" /> LinkedIn</Button></a>
          {ME.github !== "#" && <a href={ME.github} target="_blank" rel="noreferrer"><Button variant="outline"><Github className="h-4 w-4 mr-2" /> GitHub</Button></a>}
          <a href={ME.resume} target="_blank" rel="noreferrer"><Button variant="ghost"><FileDown className="h-4 w-4 mr-2" /> CV</Button></a>
          <a href={ME.reference} target="_blank" rel="noreferrer"><Button variant="ghost"><FileDown className="h-4 w-4 mr-2" /> Reference</Button></a>
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="border-t dark:border-neutral-900 py-10">
        <div className="max-w-6xl mx-auto px-4 text-sm text-muted-foreground flex items-center justify-between">
          <span>© {new Date().getFullYear()} {ME.name}</span>
          <span>{ME.location}</span>
        </div>
      </footer>
    </div>
  );
}
