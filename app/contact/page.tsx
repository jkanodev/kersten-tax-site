import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/forms/contact-form";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Reach ${site.name} by phone, email, or message.`,
};

export default function ContactPage() {
  return (
    <main className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-xl">
        <h1 className="text-center font-serif text-3xl font-semibold tracking-tight text-plum sm:text-4xl">
          Get in touch
        </h1>
        <p className="mx-auto mt-4 max-w-md text-center text-[15px] leading-relaxed text-warm">
          Write as much or as little as you like. I read every message myself.
        </p>

        <div className="mt-10 space-y-6 text-center text-sm text-warm">
          <p>
            <a
              href={site.phoneTel}
              className="font-semibold text-plum hover:underline"
            >
              {site.phone}
            </a>
            {" · "}
            <a
              href={site.emailMailto}
              className="font-semibold text-plum hover:underline"
            >
              {site.email}
            </a>
          </p>
        </div>

        <div className="mt-10">
          <ContactForm />
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
