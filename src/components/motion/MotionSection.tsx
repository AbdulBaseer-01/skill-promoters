"use client";

import { useLayoutEffect, useEffect, useRef, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Scroll motion vocabulary (GSAP + ScrollTrigger), applied by data attribute
 * inside a section. Each attribute owns its element exclusively:
 *
 *  [data-lines]     heading whose `.line-mask > span` children rise into view
 *  [data-fade]      block that fades up once (optional data-delay="0.2")
 *  [data-mask]      image frame that opens from an inset clip
 *  [data-parallax]  image layer that drifts within its frame while in view
 *                   (data-parallax="10" = percent of travel; frame must overflow-hidden)
 *
 * Everything runs only under prefers-reduced-motion: no-preference, and is
 * reverted on unmount, so content is always visible without motion.
 */
export function useSectionMotion(scope: React.RefObject<HTMLElement | null>) {
  useIsoLayoutEffect(() => {
    const root = scope.current;
    if (!root) return;
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const q = gsap.utils.selector(root);

      q("[data-lines]").forEach((el: HTMLElement) => {
        const inner = el.querySelectorAll(".line-mask > span");
        gsap.from(inner, {
          yPercent: 108,
          duration: 1.25,
          ease: "expo.out",
          stagger: 0.09,
          delay: Number(el.dataset.delay ?? 0),
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });

      q("[data-fade]").forEach((el: HTMLElement) => {
        gsap.from(el, {
          autoAlpha: 0,
          y: 32,
          duration: 1.2,
          ease: "power3.out",
          delay: Number(el.dataset.delay ?? 0),
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
      });

      q("[data-mask]").forEach((el: HTMLElement) => {
        const from = el.dataset.mask === "up" ? "inset(100% 0% 0% 0%)" : "inset(10% 9% 10% 9%)";
        gsap.fromTo(
          el,
          { clipPath: from },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.7,
            ease: "expo.out",
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          },
        );
      });

      q("[data-parallax]").forEach((el: HTMLElement) => {
        const amt = Number(el.dataset.parallax || 8);
        gsap.fromTo(
          el,
          { yPercent: -amt },
          {
            yPercent: amt,
            ease: "none",
            scrollTrigger: {
              trigger: el.parentElement ?? el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });
    });

    return () => mm.revert();
  }, [scope]);
}

type MotionSectionProps = ComponentPropsWithoutRef<"section"> & { children: ReactNode; as?: "section" | "footer" };

/** A <section> (or <footer>) that wires the shared scroll-motion vocabulary to its children. */
export function MotionSection({ children, as: Tag = "section", ...rest }: MotionSectionProps) {
  const ref = useRef<HTMLElement>(null);
  useSectionMotion(ref);
  return (
    <Tag ref={ref} {...rest}>
      {children}
    </Tag>
  );
}
