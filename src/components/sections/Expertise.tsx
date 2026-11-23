"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import { developmentTypes, services } from "@/lib/content";
import { Accent, SectionLabel, SplitLines } from "@/components/ui/primitives";
import { useSectionMotion } from "@/components/motion/MotionSection";

const ease = [0.22, 1, 0.36, 1] as const;

export function Expertise() {
  const root = useRef<HTMLElement>(null);
  useSectionMotion(root);
  const [active, setActive] = useState(0);
  const current = services[active];

  return (
    <section
      id="expertise"
      ref={root}
      aria-labelledby="expertise-title"
      className="relative bg-charcoal-2 py-24 text-ivory md:py-36"
    >
      <div className="frame">
        <div className="grid gap-y-10 lg:grid-cols-12 lg:gap-x-6">
          <div className="lg:col-span-3 lg:pt-4">
            <SectionLabel index="04" tone="light">
              What we do
            </SectionLabel>
          </div>
          <SplitLines
            id="expertise-title"
            className="text-[clamp(2.4rem,6.4vw,6.6rem)] font-medium leading-[0.98] tracking-[-0.045em] lg:col-span-9"
            lines={[
              "From the first idea",
              <>
                to the finished <Accent>development.</Accent>
              </>,
            ]}
          />
        </div>

        <div className="mt-16 grid gap-y-10 md:mt-28 lg:grid-cols-12 lg:gap-x-6">
          {/* Image stage — one owner: Framer Motion */}
          <div className="lg:order-2 lg:col-span-6 lg:col-start-7 lg:col-span-5 lg:col-start-8">
            <div className="relative aspect-[4/5] overflow-hidden bg-charcoal md:aspect-[4/3] lg:aspect-[4/5] lg:sticky lg:top-28" data-fade="">
              <AnimatePresence initial={false} mode="sync">
                <motion.div
                  key={current.image}
                  className="absolute inset-0"
                  initial={{ clipPath: "inset(100% 0% 0% 0%)", scale: 1.12 }}
                  animate={{ clipPath: "inset(0% 0% 0% 0%)", scale: 1 }}
                  exit={{ opacity: 0.0, transition: { duration: 0.6, delay: 0.5 } }}
                  transition={{ duration: 1.1, ease }}
                >
                  <Image
                    src={current.image}
                    alt={current.alt}
                    width={current.w}
                    height={current.h}
                    sizes="(min-width: 1024px) 40vw, (min-width: 768px) 50vw, 100vw"
                    className="h-full w-full object-cover"
                  />
                </motion.div>
              </AnimatePresence>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between bg-linear-to-t from-charcoal/70 to-transparent p-5 pt-16">
                <span className="font-serif text-3xl italic text-ivory">{current.index}</span>
                <span className="eyebrow text-ivory/70">{services.length.toString().padStart(2, "0")} disciplines</span>
              </div>
            </div>
          </div>

          {/* Service list */}
          <ul className="lg:order-1 lg:col-span-6 lg:col-span-6" role="list">
            {services.map((s, i) => {
              const isActive = i === active;
              return (
                <li key={s.index} className="border-t border-ivory/15 last:border-b" data-fade="" data-delay={i * 0.06}>
                  <button
                    type="button"
                    aria-expanded={isActive}
                    aria-controls={`service-${s.index}`}
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className="group flex w-full items-start gap-5 py-7 text-left md:gap-8 md:py-9"
                  >
                    <span
                      className={`mt-1.5 w-8 shrink-0 font-serif text-lg italic transition-colors duration-500 ${
                        isActive ? "text-bronze" : "text-ivory/40"
                      }`}
                    >
                      {s.index}
                    </span>
                    <span className="flex-1">
                      <span
                        className={`block text-[clamp(1.5rem,2.6vw,2.4rem)] font-medium uppercase leading-[1.02] tracking-[-0.035em] transition-[color,transform] duration-700 ease-[var(--ease-cine)] ${
                          isActive ? "translate-x-0 text-ivory" : "text-ivory/45 group-hover:text-ivory/80"
                        }`}
                      >
                        {s.title}
                      </span>
                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.span
                            id={`service-${s.index}`}
                            className="block overflow-hidden"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.7, ease }}
                          >
                            <span className="block max-w-[44ch] pt-5 text-[1rem] leading-relaxed text-ivory/65">{s.body}</span>
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </span>
                    <motion.span
                      aria-hidden
                      className="mt-3 block h-px w-8 origin-left bg-bronze"
                      initial={false}
                      animate={{ scaleX: isActive ? 1 : 0.25, opacity: isActive ? 1 : 0.4 }}
                      transition={{ duration: 0.6, ease }}
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* What we develop — from the company's Our Mission page */}
        <div className="mt-24 md:mt-36">
          <p className="eyebrow text-ivory/50" data-fade="">
            What we develop
          </p>
          <ul className="mt-8 grid grid-cols-2 border-t border-ivory/15 md:grid-cols-3 lg:grid-cols-6" role="list">
            {developmentTypes.map((t, i) => (
              <li
                key={t}
                className="border-b border-ivory/15 py-6 pr-4 text-[1.05rem] font-medium leading-snug tracking-[-0.01em] lg:border-b-0"
                data-fade=""
                data-delay={i * 0.05}
              >
                <span className="mb-3 block font-serif text-sm italic text-bronze">{String(i + 1).padStart(2, "0")}</span>
                {t}
              </li>
            ))}
          </ul>
          <p className="mt-10 max-w-[60ch] text-[0.95rem] leading-relaxed text-ivory/55" data-fade="">
            Skill is also pursuing other segments of the construction and infrastructure industry on build, operate and
            transfer arrangements.
          </p>
        </div>
      </div>
    </section>
  );
}
