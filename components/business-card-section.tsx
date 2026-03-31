/* eslint-disable @next/next/no-img-element -- Optional public/business-card.jpg; <img> gives reliable onError fallback */
"use client";

import { useCallback, useEffect, useId, useState } from "react";
import { SectionShell } from "@/components/section-shell";

/**
 * Displays the real business card image (public/business-card.jpg) with a lightbox modal.
 * If the file is missing, we fall back to an elegant placeholder frame.
 */
export function BusinessCardSection() {
  const [open, setOpen] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);
  const titleId = useId();

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close]);

  return (
    <SectionShell id="business-card" className="bg-white/30">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-plum-light">
          In her own words
        </p>
        <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-plum sm:text-4xl">
          The card you&apos;ll recognize
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-warm sm:text-base">
          When we meet, this is the same card you&apos;ll have in hand — a small
          detail that matters when trust is everything.
        </p>
      </div>

      <div className="mx-auto mt-12 flex justify-center">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="group relative max-w-sm rounded-3xl focus:outline-none focus-visible:ring-2 focus-visible:ring-plum-light focus-visible:ring-offset-4 focus-visible:ring-offset-cream"
          aria-haspopup="dialog"
          aria-expanded={open}
        >
          <span className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-blush-soft/80 via-white/40 to-cream-deep/80 opacity-70 blur-2xl transition-opacity group-hover:opacity-100" />
          <div className="card-premium overflow-hidden rounded-2xl p-2 sm:p-3">
            {imgFailed ? (
              <PlaceholderCard />
            ) : (
              <img
                src="/business-card.jpg"
                alt="Kersten Crawford business card"
                className="mx-auto max-h-[220px] w-auto rounded-xl object-contain shadow-inner sm:max-h-[260px]"
                onError={() => setImgFailed(true)}
              />
            )}
          </div>
          <span className="mt-3 block text-center text-sm font-medium text-plum-light opacity-80 transition-opacity group-hover:opacity-100">
            Tap to enlarge
          </span>
        </button>
      </div>

      {open ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-plum/60 p-4 backdrop-blur-sm"
          role="presentation"
          onClick={close}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative max-h-[90vh] max-w-lg overflow-auto rounded-3xl bg-white p-3 shadow-2xl sm:p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id={titleId} className="sr-only">
              Business card enlarged
            </h2>
            <button
              type="button"
              onClick={close}
              className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-cream text-plum shadow-sm transition-colors hover:bg-blush-soft"
              aria-label="Close"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            {imgFailed ? (
              <PlaceholderCard large />
            ) : (
              <img
                src="/business-card.jpg"
                alt="Kersten Crawford business card"
                className="mx-auto max-h-[80vh] w-full rounded-2xl object-contain"
              />
            )}
          </div>
        </div>
      ) : null}
    </SectionShell>
  );
}

function PlaceholderCard({ large = false }: { large?: boolean }) {
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-xl bg-gradient-to-br from-cream via-blush-soft/40 to-cream-deep text-center ${
        large ? "min-h-[320px] px-10 py-16" : "min-h-[200px] px-8 py-12 sm:min-h-[220px]"
      }`}
    >
      <p className="font-serif text-lg font-semibold text-plum sm:text-xl">
        Add your card image
      </p>
      <p className="mt-2 max-w-xs text-sm text-warm">
        Save your scan as{" "}
        <code className="rounded bg-white/60 px-1.5 py-0.5 text-xs">public/business-card.jpg</code>
      </p>
    </div>
  );
}
