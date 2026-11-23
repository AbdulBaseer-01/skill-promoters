# Skill Promoters — website redesign concept

A single-page corporate site for Skill Promoters Pvt. Ltd. (Hyderabad, est. 1994), built as a proposed replacement for skillpromoters.co.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

Set `NEXT_PUBLIC_SITE_URL` in production so canonical and Open Graph URLs resolve correctly (it defaults to `https://www.skillpromoters.co`).

## Stack

- Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4
- GSAP + ScrollTrigger: hero timeline, line reveals, image clip reveals, parallax, statistic counters
- Lenis: smooth wheel scrolling, driven by GSAP's ticker and feeding ScrollTrigger (`src/components/motion/SmoothScroll.tsx`). Touch devices keep native scrolling.
- Framer Motion: navigation bar, full-screen mobile menu, Expertise image swap and accordion, form feedback
- Fonts: Manrope + Instrument Serif via `next/font/google`

Each animated element has a single owner. GSAP works through the data attributes listed in `src/components/motion/MotionSection.tsx`, and Framer Motion only animates its own `motion.*` elements. Under `prefers-reduced-motion: reduce`, Lenis is not started, no GSAP animation runs and all content stays visible.

## Content

All copy and facts are in `src/lib/content.ts`, sourced from the existing site (home, Our Mission, Core Team, Fern Heights, Asian Suncity, Other Projects, Initiatives). Nothing has been invented. Verify a new project, figure or contact before adding it there.

## Images

Every photograph and render in `public/images` comes from the company's own uploads on the existing site, re-cropped and converted to WebP. The OG image (`public/og.jpg`) and the icons are derived from them. No stock imagery is used.

## Known limitations

- **Enquiry form is frontend-only.** It validates input and then offers a pre-filled `mailto:` link, and it tells the user plainly that nothing has been sent. To make it live, connect `onSubmit` in `src/components/sections/Contact.tsx` to a route handler or form service.
- The Sarath City Capital Mall photo is only 1600px wide at source. A higher-resolution original would sharpen that full-width feature.
- The commercial complex in Kondapur has no published imagery, so it is shown as type only.
