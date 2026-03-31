import { SectionShell } from "@/components/section-shell";

/** Confidentiality and trust — no fabricated stats, only sincere assurances. */
export function TrustSection() {
  return (
    <SectionShell id="trust" className="bg-gradient-to-b from-white/40 to-transparent">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-plum-light">
          Privacy & trust
        </p>
        <h2 className="mt-4 font-serif text-3xl font-semibold tracking-tight text-plum sm:text-4xl">
          Your information stays yours
        </h2>
        <p className="mt-6 text-[15px] leading-relaxed text-warm sm:text-base">
          Tax preparation means sharing sensitive details. I treat every document
          and conversation with care — stored responsibly, discussed discreetly,
          and never discussed outside what&apos;s required to complete your work.
          If you have specific concerns, we&apos;ll address them before you share
          a single form.
        </p>
      </div>

      <ul className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-3">
        {[
          {
            title: "One relationship",
            text: "You work directly with me — not a rotating cast of strangers.",
          },
          {
            title: "Clear explanations",
            text: "You deserve to understand your return, not just sign it.",
          },
          {
            title: "Room for questions",
            text: "No question is too small — if it matters to you, it matters.",
          },
        ].map((item) => (
          <li key={item.title}>
            <div className="card-premium h-full rounded-2xl p-5 text-center sm:p-6">
              <p className="font-serif text-lg font-semibold text-plum">{item.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-warm">{item.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}
