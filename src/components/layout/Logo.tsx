import Image from "next/image";

/** Original Skill mark (from the company's own logo file) + a typographic "Promoters". */
export function Logo({ tone = "light", className = "" }: { tone?: "light" | "dark"; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <Image src="/images/skill-mark.png" alt="" width={307} height={160} className="h-7 w-auto md:h-8" />
      <span
        className={`text-[0.7rem] font-semibold uppercase leading-none tracking-[0.32em] ${
          tone === "light" ? "text-ivory" : "text-charcoal"
        }`}
      >
        Promoters
      </span>
    </span>
  );
}
