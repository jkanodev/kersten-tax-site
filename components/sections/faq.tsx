"use client";

import Link from "next/link";
import { useState } from "react";
import { SectionShell } from "@/components/section-shell";

const faqs = [
  {
    q: "What should I bring to my first appointment?",
    a: "A prior-year return (if you have one), all income documents (W-2s, 1099s), ID, Social Security cards for dependents if claiming them, and records of deductions or credits you think may apply. If you’re unsure, bring what you have — we’ll sort it together.",
  },
  {
    q: "Do you work with people who are behind on filing?",
    a: "Yes. Many clients come in after a year — or a few — they’d rather not talk about. There’s no shame in catching up, and we’ll outline the steps clearly so you’re not guessing.",
  },
  {
    q: "Can you help if I’m self-employed?",
    a: "Absolutely. Independent work has its own rhythm; we’ll organize income and expenses so your filing reflects the real picture of your business.",
  },
  {
    q: "How do fees work?",
    a: "Fees depend on the complexity of your return and the time involved. You’ll know what to expect before we begin serious work — no surprises buried in fine print.",
  },
] as const;

/** Simple accessible accordion — one panel open at a time on small screens feels calmer. */
export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <SectionShell id="faq">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-plum-light">
          FAQ
        </p>
        <h2 className="mt-4 font-serif text-3xl font-semibold tracking-tight text-plum sm:text-4xl">
          Questions, answered gently
        </h2>
      </div>

      <div className="mx-auto mt-12 max-w-3xl space-y-3">
        {faqs.map((item, i) => {
          const isOpen = open === i;
          return (
            <div
              key={item.q}
              className="overflow-hidden rounded-2xl border border-white/70 bg-white/55 shadow-sm backdrop-blur-md transition-shadow hover:shadow-md"
            >
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span className="font-serif text-lg font-semibold text-plum sm:text-xl">
                  {item.q}
                </span>
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blush-soft/70 text-plum transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M6 9l6 6 6-6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </button>
              {isOpen ? (
                <div className="border-t border-white/60 px-5 py-4 sm:px-6 sm:py-5">
                  <p className="text-[15px] leading-relaxed text-warm">{item.a}</p>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      <div className="mt-12 text-center">
        <Link
          href="/contact"
          className="inline-flex items-center rounded-2xl border border-plum/15 bg-white/80 px-6 py-3.5 text-sm font-semibold text-plum shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
        >
          Still wondering? Send a note
        </Link>
      </div>
    </SectionShell>
  );
}
