import { MotionSection } from "@/components/motion/MotionSection";
import { Accent, MediaFrame, SectionLabel, SplitLines } from "@/components/ui/primitives";
import { leadership, milestones } from "@/lib/content";

export function Legacy() {
  return (
    <MotionSection id="legacy" aria-labelledby="legacy-title" className="relative bg-ivory py-24 md:py-36">
      <div className="frame">
        <div className="grid gap-y-10 lg:grid-cols-12 lg:gap-x-6">
          <div className="lg:col-span-3 lg:pt-4">
            <SectionLabel index="06">Our legacy</SectionLabel>
          </div>
          <SplitLines
            id="legacy-title"
            className="text-[clamp(2.4rem,6.4vw,6.6rem)] font-medium leading-[0.98] tracking-[-0.045em] lg:col-span-9"
            lines={[
              "Experience built",
              <>
                over <Accent>decades.</Accent>
              </>,
            ]}
          />
        </div>

        {/* Photographic composition: wide render + tall photograph, offset */}
        <div className="mt-16 grid grid-cols-12 gap-x-3 md:mt-28 lg:gap-x-6">
          <div className="col-span-12 lg:col-span-8">
            <MediaFrame
              src="/images/asian-suncity-clubhouse-render.webp"
              alt="Render of the Asian Suncity clubhouse — a six-storey building framed by trees"
              width={2400}
              height={1350}
              sizes="(min-width: 768px) 66vw, 100vw"
              className="aspect-[16/10]"
              parallax={7}
            />
          </div>
          <div className="col-span-7 col-start-6 -mt-16 lg:col-span-4 lg:col-start-9 md:mt-32">
            <div className="bg-ivory pl-3 pt-3 lg:p-0">
              <MediaFrame
                src="/images/asian-suncity-towers-sky.webp"
                alt="White residential towers at Asian Suncity rising against a clear blue sky"
                width={1400}
                height={1867}
                sizes="(min-width: 768px) 33vw, 58vw"
                className="aspect-[3/4]"
                parallax={6}
                mask="up"
              />
            </div>
          </div>
        </div>

        {/* Story + mission */}
        <div className="mt-16 grid gap-y-12 md:mt-24 lg:grid-cols-12 lg:gap-x-6">
          <div className="lg:col-span-5">
            <p className="text-[1.25rem] leading-[1.5] tracking-[-0.01em] md:text-[1.45rem]" data-fade="">
              Skill is a first-generation corporation, promoted by a team of technocrat entrepreneurs with deep industry
              knowledge. Based in Hyderabad, it was established to serve the many segments of the construction and
              residential industry — and is today in the business of transforming great blueprints into remarkable
              structures.
            </p>
          </div>
          <blockquote className="border-l border-bronze pl-6 lg:col-span-6 lg:col-start-7 md:pl-10" data-fade="" data-delay="0.1">
            <p className="font-serif text-[clamp(1.6rem,2.6vw,2.4rem)] italic leading-[1.2] text-charcoal">
              &ldquo;We want to be the industry leader and a market driven construction company renowned for excellence,
              quality, performance, and reliability in all types of construction.&rdquo;
            </p>
            <footer className="eyebrow mt-6 text-grey-dark">Where we want to be</footer>
          </blockquote>
        </div>

        {/* Timeline */}
        <ol className="mt-20 grid border-t border-charcoal md:mt-28 md:grid-cols-2 lg:grid-cols-4" aria-label="Milestones">
          {milestones.map((m, i) => (
            <li
              key={m.title}
              className={`border-b border-charcoal/15 py-8 md:border-b-0 md:py-10 md:pr-8 ${i > 0 ? "lg:border-l lg:pl-8" : ""}`}
              data-fade=""
              data-delay={i * 0.07}
            >
              <p className="text-[clamp(1.8rem,2.4vw,2.4rem)] font-light leading-none tracking-[-0.04em]">{m.year}</p>
              <p className="mt-6 text-[1rem] font-semibold tracking-[-0.01em]">{m.title}</p>
              <p className="mt-3 text-sm leading-relaxed text-grey-dark">{m.body}</p>
            </li>
          ))}
        </ol>

        {/* Leadership — names and roles as published on the Core Team page */}
        <div className="mt-20 grid gap-y-8 md:mt-28 lg:grid-cols-12 lg:gap-x-6">
          <div className="lg:col-span-3">
            <p className="eyebrow text-grey-dark" data-fade="">
              Leadership
            </p>
          </div>
          <ul className="grid gap-x-6 sm:grid-cols-2 lg:col-span-9" role="list">
            {leadership.map((p, i) => (
              <li
                key={p.name}
                className="flex items-baseline justify-between gap-6 border-b border-charcoal/15 py-5"
                data-fade=""
                data-delay={i * 0.05}
              >
                <span className="text-[1.1rem] font-medium tracking-[-0.015em]">{p.name}</span>
                <span className="shrink-0 text-right text-sm text-grey-dark">{p.role}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm leading-relaxed text-grey-dark lg:col-span-9 lg:col-start-4" data-fade="">
            Both co-founders are qualified civil engineers, as are the two executive directors of the group&rsquo;s second
            generation, who lead projects and planning.
          </p>
        </div>
      </div>
    </MotionSection>
  );
}
