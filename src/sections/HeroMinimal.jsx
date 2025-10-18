import { motion } from "framer-motion";
import { FileDown } from "lucide-react";

export default function HeroMinimal({
  name = "Amogha M P",
  role = "Embedded Systems Developer",
  tagline = "Rust · C/C++ · Embedded Linux/Yocto · RTOS · Drivers · BLE · OTA",
  resumeHref = "/Amogha_CV.pdf",
  photo = "/amogha-portrait.jpg", // <-- jpg
  bw = true,
}) {
  return (
    <section className="relative overflow-hidden bg-[#EEF4F9] dark:bg-[#EEF4F9]">
      {/* background wash (non-interactive) */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(255,255,255,0.00) 0%, rgba(255,255,255,0.25) 55%, rgba(255,255,255,0.35) 100%)",
        }}
      />
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center min-h-[78vh] py-16 md:py-24">
          {/* left text */}
          <div className="md:col-span-6 text-neutral-900 dark:text-neutral-900">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="text-[18px] md:text-[20px] text-neutral-700 dark:text-neutral-700 tracking-[0.02em]"
            >
              Hello, I’m
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.05 }}
              className="mt-3 text-[44px] md:text-[80px] leading-[1.02] font-semibold tracking-[-0.02em] text-neutral-900 dark:text-neutral-900"
            >
              {name}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="mt-3 text-[22px] md:text-[26px] text-neutral-800 dark:text-neutral-800"
            >
              {role}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.12 }}
              className="mt-2 text-[14px] md:text-[15px] text-neutral-600 dark:text-neutral-600 max-w-xl"
            >
              {tagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.16 }}
              className="mt-6"
            >
              <a
                href={resumeHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-[18px] underline underline-offset-[6px] decoration-2 text-neutral-900 dark:text-neutral-900"
              >
                <FileDown className="h-5 w-5 -mt-[1px]" />
                Download Resume
              </a>
            </motion.div>
          </div>

          {/* right portrait */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="md:col-span-6 relative z-10"
          >
            {/* decorative stripes behind (non-interactive) */}
            <Stripes />

            {/* portrait container – same light bg in both modes */}
            <div className="relative ml-auto max-w-[560px] w-full aspect-[3/4] rounded-[28px] overflow-hidden bg-[#EEF4F9] dark:bg-[#EEF4F9]">
                <img
                src={`${import.meta.env.BASE_URL}amogha-portrait.jpg`}
                alt="Portrait of Amogha"
                className={[
                    "h-full w-full object-cover object-center",
                    bw
                    ? "[filter:grayscale(100%)_contrast(112%)_brightness(98%)]"
                    : "[filter:grayscale(8%)_contrast(105%)_saturate(108%)]",
                    "object-[60%_35%] scale-[1.08]",
                ].join(" ")}
                onError={(e) => {
                    e.currentTarget.style.display = "none";
                    const ph = e.currentTarget.nextElementSibling;
                    if (ph) ph.style.display = "flex";
                }}
                />

              {/* fallback initials */}
              <div className="hidden absolute inset-0 items-center justify-center text-6xl font-semibold text-neutral-300">
                AM
              </div>
              {/* soft top fade to blend */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#EEF4F9]/30 via-transparent to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Stripes() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute right-[-6%] top-[8%] w-[58%] h-[84%] opacity-60 z-0"
      viewBox="0 0 100 100"
    >
      <g transform="rotate(-28 50 50)" fill="none" stroke="#DDE8F3" strokeWidth="4" strokeLinecap="round">
        <line x1="70" y1="0" x2="70" y2="70" />
        <line x1="88" y1="20" x2="88" y2="92" />
      </g>
      <g fill="#E6EFF6" opacity=".85">
        <circle cx="82" cy="42" r="2.4" />
        <circle cx="90" cy="35" r="2" />
        <circle cx="86" cy="60" r="1.8" />
        <circle cx="78" cy="68" r="1.6" />
      </g>
    </svg>
  );
}
