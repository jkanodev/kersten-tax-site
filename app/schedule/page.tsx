import type { Metadata } from "next";
import Link from "next/link";
import { ScheduleForm } from "@/components/forms/schedule-form";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Schedule an appointment",
  description: `Request a time with ${site.name}. ${site.tagline}`,
};

/**
 * Standalone scheduling page — ideal for sharing a direct link or ads.
 */
export default function SchedulePage() {
  return (
    <main className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-xl">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.22em] text-plum-light">
          {site.name}
        </p>
        <h1 className="mt-4 text-center font-serif text-3xl font-semibold tracking-tight text-plum sm:text-4xl">
          Request an appointment
        </h1>
        <p className="mx-auto mt-4 max-w-md text-center text-[15px] leading-relaxed text-warm">
          A few details are all I need to follow up personally. If something is
          urgent, you&apos;re always welcome to{" "}
          <a
            href={site.phoneTel}
            className="font-semibold text-plum underline-offset-4 hover:underline"
          >
            call
          </a>
          .
        </p>

        <div className="mt-10">
          <ScheduleForm showIntro />
        </div>

        <p className="mt-10 text-center text-sm text-warm-light">
          <Link href="/" className="font-medium text-plum hover:underline">
            ← Back to home
          </Link>
        </p>
      </div>
    </main>
  );
}
