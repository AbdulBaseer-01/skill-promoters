"use client";

import { getImageProps } from "next/image";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { ButtonLink } from "@/components/ui/primitives";

const ALT = "Golden-hour facade of Fern Heights, Lakdikapul — a residential development by Skill Group";

export function Hero() {
  const root = useRef<HTMLElement>(null);

  // Art direction: landscape crop for wide screens, full portrait tower for phones.
  const common = { alt: ALT, sizes: "100vw", quality: 80 } as const;
  const {
    props: { srcSet: desktop },
  } = getImageProps({ ...common, src: "/images/hero-fern-heights-desktop.webp", width: 2560, height: 1440 });
  const {
    props: { srcSet: mobile, ...rest },
  } = getImageProps({ ...common, src: "/images/hero-fern-heights-mobile.webp", width: 1200, height: 2133 });

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const done = () => {
      document.documentElement.classList.remove("motion-boot");
      (window as unknown as { __heroDone?: boolean }).__heroDone = true;
    };

    const mm = gsap.matchMedia();
    mm.add(
      { motion: "(prefers-reduced-motion: no-preference)", reduce: "(prefers-reduced-motion: reduce)" },
      (ctx) => {
        if (ctx.conditions?.reduce) {
          done();
          return;
        }
        const q = gsap.utils.selector(el);

        // Take over the boot-hidden state, then release the CSS guard.
        gsap.set(q("[data-hero-in]"), { autoAlpha: 0, y: 18 });
        gsap.set(q("[data-hero-line] > span"), { y: 0, yPercent: 108 });
        gsap.set(q("[data-hero-media]"), { clipPath: "inset(6% 6% 6% 6%)", scale: 1.16 });
        done();

        const tl = gsap.timeline({ defaults: { ease: "expo.out" }, delay: 0.15 });
        tl.to(q("[data-hero-media]"), { clipPath: "inset(0% 0% 0% 0%)", scale: 1, duration: 2.4 })
          .to(q("[data-hero-line] > span"), { yPercent: 0, duration: 1.5, stagger: 0.12 }, 0.45)
          .to(q("[data-hero-in]"), { autoAlpha: 1, y: 0, duration: 1.3, stagger: 0.08 }, 0.95);

        // Slow drift as the hero leaves: image sinks, overlay deepens.
        gsap.to(q("[data-hero-drift]"), {
          yPercent: 14,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to(q("[data-hero-shade]"), {
          opacity: 0.55,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
        });
      },
    );
    return () => mm.revert();
  }, []);

  return (
    <section
      id="top"
      ref={root}
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-160 h-svh flex-col overflow-hidden bg-charcoal text-ivory"
    >
      {/* Media */}
      <div className="absolute inset-0 -z-10" data-hero-media="">
        <div className="absolute inset-[-2%_0_-14%_0] will-change-transform" data-hero-drift="">
          <picture>
            <source media="(min-width: 768px) and (min-aspect-ratio: 4/5)" srcSet={desktop} />
            <source srcSet={mobile} />
            {/* eslint-disable-next-line jsx-a11y/alt-text -- alt is provided via getImageProps */}
            <img
              {...rest}
              fetchPriority="high"
              className="h-full w-full object-cover object-[50%_40%] md:object-[38%_50%]"
            />
          </picture>
        </div>
        {/* Controlled shading: bottom for the headline, a little at the top for the nav. */}
        <div className="absolute inset-0 bg-linear-to-t from-charcoal/90 via-charcoal/25 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-48 bg-linear-to-b from-charcoal/55 to-transparent" />
        <div className="absolute inset-0 bg-charcoal opacity-0" data-hero-shade="" />
      </div>

      {/* Top meta row */}
      <div className="frame relative mt-[calc(var(--nav-h)+1.5rem)] flex items-start justify-between gap-6">
        <p className="eyebrow text-ivory/80" data-hero-in="">
          Skill Promoters Pvt. Ltd. <span className="mx-2 text-bronze">/</span> Est. 1994
        </p>
        <p className="eyebrow hidden text-right text-ivory/60 md:block" data-hero-in="">
          Hyderabad, Telangana
        </p>
      </div>

      {/* Headline block */}
      <div className="frame relative mt-auto pb-8 md:pb-12">
        <h1
          id="hero-title"
          className="font-sans text-[clamp(2.5rem,12.4vw,11.5rem)] md:text-[clamp(2.5rem,10.2vw,11.5rem)] font-semibold uppercase leading-[0.88] tracking-[-0.045em]"
        >
          <span className="line-mask" data-hero-line="">
            <span className="block">
              Building{" "}
              <em className="font-serif text-[1.06em] font-normal lowercase italic tracking-[-0.02em] text-ivory/95">
                beyond
              </em>
            </span>
          </span>
          <span className="line-mask" data-hero-line="">
            <span className="block">Expectations.</span>
          </span>
        </h1>

        <div className="mt-8 grid gap-8 border-t border-ivory/20 pt-7 md:mt-10 lg:grid-cols-12 lg:items-end lg:gap-6">
          <p
            className="max-w-[34ch] text-[1.02rem] leading-relaxed text-ivory/80 md:text-lg lg:col-span-4 xl:col-span-5"
            data-hero-in=""
          >
            Over three decades of transforming ideas into enduring spaces across residential, commercial and
            infrastructure development.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row lg:col-span-6 lg:col-start-5 xl:col-span-5 xl:col-start-6" data-hero-in="">
            <ButtonLink href="#projects" variant="solid-light" className="sm:min-w-56">
              Explore our work
            </ButtonLink>
            <ButtonLink href="#about" variant="line-light" className="sm:min-w-44">
              Our story
            </ButtonLink>
          </div>

          <a
            href="#about"
            className="group hidden items-center justify-end gap-4 lg:col-span-2 lg:flex"
            data-hero-in=""
            aria-label="Scroll to the introduction"
          >
            <span className="eyebrow text-ivory/60 transition-colors group-hover:text-ivory">Scroll</span>
            <span aria-hidden className="relative block h-14 w-px overflow-hidden bg-ivory/20">
              <span className="absolute inset-x-0 top-0 block h-1/2 animate-[scrollcue_2.4s_var(--ease-cine)_infinite] bg-ivory" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
