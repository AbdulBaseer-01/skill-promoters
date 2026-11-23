import { MotionSection } from "@/components/motion/MotionSection";
import { Accent, MediaFrame, SectionLabel, SplitLines } from "@/components/ui/primitives";

export function Intro() {
  return (
    <MotionSection id="about" aria-labelledby="about-title" className="relative bg-ivory py-24 md:py-36">
      <div className="frame">
        <div className="grid gap-y-10 lg:grid-cols-12 lg:gap-x-6">
          <div className="lg:col-span-3 lg:pt-4">
            <SectionLabel index="01">Who we are</SectionLabel>
          </div>
          <SplitLines
            id="about-title"
            className="text-[clamp(2.4rem,6.4vw,6.6rem)] font-medium leading-[0.98] tracking-[-0.045em] lg:col-span-9"
            lines={[
              "Creating spaces.",
              <>
                Building <Accent>possibilities.</Accent>
              </>,
              <span key="l3" className="text-grey">
                Delivering lasting value.
              </span>,
            ]}
          />
        </div>

        <div className="mt-16 grid gap-y-12 md:mt-28 lg:grid-cols-12 lg:gap-x-6">
          <figure className="lg:col-span-7">
            <MediaFrame
              src="/images/asian-suncity-tower-upward.webp"
              alt="Looking up at the white residential towers of Asian Suncity, Kondapur"
              width={2000}
              height={1500}
              sizes="(min-width: 768px) 58vw, 100vw"
              className="aspect-[4/5] md:aspect-[4/3] lg:aspect-[5/6]"
              parallax={7}
            />
            <figcaption className="mt-3 flex justify-between text-xs tracking-wide text-grey-dark">
              <span>Asian Suncity</span>
              <span>Kondapur, Hyderabad</span>
            </figcaption>
          </figure>

          <div className="flex flex-col lg:col-span-4 lg:col-start-9">
            <p className="text-[1.35rem] leading-[1.4] tracking-[-0.01em] text-charcoal md:text-[1.6rem]" data-fade="">
              Since 1994, Skill Promoters has evolved into a construction and real estate development company with
              experience across residential, commercial and housing projects.
            </p>
            <p className="mt-7 max-w-[46ch] text-[1rem] leading-relaxed text-grey-dark" data-fade="" data-delay="0.1">
              Our mission is to serve the many segments of the construction industry, to meet and set coveted
              standards, and to provide real value to our clients. Across three decades, Skill and its group
              affiliates have conceptualised, planned, developed, managed and executed a wide range of commercial,
              residential and housing ventures.
            </p>

            <a
              href="#legacy"
              className="link-draw mt-8 inline-flex w-fit items-center gap-3 py-2 text-sm font-semibold uppercase tracking-[0.16em]"
              data-fade=""
              data-delay="0.15"
            >
              Read our story <span aria-hidden>→</span>
            </a>

            <figure className="relative mt-12 lg:mt-auto lg:-ml-[calc(100%/4+1.5rem)]">
              <div className="bg-ivory p-0 lg:p-3">
                <MediaFrame
                  src="/images/fern-heights-gym.webp"
                  alt="Rendered interior of the gym at Fern Heights"
                  width={1600}
                  height={900}
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="aspect-[16/10]"
                  parallax={5}
                  mask="up"
                />
              </div>
              <figcaption className="mt-3 flex justify-between text-xs tracking-wide text-grey-dark lg:px-3">
                <span>Fern Heights — fitness level</span>
                <span>Render</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </MotionSection>
  );
}
