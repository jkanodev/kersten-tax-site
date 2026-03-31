import Link from "next/link";
import { SectionShell } from "@/components/section-shell";
import { ContactForm } from "@/components/forms/contact-form";
import { site } from "@/lib/site";

/** Premium contact block: narrative + form, with direct call/email as secondary paths. */
export function HomeContactCta() {
  return (
    <SectionShell id="contact" className="pb-24 lg:pb-28">
      <div className="grid gap-12 lg:grid-cols-5 lg:items-start lg:gap-14">
        <div className="lg:col-span-2">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-plum-light">
            Contact
          </p>
          <h2 className="mt-4 font-serif text-3xl font-semibold tracking-tight text-plum sm:text-4xl">
            When you&apos;re ready, I&apos;m here
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-warm sm:text-base">
            A short note is enough to get started. If you&apos;d rather hear a voice first,
            call — there&apos;s no script, and no obligation.
          </p>
          <ul className="mt-8 space-y-3 text-sm">
            <li>
              <a
                href={site.phoneTel}
                className="font-semibold text-plum underline-offset-4 hover:underline"
              >
                {site.phone}
              </a>
              <span className="text-warm-light"> · Phone</span>
            </li>
            <li>
              <a
                href={site.emailMailto}
                className="break-all font-semibold text-plum underline-offset-4 hover:underline"
              >
                {site.email}
              </a>
              <span className="text-warm-light"> · Email</span>
            </li>
          </ul>
          <p className="mt-8 text-sm text-warm-light">
            Prefer a dedicated page?{" "}
            <Link href="/contact" className="font-semibold text-plum hover:underline">
              Open the full contact form
            </Link>
            .
          </p>
        </div>
        <div className="lg:col-span-3">
          <ContactForm />
        </div>
      </div>
    </SectionShell>
  );
}
