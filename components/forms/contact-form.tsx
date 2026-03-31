"use client";

import { useState } from "react";
import Link from "next/link";

/**
 * General contact form — posts to /api/contact.
 */
export function ContactForm() {
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
      name: fd.get("name"),
      phone: fd.get("phone"),
      email: fd.get("email"),
      message: fd.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
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
      setErrorMessage("Network error. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="card-premium rounded-3xl px-6 py-12 text-center sm:px-10">
        <h2 className="font-serif text-2xl font-semibold text-plum sm:text-3xl">
          Message received
        </h2>
        <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-warm">
          Thank you for writing in. Kersten will read your note personally and reply
          as soon as she can.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-2xl bg-plum px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-plum-mid"
        >
          Back home
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card-premium space-y-5 rounded-3xl p-6 sm:p-10">
      <Field label="Name" required>
        <input name="name" required autoComplete="name" className={inputClass} />
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Phone">
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            className={inputClass}
          />
        </Field>
        <Field label="Email" required>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className={inputClass}
          />
        </Field>
      </div>
      <Field label="Message" required>
        <textarea
          name="message"
          required
          rows={5}
          className={`${inputClass} min-h-[120px] resize-y`}
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
        className="w-full rounded-2xl bg-plum py-4 text-sm font-semibold text-white transition-all hover:bg-plum-mid disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}

const inputClass =
  "mt-1.5 w-full rounded-2xl border border-plum/10 bg-white/80 px-4 py-3 text-plum shadow-sm transition-shadow focus:border-blush focus:outline-none focus:ring-2 focus:ring-blush/35";

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
