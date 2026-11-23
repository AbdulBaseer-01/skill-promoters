"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { navLinks, company } from "@/lib/content";
import { useSmoothScroll } from "@/components/motion/SmoothScroll";
import { Logo } from "./Logo";

const ease = [0.22, 1, 0.36, 1] as const;

export function Nav() {
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollTo, stop, start } = useSmoothScroll();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setSolid(y > 48);
    // Tuck away while reading downwards, return on any upward scroll.
    setHidden(y > prev && y > window.innerHeight * 0.9 && !open);
  });

  useEffect(() => {
    if (!open) return;
    const toggle = toggleRef.current;
    stop();
    document.documentElement.style.overflow = "hidden";
    const first = menuRef.current?.querySelector<HTMLElement>("a,button");
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "Tab" && menuRef.current) {
        const items = menuRef.current.querySelectorAll<HTMLElement>("a,button");
        const firstEl = items[0];
        const lastEl = items[items.length - 1];
        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      start();
      toggle?.focus({ preventScroll: true });
    };
  }, [open, stop, start]);

  const go = (href: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setOpen(false);
    // Let the menu begin closing and scroll unlock before travelling.
    window.setTimeout(() => scrollTo(href), 60);
  };

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: hidden ? "-100%" : 0, opacity: 1 }}
        transition={{ duration: 0.7, ease, delay: hidden ? 0 : 0.1 }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <motion.div
          aria-hidden
          className="absolute inset-0 bg-charcoal/85 backdrop-blur-md"
          initial={false}
          animate={{ opacity: solid || open ? 1 : 0 }}
          transition={{ duration: 0.5, ease }}
        />
        <motion.div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-px bg-ivory/10"
          initial={false}
          animate={{ opacity: solid && !open ? 1 : 0 }}
        />
        <nav aria-label="Primary" className="frame relative flex h-[var(--nav-h)] items-center justify-between">
          <a href="#top" aria-label={`${company.shortName} — back to top`} className="relative z-10 -m-2 p-2">
            <Logo />
          </a>

          <ul className="hidden items-center gap-9 lg:flex">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="link-draw py-2 text-[0.8rem] font-medium tracking-[0.06em] text-ivory/80 transition-colors duration-300 hover:text-ivory"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="relative z-10 flex items-center gap-3">
            <a
              href="#contact"
              className="hidden min-h-11 items-center bg-ivory px-5 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-charcoal transition-[background-color,transform] duration-300 hover:bg-bronze active:scale-[0.97] sm:inline-flex"
            >
              Enquire now
            </a>
            <button
              ref={toggleRef}
              type="button"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
              className="relative flex size-11 items-center justify-center text-ivory lg:hidden"
            >
              <span className="relative block h-3 w-7">
                <motion.span
                  className="absolute left-0 top-0 block h-px w-full bg-current"
                  animate={open ? { top: "50%", rotate: 45 } : { top: "0%", rotate: 0 }}
                  transition={{ duration: 0.45, ease }}
                />
                <motion.span
                  className="absolute bottom-0 left-0 block h-px w-full bg-current"
                  animate={open ? { bottom: "50%", rotate: -45 } : { bottom: "0%", rotate: 0 }}
                  transition={{ duration: 0.45, ease }}
                />
              </span>
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-0 z-40 flex flex-col bg-charcoal pt-[var(--nav-h)] text-ivory lg:hidden"
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.8, ease }}
          >
            <div className="frame flex flex-1 flex-col justify-between overflow-y-auto pb-10 pt-8">
              <ul className="flex flex-col">
                {navLinks.map((l, i) => (
                  <li key={l.href} className="overflow-hidden border-b border-ivory/10">
                    <motion.a
                      href={l.href}
                      onClick={go(l.href)}
                      className="flex items-baseline justify-between py-4 text-[clamp(2.25rem,9vw,3.5rem)] font-medium leading-none tracking-[-0.03em]"
                      initial={{ y: "110%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "110%", transition: { duration: 0.3 } }}
                      transition={{ duration: 0.9, ease, delay: 0.25 + i * 0.06 }}
                    >
                      <span>{l.label}</span>
                      <span className="font-serif text-lg italic text-bronze">0{i + 1}</span>
                    </motion.a>
                  </li>
                ))}
              </ul>
              <motion.div
                className="mt-10 flex flex-col gap-6"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease, delay: 0.6 }}
              >
                <a
                  href="#contact"
                  onClick={go("#contact")}
                  className="inline-flex min-h-12 items-center justify-center bg-ivory px-6 text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-charcoal"
                >
                  Enquire now
                </a>
                <div className="flex items-end justify-between gap-6 text-sm text-ivory/60">
                  <a href={`mailto:${company.email}`} className="py-2">
                    {company.email}
                  </a>
                  <span className="py-2">Hyderabad · Est. 1994</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
