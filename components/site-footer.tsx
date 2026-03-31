import Link from "next/link";
import { site } from "@/lib/site";

/**
 * Site footer with contact shortcuts and anchor links back into the homepage sections.
 */
export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer
      id="footer"
      className="mt-auto border-t border-white/40 bg-plum text-cream"
    >
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <p className="font-serif text-2xl font-semibold">{site.name}</p>
            <p className="mt-3 max-w-md text-sm opacity-90">{site.tagline}</p>
            <p className="mt-4 text-xs uppercase tracking-wider text-blush-soft/90">
              Discreet, personal service
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-blush-soft">
              Reach out
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a
                  href={site.phoneTel}
                  className="transition-opacity hover:opacity-80"
                >
                  {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={site.emailMailto}
                  className="break-all transition-opacity hover:opacity-80"
                >
                  {site.email}
                </a>
              </li>
              <li className="pt-1">
                <span className="opacity-80">{site.domain}</span>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-blush-soft">
              Explore
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/#about" className="opacity-90 hover:opacity-100">
                  About
                </Link>
              </li>
              <li>
                <Link href="/#services" className="opacity-90 hover:opacity-100">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/schedule" className="opacity-90 hover:opacity-100">
                  Schedule
                </Link>
              </li>
              <li>
                <Link href="/contact" className="opacity-90 hover:opacity-100">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-8 text-xs text-cream/70 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {site.name}. All rights reserved.</p>
          <p>This site does not constitute tax or legal advice.</p>
        </div>
      </div>
    </footer>
  );
}
