"use client";

import { useState } from "react";
import Link from "next/link";
import { serviceOptions, site } from "@/lib/site";

type ScheduleFormProps = {
  /** When true, show a compact intro line above the form (used on dedicated page) */
  showIntro?: boolean;
};

/**
 * Appointment request form — posts JSON to /api/schedule.
 * On success, swaps to a thank-you panel (no full page navigation required).
 */
export function ScheduleForm({ showIntro = false }: ScheduleFormProps) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");
    const form = e.currentTarget;
    const fd = new FormData(form);

    const body = {
      fullName: fd.get("fullName"),
      phone: fd.get("phone"),
      email: fd.get("email"),
      preferredDate: fd.get("preferredDate"),
      preferredTime: fd.get("preferredTime"),
      serviceNeeded: fd.get("serviceNeeded"),
      notes: fd.get("notes"),
    };

    try {
      const res = await fetch("/api/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus("error");
        setErrorMessage(
          typeof data.error === "string" ? data.error : "Something went wrong.",
        );
        return;
      }
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please try again or call us.");
    }
  }

  if (status === "success") {
    return (
      <div className="card-premium rounded-3xl px-6 py-12 text-center sm:px-12 sm:py-16">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blush-soft/80 text-plum">
          <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M5 13l4 4L19 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h2 className="mt-6 font-serif text-2xl font-semibold text-plum sm:text-3xl">
          You&apos;re on the calendar — almost
        </h2>
        <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-warm">
          Thank you for reaching out. Your request is in, and Kersten will follow
          up personally to confirm a time that works for you.
        </p>
        <p className="mt-6 text-sm text-warm-light">
          Prefer to talk now?{" "}
          <a
            href={site.phoneTel}
            className="font-semibold text-plum underline-offset-4 hover:underline"
          >
            Call the office
          </a>
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="rounded-2xl border border-plum/20 bg-white px-6 py-3.5 text-sm font-semibold text-plum transition-colors hover:bg-cream"
          >
            Submit another request
          </button>
          <Link
            href="/"
            className="rounded-2xl bg-plum px-6 py-3.5 text-center text-sm font-semibold text-white transition-colors hover:bg-plum-mid"
          >
            Back home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="card-premium rounded-3xl p-6 sm:p-10">
      {showIntro ? (
        <p className="mb-8 text-[15px] leading-relaxed text-warm">
          Share a few details and we&apos;ll be in touch to finalize your
          appointment — no pressure, no clutter.
        </p>
      ) : null}

      <form onSubmit={onSubmit} className="space-y-5">
        <Field label="Full name" required>
          <input
            name="fullName"
            required
            autoComplete="name"
            className={inputClass}
            placeholder="Jane Doe"
          />
        </Field>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Phone" required>
            <input
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              className={inputClass}
              placeholder="405-367-1429"
            />
          </Field>
          <Field label="Email" required>
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              className={inputClass}
              placeholder="you@email.com"
            />
          </Field>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Preferred date" required>
            <input name="preferredDate" type="date" required className={inputClass} />
          </Field>
          <Field label="Preferred time" required>
            <select name="preferredTime" required className={inputClass} defaultValue="">
              <option value="" disabled>
                Select a range
              </option>
              <option>Morning</option>
              <option>Midday</option>
              <option>Afternoon</option>
              <option>Evening</option>
              <option>Flexible</option>
            </select>
          </Field>
        </div>
        <Field label="Service needed" required>
          <select name="serviceNeeded" required className={inputClass} defaultValue="">
            <option value="" disabled>
              Choose a service
            </option>
            {serviceOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Notes">
          <textarea
            name="notes"
            rows={4}
            className={`${inputClass} resize-y min-h-[100px]`}
            placeholder="Anything we should know before we call?"
          />
        </Field>

        {status === "error" ? (
          <p className="rounded-2xl bg-blush-soft/50 px-4 py-3 text-sm text-plum" role="alert">
            {errorMessage}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full rounded-2xl bg-plum py-4 text-sm font-semibold text-white shadow-md transition-all hover:bg-plum-mid disabled:opacity-60"
        >
          {status === "submitting" ? "Sending…" : "Request appointment"}
        </button>
      </form>
    </div>
  );
}

const inputClass =
  "mt-1.5 w-full rounded-2xl border border-plum/10 bg-white/80 px-4 py-3 text-plum placeholder:text-warm-light/70 shadow-sm transition-shadow focus:border-blush focus:outline-none focus:ring-2 focus:ring-blush/35";

function Field({
  label,
  children,
             required,
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label className="block text-sm font-medium text-plum">
      {label}
      {required ? <span className="text-plum-light"> *</span> : null}
      {children}
    </label>
  );
}
