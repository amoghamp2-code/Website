import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, FileDown } from "lucide-react";
import HeroMinimal from "./sections/HeroMinimal.jsx";
import { Button } from "./components/ui/button.jsx";
import { Card, CardContent } from "./components/ui/card.jsx";
import { Badge } from "./components/ui/badge.jsx";

/* Theme */
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

/* Your info */
const ME = {
  name: "Amogha M P",
  title: "Embedded Systems Developer",
  tagline: "Rust · C/C++ · Embedded Linux/Yocto · RTOS · Drivers · BLE · OTA",
  email: "amoghamp@gmail.com",
  phone: "+49 155 1021 7648",
  linkedin: "https://www.linkedin.com/in/amogha-m-p-7978881a7/",
  github: "#", // add your GitHub URL when ready
  resume: "/Amogha_CV.pdf",
  reference: "/Belden_Reference.pdf",
  location: "Stuttgart, Germany",
};

/* Skills row for credibility */
const skills = [
  "Embedded C/C++17/20", "Rust", "Yocto/Embedded Linux", "Zephyr/FreeRTOS",
  "SPI · I²C · UART · CAN", "BLE/MQTT", "Device Drivers", "Secure Boot/OTA",
  "CMake", "clang-tidy", "Cppcheck", "Unit Testing", "AUTOSAR · ISO 26262 · ASPICE"
];

/* Projects */
const projects = [
  { title: "HW/SW Update Manager",
    desc: "BLE gateway (Raspberry Pi) ↔ CC2651R3SIPA nodes. Version binding, low-power, OTA safety checks.",
    tags: ["Rust", "C", "BLE", "Raspberry Pi", "OTA"], link: "#" },
  { title: "Rust↔C++ Message Bus",
    desc: "cxx bridge, typed structs, YANG ops; structured logs + tests; fits embedded Linux images.",
    tags: ["Rust", "C++", "FFI", "Yocto"], link: "#" },
  { title: "OpenCL CT Reflection",
    desc: "GPU interpolation matching SciPy griddata; MSE + timing; deterministic numerics.",
    tags: ["OpenCL", "C++", "Numerics"], link: "#" },
  { title: "BLE Sensor Nodes",
    desc: "CC2651 firmware; SPI/I²C drivers; power-aware buffering; RPi gateway state machine.",
    tags: ["BLE", "CC2651", "Drivers"], link: "#" },
];

/* Experience */
const experience = [
  { role: "Master Thesis — Stateful Failure Tracking (Modular Industrial Routers)",
    org: "Belden / Hirschmann Automation", when: "2025 · Stuttgart",
    bullets: [
      "Dependency-aware fault correlation; robust recovery design.",
      "Rust/C++ components on Embedded Linux with tests & logging.",
      "OTA/version binding concept for safe rollbacks.",
    ]},
  { role: "R&D Intern — Embedded/Rust",
    org: "Belden / Hirschmann Automation", when: "2025",
    bullets: [
      "Rust service bridging app ↔ system daemons; Yocto integration; cxx interop.",
      "Tooling uplift: clang-tidy, Cppcheck, GitHub Actions CI.",
    ]},
  { role: "Research Assistant — BLE Sensor Nodes",
    org: "University of Stuttgart", when: "2024",
    bullets: [
      "CC2651R3SIPA firmware; SPI/I²C drivers; power-aware buffering.",
      "Gateway sync & metrics on Raspberry Pi.",
    ]},
];

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
          <a href="#home" className="font-semibold tracking-tight">amogha.dev</a>
          <nav className="hidden md:flex items-center gap-6 text-sm">
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
        photo="/amogha-portrait.jpg"
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

      {/* WORK grid */}
      <Section id="work" title="Selected Work" subtitle="Minimal case cards — click through for details.">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:balance]">
          {projects.map((p, i) => (
            <motion.div key={i} initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
              transition={{duration:.3, delay:i*0.03}} className="mb-6 break-inside-avoid">
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-5">
                  <h3 className="font-medium text-lg">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.tags.map((t, j) => <Badge key={j} variant="secondary" className="text-xs">{t}</Badge>)}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* EXPERIENCE */}
      <Section id="experience" title="Experience">
        <div className="grid gap-6">
          {experience.map((e, i) => (
            <Card key={i} className="hover:shadow-sm transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <h3 className="font-medium">{e.role}</h3>
                    <p className="text-sm text-muted-foreground">{e.org} · {e.when}</p>
                  </div>
                </div>
                <ul className="mt-3 text-sm list-disc pl-5 space-y-1 text-muted-foreground">
                  {e.bullets.map((b, j) => <li key={j}>{b}</li>)}
                </ul>
              </CardContent>
            </Card>
          ))}
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

      <footer className="border-t dark:border-neutral-900 py-10">
        <div className="max-w-6xl mx-auto px-4 text-sm text-muted-foreground flex items-center justify-between">
          <span>© {new Date().getFullYear()} {ME.name}</span>
          <span>{ME.location}</span>
        </div>
      </footer>
    </div>
  );
}
