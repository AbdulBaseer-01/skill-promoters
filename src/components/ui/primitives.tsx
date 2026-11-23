import Image from "next/image";
import type { ElementType, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

/* ------------------------------------------------------------------ */
/* SplitLines — a heading broken into masked lines for GSAP reveals     */
/* ------------------------------------------------------------------ */
type SplitLinesProps = {
  lines: ReactNode[];
  as?: ElementType;
  className?: string;
  lineClassName?: string;
  delay?: number;
  id?: string;
};

export function SplitLines({ lines, as: Tag = "h2", className, lineClassName, delay, id }: SplitLinesProps) {
  return (
    <Tag className={className} data-lines="" data-delay={delay} id={id}>
      {lines.map((line, i) => (
        <span key={i} className={`line-mask ${lineClassName ?? ""}`}>
          <span className="block will-change-transform">{line}</span>
        </span>
      ))}
    </Tag>
  );
}

/** Instrument Serif italic accent inside a Manrope headline. */
export function Accent({ children }: { children: ReactNode }) {
  return <em className="font-serif font-normal italic tracking-[-0.01em]">{children}</em>;
}

/* ------------------------------------------------------------------ */
/* SectionLabel — numbered editorial marker                            */
/* ------------------------------------------------------------------ */
export function SectionLabel({ index, children, tone = "dark" }: { index: string; children: ReactNode; tone?: "dark" | "light" }) {
  return (
    <p
      className={`eyebrow flex items-center gap-4 ${tone === "light" ? "text-ivory/70" : "text-grey-dark"}`}
      data-fade=""
    >
      <span className={tone === "light" ? "text-bronze" : "text-bronze-deep"}>{index}</span>
      <span aria-hidden className={`h-px w-10 ${tone === "light" ? "bg-ivory/30" : "bg-charcoal/25"}`} />
      <span>{children}</span>
    </p>
  );
}

/* ------------------------------------------------------------------ */
/* MediaFrame — clipped frame > parallax layer > image (hover zoom)    */
/* Three elements, three owners: GSAP clip, GSAP drift, CSS hover.     */
/* ------------------------------------------------------------------ */
type MediaFrameProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes: string;
  className?: string;
  imgClassName?: string;
  parallax?: number | false;
  mask?: boolean | "up";
  preload?: boolean;
  hoverZoom?: boolean;
  objectPosition?: string;
};

export function MediaFrame({
  src,
  alt,
  width,
  height,
  sizes,
  className = "",
  imgClassName = "",
  parallax = 8,
  mask = true,
  preload,
  hoverZoom = true,
  objectPosition,
}: MediaFrameProps) {
  const scale = parallax ? 1 + (parallax * 2.4) / 100 : 1;
  return (
    <div
      className={`group/media relative overflow-hidden bg-stone ${className}`}
      data-mask={mask ? (mask === "up" ? "up" : "") : undefined}
    >
      <div
        className="absolute inset-0 will-change-transform"
        data-parallax={parallax ? String(parallax) : undefined}
        style={parallax ? { transform: `scale(${scale})` } : undefined}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          preload={preload}
          className={`h-full w-full object-cover ${
            hoverZoom ? "transition-transform duration-[1400ms] ease-[var(--ease-cine)] group-hover/media:scale-[1.03]" : ""
          } ${imgClassName}`}
          style={objectPosition ? { objectPosition } : undefined}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Buttons                                                              */
/* ------------------------------------------------------------------ */
type BtnProps = {
  href: string;
  children: ReactNode;
  variant?: "solid-light" | "solid-dark" | "line-light" | "line-dark";
  external?: boolean;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  className?: string;
};

const btnTone: Record<NonNullable<BtnProps["variant"]>, string> = {
  "solid-light": "bg-ivory text-charcoal hover:bg-paper",
  "solid-dark": "bg-charcoal text-ivory hover:bg-charcoal-2",
  "line-light": "text-ivory ring-1 ring-inset ring-ivory/40 hover:ring-ivory",
  "line-dark": "text-charcoal ring-1 ring-inset ring-charcoal/30 hover:ring-charcoal",
};

export function ButtonLink({ href, children, variant = "solid-light", external, onClick, className = "" }: BtnProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group/btn relative inline-flex min-h-12 whitespace-nowrap items-center justify-between gap-6 overflow-hidden px-6 py-3.5 text-[0.78rem] font-semibold uppercase tracking-[0.18em] transition-[background-color,box-shadow,transform] duration-500 ease-[var(--ease-cine)] active:scale-[0.98] ${btnTone[variant]} ${className}`}
    >
      <span className="relative">{children}</span>
      <span aria-hidden className="relative inline-flex size-4 overflow-hidden">
        <ArrowUpRight
          className="absolute inset-0 size-4 transition-transform duration-500 ease-[var(--ease-cine)] group-hover/btn:-translate-y-full group-hover/btn:translate-x-full"
          strokeWidth={1.75}
        />
        <ArrowUpRight
          className="absolute inset-0 size-4 -translate-x-full translate-y-full transition-transform duration-500 ease-[var(--ease-cine)] group-hover/btn:translate-x-0 group-hover/btn:translate-y-0"
          strokeWidth={1.75}
        />
      </span>
    </a>
  );
}
