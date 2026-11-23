"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useId, useRef, useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { company, enquiryTypes } from "@/lib/content";
import { Accent, MediaFrame, SectionLabel, SplitLines } from "@/components/ui/primitives";
import { useSectionMotion } from "@/components/motion/MotionSection";

type Fields = { name: string; email: string; phone: string; type: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;

const empty: Fields = { name: "", email: "", phone: "", type: "", message: "" };
const ease = [0.22, 1, 0.36, 1] as const;

function validate(v: Fields): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = "Please enter your full name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = "Please enter a valid email address.";
  const digits = v.phone.replace(/\D/g, "");
  if (v.phone.trim() && (digits.length < 7 || digits.length > 15 || /[^\d\s()+-]/.test(v.phone)))
    e.phone = "Please enter a valid phone number, or leave it blank.";
  if (!v.type) e.type = "Please choose the nature of your enquiry.";
  if (v.message.trim().length < 10) e.message = "Please tell us a little more (at least 10 characters).";
  return e;
}

function buildMailto(v: Fields) {
  const subject = `${v.type} — ${v.name.trim()}`;
  const body = [
    v.message.trim(),
    "",
    "—",
    `Name: ${v.name.trim()}`,
    `Email: ${v.email.trim()}`,
    v.phone.trim() ? `Phone: ${v.phone.trim()}` : "",
  ]
    .filter(Boolean)
    .join("\n");
  return `mailto:${company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function FieldError({ id, message }: { id: string; message?: string }) {
  return (
    <AnimatePresence initial={false}>
      {message && (
        <motion.p
          id={id}
          className="mt-2 text-sm text-[#f0a596]"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

function FieldLabel({ htmlFor, children, optional }: { htmlFor: string; children: React.ReactNode; optional?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="eyebrow block text-ivory/60">
      {children}
      {optional && <span className="ml-2 normal-case tracking-normal text-ivory/35">(optional)</span>}
    </label>
  );
}

export function Contact() {
  const root = useRef<HTMLElement>(null);
  useSectionMotion(root);
  const formRef = useRef<HTMLFormElement>(null);
  const uid = useId();
  const [values, setValues] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({});
  const [submitted, setSubmitted] = useState<Fields | null>(null);

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const next = { ...values, [k]: e.target.value };
    setValues(next);
    if (touched[k]) setErrors(validate(next));
  };
  const blur = (k: keyof Fields) => () => {
    setTouched((t) => ({ ...t, [k]: true }));
    setErrors(validate(values));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    setTouched({ name: true, email: true, phone: true, type: true, message: true });
    const first = Object.keys(errs)[0];
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setSubmitted(values);
  };

  const field = (k: keyof Fields) => ({
    id: `${uid}-${k}`,
    name: k,
    value: values[k],
    onChange: set(k),
    onBlur: blur(k),
    "aria-invalid": touched[k] && errors[k] ? true : undefined,
    "aria-describedby": touched[k] && errors[k] ? `${uid}-${k}-err` : undefined,
  });

  const inputCls =
    "peer w-full border-0 border-b border-ivory/25 bg-transparent px-0 pb-3 pt-2 text-[1.05rem] text-ivory placeholder:text-ivory/30 transition-colors duration-300 focus:border-ivory focus:outline-none focus:ring-0 aria-[invalid=true]:border-[#e48a7a]";

  return (
    <section id="contact" ref={root} aria-labelledby="contact-title" className="relative bg-charcoal text-ivory">
      {/* Image band with headline */}
      <div className="relative isolate overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-10">
          <MediaFrame
            src="/images/asian-suncity-towers-rooftop.webp"
            alt=""
            width={2000}
            height={1500}
            sizes="100vw"
            className="h-full bg-charcoal!"
            imgClassName="opacity-70"
            parallax={10}
            mask={false}
            hoverZoom={false}
          />
        </div>
        <div aria-hidden className="absolute inset-0 -z-10 bg-linear-to-t from-charcoal via-charcoal/50 to-charcoal/30" />
        <div className="frame flex min-h-[78svh] flex-col justify-end pb-16 pt-32 md:pb-24">
          <SectionLabel index="07" tone="light">
            Contact
          </SectionLabel>
          <SplitLines
            id="contact-title"
            className="mt-8 text-[clamp(2.8rem,9vw,10rem)] font-medium leading-[0.9] tracking-[-0.05em]"
            lines={[
              "Have a development",
              <>
                in <Accent>mind?</Accent>
              </>,
            ]}
          />
          <p className="mt-8 text-[clamp(1.1rem,1.6vw,1.4rem)] text-ivory/75" data-fade="" data-delay="0.2">
            Let&rsquo;s discuss your next project.
          </p>
        </div>
      </div>

      <div className="frame grid gap-y-16 pb-24 pt-8 lg:grid-cols-12 lg:gap-x-6 md:pb-36 md:pt-16">
        {/* Details */}
        <aside className="flex flex-col gap-10 lg:col-span-4" aria-label="Contact details">
          <div data-fade="">
            <p className="eyebrow text-bronze">{company.office.label}</p>
            <address className="mt-4 not-italic leading-relaxed text-ivory/80">
              {company.office.lines.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </address>
          </div>
          <div data-fade="" data-delay="0.05">
            <p className="eyebrow text-bronze">Email</p>
            <a href={`mailto:${company.email}`} className="link-draw mt-4 inline-block py-1 text-lg text-ivory">
              {company.email}
            </a>
          </div>
          <div data-fade="" data-delay="0.1">
            <p className="eyebrow text-bronze">Careers</p>
            <p className="mt-4 max-w-[34ch] text-sm leading-relaxed text-ivory/60">
              To apply for a role with Skill Promoters, send a cover letter and your CV to {company.email}.
            </p>
          </div>
          <div data-fade="" data-delay="0.15">
            <p className="eyebrow text-bronze">Follow</p>
            <ul className="mt-3 flex gap-6" role="list">
              {company.social.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-draw inline-flex min-h-11 items-center gap-1.5 text-ivory/80 hover:text-ivory"
                  >
                    {s.label}
                    <ArrowUpRight aria-hidden className="size-3.5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Form */}
        <div className="lg:col-span-7 lg:col-start-6" data-fade="">
          <AnimatePresence mode="wait" initial={false}>
            {submitted ? (
              <motion.div
                key="done"
                role="status"
                className="border border-ivory/15 p-7 md:p-10"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease }}
              >
                <span className="flex size-11 items-center justify-center rounded-full bg-bronze text-charcoal">
                  <Check aria-hidden className="size-5" />
                </span>
                <h3 className="mt-6 text-[clamp(1.6rem,2.6vw,2.2rem)] font-medium tracking-[-0.03em]">
                  Thank you, {submitted.name.trim().split(" ")[0]}. Your enquiry is ready.
                </h3>
                <p className="mt-4 max-w-[52ch] leading-relaxed text-ivory/70">
                  This site is a design concept and is not yet connected to a mail server, so{" "}
                  <strong className="font-semibold text-ivory">nothing has been sent</strong>. Open it in your email app to
                  send it to {company.email} — your details are already filled in.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={buildMailto(submitted)}
                    className="inline-flex min-h-12 items-center justify-center gap-3 bg-ivory px-6 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-charcoal transition-colors hover:bg-paper active:scale-[0.98]"
                  >
                    Send by email <ArrowUpRight aria-hidden className="size-4" />
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(null);
                      setValues(empty);
                      setTouched({});
                      setErrors({});
                    }}
                    className="inline-flex min-h-12 items-center justify-center px-6 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-ivory ring-1 ring-inset ring-ivory/30 transition-shadow hover:ring-ivory"
                  >
                    Start a new enquiry
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                ref={formRef}
                noValidate
                onSubmit={onSubmit}
                aria-label="Enquiry form"
                className="grid gap-x-6 gap-y-9 sm:grid-cols-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.5, ease }}
              >
                <div className="sm:col-span-2">
                  <FieldLabel htmlFor={`${uid}-name`}>Full name</FieldLabel>
                  <input {...field("name")} type="text" autoComplete="name" className={inputCls} placeholder="Your name" />
                  <FieldError id={`${uid}-name-err`} message={touched.name ? errors.name : undefined} />
                </div>
                <div>
                  <FieldLabel htmlFor={`${uid}-email`}>Email address</FieldLabel>
                  <input
                    {...field("email")}
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    className={inputCls}
                    placeholder="you@company.com"
                  />
                  <FieldError id={`${uid}-email-err`} message={touched.email ? errors.email : undefined} />
                </div>
                <div>
                  <FieldLabel htmlFor={`${uid}-phone`} optional>
                    Phone number
                  </FieldLabel>
                  <input {...field("phone")} type="tel" autoComplete="tel" inputMode="tel" className={inputCls} placeholder="+91" />
                  <FieldError id={`${uid}-phone-err`} message={touched.phone ? errors.phone : undefined} />
                </div>
                <div className="sm:col-span-2">
                  <FieldLabel htmlFor={`${uid}-type`}>Nature of enquiry</FieldLabel>
                  <div className="relative">
                    <select {...field("type")} className={`${inputCls} appearance-none pr-8 ${values.type ? "" : "text-ivory/40"}`}>
                      <option value="" disabled className="bg-charcoal text-ivory/60">
                        Select one
                      </option>
                      {enquiryTypes.map((t) => (
                        <option key={t} value={t} className="bg-charcoal text-ivory">
                          {t}
                        </option>
                      ))}
                    </select>
                    <span aria-hidden className="pointer-events-none absolute right-1 top-3 text-ivory/50">
                      ↓
                    </span>
                  </div>
                  <FieldError id={`${uid}-type-err`} message={touched.type ? errors.type : undefined} />
                </div>
                <div className="sm:col-span-2">
                  <FieldLabel htmlFor={`${uid}-message`}>Message</FieldLabel>
                  <textarea
                    {...field("message")}
                    rows={4}
                    className={`${inputCls} resize-none`}
                    placeholder="Tell us about the site, the scale and your timeline."
                  />
                  <FieldError id={`${uid}-message-err`} message={touched.message ? errors.message : undefined} />
                </div>
                <div className="flex flex-col gap-5 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                  <p className="max-w-[40ch] text-xs leading-relaxed text-ivory/45">
                    Concept build: submitting prepares your enquiry as an email to {company.email}. Nothing is sent
                    automatically.
                  </p>
                  <button
                    type="submit"
                    className="group/btn inline-flex min-h-12 items-center justify-between gap-6 bg-ivory px-6 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-charcoal transition-[background-color,transform] duration-500 hover:bg-bronze active:scale-[0.98] sm:min-w-60"
                  >
                    Submit enquiry
                    <ArrowUpRight
                      aria-hidden
                      className="size-4 transition-transform duration-500 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5"
                    />
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
