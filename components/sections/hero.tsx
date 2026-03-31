import Link from "next/link";
import { site } from "@/lib/site";

/**
 * Above-the-fold hero: headline hierarchy, soft gradient wash, primary CTAs.
 * Designed for phones first — typography scales up on larger screens.
 */
export function Hero() {
  return (
    <section
      id="home"
      className="relative scroll-mt-20 overflow-hidden px-4 pb-20 pt-12 sm:px-6 sm:pb-28 sm:pt-16 lg:px-8 lg:pb-36 lg:pt-20"
    >
      {/* Decorative wash — stays subtle so type remains the focus */}
      <div
        className="pointer-events-none absolute -right-20 top-0 h-[420px] w-[420px] rounded-full bg-gradient-to-br from-blush/40 via-blush-soft/50 to-transparent blur-3xl sm:h-[520px] sm:w-[520px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-32 bottom-0 h-[280px] w-[280px] rounded-full bg-gradient-to-tr from-cream-deep/80 to-transparent blur-2xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl">
        <p className="animate-fade-rise text-xs font-semibold uppercase tracking-[0.28em] text-plum-light sm:text-sm">
          {site.tagline}
        </p>
        <h1 className="animate-fade-rise animation-delay-100 mt-5 max-w-[14ch] font-serif text-[2.35rem] font-semibold leading-[1.08] tracking-tight text-plum sm:max-w-2xl sm:text-5xl lg:text-[3.5rem] lg:leading-[1.06]">
          Clarity for your taxes.{" "}
          <span className="text-plum-light">Care you can feel.</span>
        </h1>
        <p className="animate-fade-rise animation-delay-200 mt-6 max-w-xl text-[17px] leading-relaxed text-warm sm:text-lg">
          Thoughtful preparation for individuals, self-employed filers, and small
          businesses — handled with discretion, patience, and the kind of attention
          you&apos;d expect from someone who takes your story seriously.
        </p>

        <div className="animate-fade-rise animation-delay-300 mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a
            href={site.phoneTel}
            className="inline-flex items-center justify-center rounded-2xl border-2 border-plum/15 bg-white/90 px-7 py-4 text-center text-sm font-semibold text-plum shadow-sm transition-all hover:-translate-y-0.5 hover:border-blush/40 hover:shadow-md active:translate-y-0"
          >
            Call {site.phone}
          </a>
          <Link
            href="/schedule"
            className="inline-flex items-center justify-center rounded-2xl bg-plum px-7 py-4 text-center text-sm font-semibold text-white shadow-lg shadow-plum/20 transition-all hover:-translate-y-0.5 hover:bg-plum-mid active:translate-y-0"
          >
            Schedule an appointment
          </Link>
        </div>

        <p className="mt-8 max-w-md text-sm leading-relaxed text-warm-light">
          Based in Oklahoma · Serving clients who value a personal relationship
          with the person preparing their return.
        </p>
      </div>
    </section>
  );
}
