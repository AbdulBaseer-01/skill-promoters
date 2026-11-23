"use client";

import Lenis from "lenis";
import { MotionConfig } from "framer-motion";
import { createContext, useCallback, useContext, useEffect, useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

type ScrollTo = (target: string | number | HTMLElement, opts?: { offset?: number; immediate?: boolean }) => void;

type Ctx = {
  scrollTo: ScrollTo;
  stop: () => void;
  start: () => void;
};

const SmoothScrollContext = createContext<Ctx>({
  scrollTo: () => {},
  stop: () => {},
  start: () => {},
});

export const useSmoothScroll = () => useContext(SmoothScrollContext);

/**
 * One shared animation setup:
 * Lenis drives scrolling, GSAP's ticker drives Lenis, and every Lenis scroll
 * event updates ScrollTrigger — so all scroll-linked animation reads the same
 * position. Touch devices keep native scrolling (Lenis' default, syncTouch off).
 * Under prefers-reduced-motion Lenis is not created and the page scrolls natively.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // In-page links (<a href="#projects">) glide through Lenis.
      anchors: { duration: 1.6 },
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Images and fonts change layout after first paint; keep triggers accurate.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh).catch(() => {});

    return () => {
      window.removeEventListener("load", refresh);
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollTo = useCallback<ScrollTo>((target, opts) => {
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(target, { offset: opts?.offset ?? 0, immediate: opts?.immediate, duration: 1.6 });
      return;
    }
    const el =
      typeof target === "string" ? document.querySelector<HTMLElement>(target) : typeof target === "number" ? null : target;
    if (el) {
      el.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
    } else if (typeof target === "number") {
      window.scrollTo({ top: target, behavior: prefersReducedMotion() ? "auto" : "smooth" });
    }
  }, []);

  const stop = useCallback(() => lenisRef.current?.stop(), []);
  const start = useCallback(() => lenisRef.current?.start(), []);

  return (
    <SmoothScrollContext.Provider value={{ scrollTo, stop, start }}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </SmoothScrollContext.Provider>
  );
}
