import { SectionShell } from "@/components/section-shell";

/** Differentiators without hype or fake metrics. */
export function WhyUs() {
  return (
    <SectionShell id="why-us" className="bg-white/20">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-plum-light">
            Why choose us
          </p>
          <h2 className="mt-4 font-serif text-3xl font-semibold tracking-tight text-plum sm:text-4xl">
            Precision with a human pulse
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-warm sm:text-base">
            The best tax experience doesn&apos;t feel like a factory line. It feels
            like someone competent is paying attention — to your documents, your
            stress level, and the outcomes you care about.
          </p>
        </div>
        <ul className="space-y-4">
          {[
            {
              k: "Thoughtful pacing",
              v: "We won’t rush you through forms or gloss over what concerns you.",
            },
            {
              k: "Straight talk",
              v: "Complex ideas explained in language that respects your time.",
            },
            {
              k: "Long-view thinking",
              v: "Not just “file and forget” — we consider what this year means for the next.",
            },
            {
              k: "Local presence",
              v: "A real person in your corner when Oklahoma tax questions come up.",
            },
          ].map((row) => (
            <li
              key={row.k}
              className="flex gap-4 rounded-2xl border border-white/60 bg-white/50 px-4 py-4 shadow-sm backdrop-blur-sm transition-shadow hover:shadow-md sm:px-5"
            >
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blush-soft/80 text-sm font-bold text-plum">
                ✓
              </span>
              <div>
                <p className="font-semibold text-plum">{row.k}</p>
                <p className="mt-1 text-sm leading-relaxed text-warm">{row.v}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </SectionShell>
  );
}
