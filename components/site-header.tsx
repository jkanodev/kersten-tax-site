"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";

const nav = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Why Us", href: "/#why-us" },
  { label: "FAQ", href: "/#faq" },
  { label: "Schedule", href: "/schedule" },
  { label: "Contact", href: "/contact" },
] as const;

/**
 * Top navigation: desktop row of links, mobile drawer with the same links.
 * Client component so we can toggle the menu and lock body scroll when open.
 */
export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/50 bg-[var(--glass)] backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/#home"
          className="group flex min-w-0 flex-col leading-tight transition-opacity hover:opacity-85"
        >
          <span className="font-serif text-lg font-semibold tracking-tight text-plum sm:text-xl">
            {site.name}
          </span>
          <span className="hidden text-[10px] font-medium uppercase tracking-[0.2em] text-warm-light sm:block sm:text-[11px]">
            Tax preparation
          </span>
        </Link>

        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label="Main"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-2 text-sm font-medium text-plum/85 transition-colors hover:bg-white/60 hover:text-plum"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={site.phoneTel}
            className="hidden rounded-full border border-plum/15 bg-white/50 px-3 py-2 text-sm font-semibold text-plum shadow-sm transition-all hover:border-blush/50 hover:bg-white sm:inline-flex"
          >
            {site.phone}
          </a>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-plum/10 bg-white/70 text-plum lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            {open ? (
              <CloseIcon />
            ) : (
              <MenuIcon />
            )}
          </button>
        </div>
      </div>

      {open ? (
        <div
          id="mobile-menu"
          className="border-t border-white/40 bg-cream/95 px-4 py-6 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <nav className="mx-auto flex max-w-md flex-col gap-1" aria-label="Mobile main">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-2xl px-4 py-3 text-base font-medium text-plum transition-colors hover:bg-white/70"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={site.phoneTel}
              className="mt-2 rounded-2xl bg-plum px-4 py-3 text-center text-base font-semibold text-white"
              onClick={() => setOpen(false)}
            >
              Call {site.phone}
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 7h16M4 12h16M4 17h16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
