import { MotionSection } from "@/components/motion/MotionSection";
import { Accent, MediaFrame, SectionLabel, SplitLines } from "@/components/ui/primitives";
import { initiatives } from "@/lib/content";

export function Initiatives() {
  const [hotel, complex] = initiatives;
  return (
    <MotionSection id="initiatives" aria-labelledby="initiatives-title" className="bg-stone py-24 md:py-36">
      <div className="frame">
        <div className="grid gap-y-10 lg:grid-cols-12 lg:gap-x-6">
          <div className="lg:col-span-3 lg:pt-4">
            <SectionLabel index="05">Beyond construction</SectionLabel>
          </div>
          <SplitLines
            id="initiatives-title"
            className="text-[clamp(2.4rem,6.4vw,6.6rem)] font-medium leading-[0.98] tracking-[-0.045em] lg:col-span-9"
            lines={[
              "Developing places.",
              <>
                Creating <Accent>opportunities.</Accent>
              </>,
            ]}
          />
        </div>

        <div className="mt-16 grid gap-y-14 md:mt-28 lg:grid-cols-12 lg:gap-x-6">
          {/* A — Hotel */}
          <article aria-labelledby="init-hotel" className="lg:col-span-7">
            <MediaFrame
              src="/images/hotel-kondapur-render.webp"
              alt="Architectural render of the proposed luxury hotel in Kondapur, with a glazed facade and landscaped forecourt"
              width={1044}
              height={799}
              sizes="(min-width: 768px) 58vw, 100vw"
              className="aspect-[4/3]"
              parallax={6}
            />
            <div className="mt-6 flex items-end justify-between gap-6 border-b border-charcoal/20 pb-6">
              <div>
                <p className="eyebrow text-bronze-deep">Initiative {hotel.index}</p>
                <h3 id="init-hotel" className="mt-3 text-[clamp(1.8rem,3.2vw,3rem)] font-medium leading-none tracking-[-0.035em]">
                  {hotel.name}, <Accent>{hotel.location}</Accent>
                </h3>
              </div>
              <span className="shrink-0 rounded-full border border-charcoal/30 px-3 py-1.5 text-xs font-medium">
                {hotel.status}
              </span>
            </div>
          </article>

          {/* B — Commercial complex: no imagery published yet, so it is set in type */}
          <div className="flex flex-col gap-10 lg:col-span-5 lg:col-start-8 md:pl-[6%]">
            <article
              aria-labelledby="init-complex"
              className="relative flex aspect-[4/5] flex-col justify-between bg-charcoal p-7 text-ivory md:aspect-[5/4] md:p-9"
              data-fade=""
            >
              <div className="flex items-start justify-between">
                <p className="eyebrow text-bronze">Initiative {complex.index}</p>
                <span className="rounded-full border border-ivory/30 px-3 py-1.5 text-xs font-medium">{complex.status}</span>
              </div>
              <div>
                <h3
                  id="init-complex"
                  className="text-[clamp(1.8rem,3.2vw,3rem)] font-medium uppercase leading-[0.95] tracking-[-0.035em]"
                >
                  {complex.name}
                </h3>
                <p className="mt-3 text-ivory/60">{complex.location}, Hyderabad</p>
              </div>
            </article>

            <p className="text-[1.1rem] leading-[1.6]" data-fade="">
              Skill is expanding its activities to other cities in India and is contemplating projects in international
              markets. In Kondapur, a hotel and a commercial complex are among its next developments.
            </p>
          </div>
        </div>
      </div>
    </MotionSection>
  );
}
