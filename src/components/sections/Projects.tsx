import Image from "next/image";
import { MotionSection } from "@/components/motion/MotionSection";
import { Accent, ButtonLink, MediaFrame, SectionLabel, SplitLines } from "@/components/ui/primitives";
import { featuredProjects, fernHeightsAmenities, fernHeightsFacts, portfolioIndex } from "@/lib/content";

const [sarath, fern, suncity] = featuredProjects;

function Meta({ items, tone = "dark" }: { items: [string, string][]; tone?: "dark" | "light" }) {
  return (
    <dl className="grid grid-cols-2 gap-x-6 gap-y-5">
      {items.map(([k, v]) => (
        <div key={k} className={`border-t pt-3 ${tone === "light" ? "border-ivory/15" : "border-charcoal/15"}`}>
          <dt className={`eyebrow ${tone === "light" ? "text-ivory/50" : "text-grey-dark"}`}>{k}</dt>
          <dd className="mt-2 text-[0.95rem] font-medium">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

function ProjectTitle({ index, name, tone = "dark" }: { index: string; name: string; tone?: "dark" | "light" }) {
  return (
    <div className="flex items-start gap-4 md:gap-6">
      <span
        className={`font-serif text-[clamp(1.4rem,2vw,2rem)] italic leading-none ${tone === "light" ? "text-bronze" : "text-bronze-deep"}`}
        data-fade=""
      >
        {index}
      </span>
      <SplitLines
        as="h3"
        className="text-[clamp(2.4rem,6vw,6.2rem)] font-medium uppercase leading-[0.9] tracking-[-0.045em]"
        lines={name.split(" ").length > 2 ? [name.split(" ").slice(0, 2).join(" "), name.split(" ").slice(2).join(" ")] : [name]}
      />
    </div>
  );
}

export function Projects() {
  return (
    <div id="projects">
      {/* ---------------- Header + 01 Sarath City Capital Mall ---------------- */}
      <MotionSection aria-labelledby="projects-title" className="bg-ivory pb-24 pt-24 md:pb-36 md:pt-36">
        <div className="frame">
          <div className="grid gap-y-10 lg:grid-cols-12 lg:gap-x-6">
            <div className="lg:col-span-3 lg:pt-4">
              <SectionLabel index="03">Selected developments</SectionLabel>
            </div>
            <div className="lg:col-span-9">
              <SplitLines
                id="projects-title"
                className="text-[clamp(2.4rem,6.4vw,6.6rem)] font-medium leading-[0.98] tracking-[-0.045em]"
                lines={[
                  "Spaces that shape",
                  <>
                    the way we <Accent>live.</Accent>
                  </>,
                ]}
              />
              <div className="mt-10 flex flex-col gap-8 md:mt-14 md:flex-row lg:items-end md:justify-between">
                <p className="max-w-[44ch] text-[1.05rem] leading-relaxed text-grey-dark" data-fade="">
                  Retail landmarks, heritage-rooted residences and workspace towers — three developments that show the
                  range of what Skill has built across Hyderabad.
                </p>
                <div data-fade="" data-delay="0.1">
                  <ButtonLink href="#portfolio" variant="line-dark" className="w-full md:w-auto md:min-w-64">
                    Explore all projects
                  </ButtonLink>
                </div>
              </div>
            </div>
          </div>

          <article aria-labelledby="p-sarath" className="mt-24 md:mt-40">
            <div id="p-sarath">
              <ProjectTitle index={sarath.index} name={sarath.name} />
            </div>
            <MediaFrame
              src="/images/sarath-city-capital-mall.webp"
              alt="Sarath City Capital Mall — wide-angle view of its glazed corner facade under a blue sky"
              width={1600}
              height={1200}
              sizes="(min-width: 1920px) 1800px, 100vw"
              className="mt-10 aspect-[4/5] sm:aspect-[16/10] md:mt-14 lg:aspect-[21/10]"
              objectPosition="50% 45%"
              parallax={9}
            />
            <div className="mt-10 grid gap-y-10 lg:grid-cols-12 lg:gap-x-6">
              <div className="lg:col-span-4" data-fade="">
                <Meta
                  items={[
                    ["Category", sarath.category],
                    ["Location", sarath.location],
                  ]}
                />
              </div>
              <p className="text-[1.15rem] leading-[1.55] lg:col-span-4" data-fade="" data-delay="0.08">
                {sarath.summary}
              </p>
              <figure className="lg:col-span-4 lg:-mt-40 lg:-mt-56">
                <div className="bg-ivory lg:p-3">
                  <MediaFrame
                    src="/images/sarath-city-capital-mall-street.webp"
                    alt="Black-and-white street view of Sarath City Capital Mall's curved facade and mall entry"
                    width={2000}
                    height={1335}
                    sizes="(min-width: 768px) 32vw, 100vw"
                    className="aspect-[3/2]"
                    parallax={5}
                    mask="up"
                  />
                </div>
                <figcaption className="mt-3 text-xs tracking-wide text-grey-dark lg:px-3">Street frontage</figcaption>
              </figure>
            </div>
          </article>
        </div>
      </MotionSection>

      {/* ---------------- 02 Fern Heights (dark) ---------------- */}
      <MotionSection aria-labelledby="p-fern" className="bg-charcoal py-24 text-ivory md:py-36">
        <div className="frame">
          <article className="grid gap-y-12 lg:grid-cols-12 lg:gap-x-6">
            <div className="lg:col-span-7 lg:row-span-2">
              <MediaFrame
                src="/images/fern-heights-entrance.webp"
                alt="Rendered view of the grand entrance gate of Fern Heights with landscaped planting"
                width={2400}
                height={1350}
                sizes="(min-width: 768px) 58vw, 100vw"
                className="aspect-[4/5] md:aspect-[4/3] lg:aspect-[6/7]"
                objectPosition="62% 50%"
                parallax={7}
              />
              <p className="mt-3 flex justify-between text-xs tracking-wide text-ivory/50">
                <span>Grand entrance</span>
                <span>Render</span>
              </p>
            </div>

            <div className="flex flex-col lg:col-span-5 lg:col-start-8 md:pl-[4%]">
              <div id="p-fern">
                <ProjectTitle index={fern.index} name={fern.name} tone="light" />
              </div>
              <p className="mt-8 text-[1.1rem] leading-[1.6] text-ivory/80" data-fade="">
                {fern.summary}
              </p>

              <dl className="mt-10 grid grid-cols-3 border-y border-ivory/15" data-fade="" data-delay="0.08">
                {fernHeightsFacts.map((f, i) => (
                  <div key={f.label} className={`py-6 ${i > 0 ? "border-l border-ivory/15 pl-4 md:pl-6" : ""}`}>
                    <dt className="sr-only">{f.label}</dt>
                    <dd>
                      <span className="block text-[clamp(2.2rem,3.6vw,3.4rem)] font-light leading-none tracking-[-0.04em]">
                        {f.value}
                      </span>
                      <span className="mt-2 block text-xs leading-snug text-ivory/55">{f.label}</span>
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-8" data-fade="" data-delay="0.1">
                <Meta
                  tone="light"
                  items={[
                    ["Category", fern.category],
                    ["Location", fern.location],
                  ]}
                />
              </div>
            </div>

            <div className="flex flex-col justify-end lg:col-span-5 lg:col-start-8 md:pl-[4%]">
              <div className="flex gap-5 border-t border-ivory/15 pt-8" data-fade="">
                <div className="relative w-24 shrink-0 overflow-hidden md:w-28">
                  <Image
                    src="/images/fern-villa-heritage.webp"
                    alt="Archival portrait of H.E.H. Mir Osman Ali Khan, the 7th Nizam of Hyderabad"
                    width={647}
                    height={647}
                    sizes="112px"
                    className="aspect-[4/5] w-full object-cover object-top grayscale"
                  />
                </div>
                <div>
                  <p className="eyebrow text-bronze">The Fern Villa legacy</p>
                  <p className="mt-3 text-sm leading-relaxed text-ivory/70">
                    The site was gifted by the 7th Nizam of Hyderabad to his grandson, Prince Mir Shahamat Ali Khan. His
                    great-grandson later chose Skill to repurpose its old-world charm into modern residences.
                  </p>
                </div>
              </div>
              <p className="mt-8 text-xs leading-relaxed text-ivory/50" data-fade="">
                Amenities — {fernHeightsAmenities.join(" · ")}
              </p>
              <div className="mt-8" data-fade="">
                <ButtonLink href={fern.href!} external variant="line-light" className="w-full sm:w-auto sm:min-w-64">
                  Visit Fern Heights
                </ButtonLink>
              </div>
            </div>
          </article>
        </div>
      </MotionSection>

      {/* ---------------- 03 Asian Suncity + portfolio index ---------------- */}
      <MotionSection aria-labelledby="p-suncity" className="bg-ivory py-24 md:py-36">
        <div className="frame">
          <article className="grid gap-y-12 lg:grid-cols-12 lg:gap-x-6">
            <div className="flex flex-col lg:col-span-5">
              <div id="p-suncity">
                <ProjectTitle index={suncity.index} name={suncity.name} />
              </div>
              <p className="mt-8 max-w-[40ch] text-[1.1rem] leading-[1.6]" data-fade="">
                {suncity.summary}
              </p>
              <div className="mt-10" data-fade="" data-delay="0.08">
                <Meta
                  items={[
                    ["Category", suncity.category],
                    ["Location", suncity.location],
                    ["Programme", "Residential towers"],
                    ["Workspace", "IT park"],
                  ]}
                />
              </div>
              <figure className="mt-12 hidden w-[62%] lg:mt-auto lg:block">
                <MediaFrame
                  src="/images/asian-suncity-entrance.webp"
                  alt="Glass-fronted commercial building at the Asian Suncity entrance"
                  width={767}
                  height={1020}
                  sizes="20vw"
                  className="aspect-[3/4]"
                  parallax={5}
                  mask="up"
                />
              </figure>
            </div>

            <div className="lg:col-span-7">
              <MediaFrame
                src="/images/asian-suncity-facade.webp"
                alt="Asian Suncity — blue glass curtain-wall towers alongside white residential blocks"
                width={2400}
                height={1800}
                sizes="(min-width: 768px) 58vw, 100vw"
                className="aspect-[4/5] md:aspect-[4/3] lg:aspect-[5/6]"
                parallax={8}
              />
              <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs tracking-wide text-grey-dark">Glass towers and residential blocks, Kondapur</p>
                <ButtonLink href={suncity.href!} external variant="line-dark" className="w-full sm:w-auto sm:min-w-64">
                  Visit Asian Suncity
                </ButtonLink>
              </div>
            </div>
          </article>

          {/* Portfolio index — every project listed on the existing site */}
          <div id="portfolio" className="mt-28 scroll-mt-24 md:mt-44">
            <div className="grid gap-y-8 border-t border-charcoal pt-8 lg:grid-cols-12 lg:gap-x-6">
              <h3 className="text-[clamp(1.8rem,3vw,3rem)] font-medium leading-[1.05] tracking-[-0.035em] lg:col-span-5" data-fade="">
                Across the city, <Accent>for three decades.</Accent>
              </h3>
              <p className="max-w-[46ch] text-[1rem] leading-relaxed text-grey-dark lg:col-span-5 lg:col-start-8" data-fade="">
                Alongside the developments above, Skill&rsquo;s residential and commercial portfolio spans neighbourhoods
                from Banjara Hills to Moinabad.
              </p>
            </div>
            <ol className="mt-12 grid md:grid-cols-2 lg:gap-x-6">
              {portfolioIndex.map((p, i) => (
                <li
                  key={p.name}
                  className="group flex items-baseline gap-5 border-b border-charcoal/15 py-4 transition-colors duration-500 hover:border-charcoal/60 md:py-5"
                >
                  <span className="w-8 shrink-0 font-serif text-base italic text-bronze-deep">
                    {String(i + 4).padStart(2, "0")}
                  </span>
                  <span className="text-[1.15rem] font-medium tracking-[-0.015em] transition-transform duration-700 ease-[var(--ease-cine)] group-hover:translate-x-1.5 md:text-[1.35rem]">
                    {p.name}
                  </span>
                  <span className="ml-auto text-right text-sm text-grey-dark">{p.location}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </MotionSection>
    </div>
  );
}
