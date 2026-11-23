"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { stats } from "@/lib/content";
import { SectionLabel } from "@/components/ui/primitives";
import { useSectionMotion } from "@/components/motion/MotionSection";

export function Stats() {
  const root = useRef<HTMLElement>(null);
  useSectionMotion(root);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const q = gsap.utils.selector(el);
      const tl = gsap.timeline({ scrollTrigger: { trigger: q("[data-stats]")[0], start: "top 80%", once: true } });

      tl.from(q("[data-rule]"), { scaleY: 0, transformOrigin: "top", duration: 1.4, ease: "expo.inOut", stagger: 0.1 }, 0)
        .from(q("[data-num-mask] > span"), { yPercent: 105, duration: 1.4, ease: "expo.out", stagger: 0.12 }, 0.15)
        .from(q("[data-stat-meta]"), { autoAlpha: 0, y: 14, duration: 1, stagger: 0.1 }, 0.5);

      q("[data-count]").forEach((node: HTMLElement) => {
        const end = Number(node.dataset.count);
        const obj = { v: 0 };
        tl.to(
          obj,
          {
            v: end,
            duration: 2.2,
            ease: "power3.out",
            onUpdate: () => {
              node.textContent = String(Math.round(obj.v));
            },
          },
          0.2,
        );
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} aria-labelledby="glance-title" className="relative overflow-hidden bg-charcoal py-24 text-ivory md:py-36">
      <div className="frame">
        <div className="grid gap-y-8 lg:grid-cols-12 lg:gap-x-6">
          <div className="lg:col-span-3">
            <SectionLabel index="02" tone="light">
              At a glance
            </SectionLabel>
          </div>
          <h2
            id="glance-title"
            className="max-w-[22ch] text-[clamp(1.6rem,2.6vw,2.6rem)] font-medium leading-[1.15] tracking-[-0.03em] text-ivory lg:col-span-7"
            data-fade=""
          >
            Three decades of building Hyderabad — <span className="text-ivory/50">measured in the work.</span>
          </h2>
        </div>

        <dl data-stats="" className="mt-16 grid md:mt-28 md:grid-cols-3">
          {stats.map((s, i) => (
            <div key={s.label} className="relative py-10 md:px-8 md:py-0 md:first:pl-0">
              {/* Hairline separators: horizontal on phones, vertical on desktop */}
              <span aria-hidden data-rule="" className="absolute inset-x-0 top-0 h-px bg-ivory/15 md:hidden" />
              {i > 0 && (
                <span aria-hidden data-rule="" className="absolute bottom-0 left-0 top-0 hidden w-px bg-ivory/15 md:block" />
              )}
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span
                  data-num-mask=""
                  className="line-mask text-[clamp(4.75rem,10.4vw,12rem)] font-light leading-[0.85] tracking-[-0.06em] tabular-nums"
                >
                  <span className="block">
                    {s.count ? <span data-count={s.value}>{s.value}</span> : s.value}
                    {s.suffix && <span className="font-serif font-normal italic text-bronze">{s.suffix}</span>}
                  </span>
                </span>
                <span data-stat-meta="" className="mt-6 block md:mt-10">
                  <span className="eyebrow block text-ivory">{s.label}</span>
                  <span className="mt-3 block text-sm text-ivory/50">{s.note}</span>
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
