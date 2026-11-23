import { company, featuredProjects, navLinks } from "@/lib/content";
import { MotionSection } from "@/components/motion/MotionSection";
import { Logo } from "./Logo";

const projectAnchors: Record<string, string> = {
  "sarath-city": "#p-sarath",
  "fern-heights": "#p-fern",
  "asian-suncity": "#p-suncity",
};

function Col({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <p className="eyebrow text-ivory/40">{title}</p>
      <div className="mt-5">{children}</div>
    </div>
  );
}

const linkCls = "link-draw inline-flex min-h-9 items-center text-[0.95rem] text-ivory/75 transition-colors hover:text-ivory";

export function Footer() {
  return (
    <MotionSection as="footer" className="relative overflow-hidden border-t border-ivory/10 bg-charcoal text-ivory">
      <div className="frame pb-8 pt-20 md:pt-28">
        <div className="grid gap-y-14 lg:grid-cols-12 lg:gap-x-6">
          <div className="lg:col-span-4" data-fade="">
            <Logo />
            <p className="mt-7 max-w-[36ch] text-[0.95rem] leading-relaxed text-ivory/60">
              A Hyderabad construction and real estate development company, delivering commercial, residential and
              housing projects since {company.established}.
            </p>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-7 lg:col-start-6" data-fade="">
            <Col title="Explore">
              <ul role="list" className="flex flex-col">
                {navLinks.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className={linkCls}>
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </Col>
            <Col title="Projects">
              <ul role="list" className="flex flex-col">
                {featuredProjects.map((p) => (
                  <li key={p.id}>
                    <a href={projectAnchors[p.id]} className={linkCls}>
                      {p.name}
                    </a>
                  </li>
                ))}
                <li>
                  <a href="#portfolio" className={linkCls}>
                    Full portfolio
                  </a>
                </li>
              </ul>
            </Col>
            <Col title="Contact" className="col-span-2 sm:col-span-1">
              <address className="not-italic text-[0.95rem] leading-relaxed text-ivory/75">
                {company.office.lines.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </address>
              <a href={`mailto:${company.email}`} className={`${linkCls} mt-3`}>
                {company.email}
              </a>
              <ul role="list" className="mt-2 flex gap-5">
                {company.social.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className={linkCls}>
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </Col>
          </nav>
        </div>

        {/* Closing wordmark */}
        <div className="mt-24 md:mt-32" aria-hidden>
          <p
            className="whitespace-nowrap text-[clamp(3rem,15.2vw,17.5rem)] font-semibold uppercase leading-[0.8] tracking-[-0.06em] text-ivory"
            data-lines=""
          >
            <span className="line-mask">
              <span className="block">
                Skill <em className="font-serif font-normal lowercase italic tracking-[-0.03em] text-bronze">promoters</em>
              </span>
            </span>
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-ivory/10 pt-6 text-xs text-ivory/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {company.name} · Est. {company.established} · Hyderabad, Telangana</p>
          <a href="#top" className="link-draw inline-flex min-h-11 w-fit items-center gap-2 text-ivory/60 hover:text-ivory">
            Back to top <span aria-hidden>↑</span>
          </a>
        </div>
      </div>
    </MotionSection>
  );
}
