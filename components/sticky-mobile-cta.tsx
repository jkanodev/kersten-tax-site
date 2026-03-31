import Link from "next/link";
import { site } from "@/lib/site";

/**
 * Fixed bottom bar on small screens: quick call + book — primary conversions on mobile.
 * Hidden on large breakpoints where the header already surfaces the phone number.
 */
export function StickyMobileCta() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-white/50 bg-[var(--glass)] px-3 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur-lg lg:hidden"
      role="region"
      aria-label="Quick actions"
    >
      <div className="mx-auto flex max-w-lg gap-2">
        <a
          href={site.phoneTel}
          className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-plum/15 bg-white/90 py-3.5 text-sm font-semibold text-plum shadow-sm transition-transform active:scale-[0.98]"
        >
          <PhoneGlyph className="h-4 w-4 text-plum-light" />
          Call now
        </a>
        <Link
          href="/schedule"
          className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-plum py-3.5 text-sm font-semibold text-white shadow-md transition-transform hover:bg-plum-mid active:scale-[0.98]"
        >
          Schedule
        </Link>
      </div>
    </div>
  );
}

function PhoneGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V21c0 .55-.45 1-1 1-10.39 0-19-8.61-19-19 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
        fill="currentColor"
      />
    </svg>
  );
}
