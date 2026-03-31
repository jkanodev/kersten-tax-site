import { SectionShell } from "@/components/section-shell";
import { site } from "@/lib/site";

/** Warm intro block — introduces Kersten without invented credentials or numbers. */
export function AboutIntro() {
  return (
    <SectionShell id="about" className="bg-white/25">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-plum-light">
            About Kersten
          </p>
          <h2 className="mt-4 font-serif text-3xl font-semibold tracking-tight text-plum sm:text-4xl">
            A steady hand when tax season feels loud
          </h2>
          <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-warm sm:text-base">
            <p>
              I&apos;m {site.name}, and I work with people who want their taxes done
              carefully — not rushed, not anonymous. Whether you&apos;re filing a
              straightforward return, sorting through 1099s, or running a small
              business and tired of guessing, we&apos;ll walk through it together at
              a pace that respects your life.
            </p>
            <p>
              My approach is simple: listen first, explain in plain language, and
              protect what matters to you. You&apos;ll always know who is on the
              other side of the desk — or the other end of the phone.
            </p>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-blush-soft/60 to-cream-deep/50 blur-2xl" aria-hidden />
          <div className="card-premium relative rounded-3xl p-8 sm:p-10">
            <p className="font-serif text-xl font-medium italic leading-snug text-plum sm:text-2xl">
              &ldquo;I believe the best outcomes start with trust — the quiet kind
              you earn one conversation at a time.&rdquo;
            </p>
            <p className="mt-6 text-sm font-semibold text-plum-light">
              — {site.name}
            </p>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
