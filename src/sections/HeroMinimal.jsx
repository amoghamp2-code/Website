import { motion } from "framer-motion";
import { FileDown } from "lucide-react";

export default function HeroMinimal({
  name = "Amogha M P",
  role = "Embedded Systems Developer",
  tagline = "Rust · C · C++ · Embedded Linux · Yocto · RTOS · Drivers · BLE · OTA",
  resumeHref = "/Amogha_CV.pdf",
  photo = `${import.meta.env.BASE_URL}amogha-portrait.jpg`,
  bw = true,
}) {
  // Keep the last two words on the same line (prevents a lonely "P")
  const prettyName = name.replace(/ (?!.* )/, "\u00A0");

  return (
    <section className="relative overflow-hidden bg-[#EEF4F9] dark:bg-[#EEF4F9] pt-12 md:pt-20 pb-6 md:pb-12">
      {/* Subtle background gradient overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(255,255,255,0.00) 0%, rgba(255,255,255,0.25) 55%, rgba(255,255,255,0.35) 100%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Stack vertically on mobile, align side by side on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          {/* --- LEFT TEXT --- */}
          <div className="md:col-span-6 text-neutral-900 dark:text-neutral-900 flex flex-col justify-center">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="text-[18px] md:text-[20px] text-neutral-700 tracking-[0.02em]"
            >
              Hello, I’m
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.05 }}
              className="mt-2 text-[38px] md:text-[78px] leading-[1.02] font-semibold tracking-[-0.02em]"
            >
              {prettyName}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="mt-2 text-[20px] md:text-[26px] text-neutral-800"
            >
              {role}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.12 }}
              className="mt-1 text-[14px] md:text-[15px] text-neutral-600 max-w-xl"
            >
              {tagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.16 }}
              className="mt-5"
            >
              <a
                href={resumeHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-[17px] underline underline-offset-[6px] decoration-2 hover:opacity-80 transition"
              >
                <FileDown className="h-5 w-5 -mt-[1px]" />
                Download Resume
              </a>
            </motion.div>
          </div>

          {/* --- RIGHT IMAGE --- */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="md:col-span-6 relative z-10 flex justify-center md:justify-end"
          >
            {/* hide stripes on small screens */}
            <div className="hidden md:block absolute right-[-6%] top-[8%] z-0">
              <Stripes />
            </div>

            {/* portrait image */}
            <div className="relative w-[85%] max-w-[380px] md:max-w-[520px] aspect-[4/5] md:aspect-[3/4] rounded-2xl overflow-hidden bg-[#EEF4F9]">
              <img
                src={photo}
                alt="Portrait of Amogha"
                className={[
                  "h-full w-full object-cover object-center",
                  bw
                    ? "[filter:grayscale(100%)_contrast(112%)_brightness(98%)]"
                    : "[filter:grayscale(8%)_contrast(105%)_saturate(108%)]",
                  "object-[55%_38%] md:object-[60%_35%] scale-[1.02] md:scale-[1.08]",
                ].join(" ")}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#EEF4F9]/30 via-transparent to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* --- Decorative Background Lines --- */
function Stripes() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none opacity-60 z-0"
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
