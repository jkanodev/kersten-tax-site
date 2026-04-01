"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

/** Relative in-app path only; prevents open redirects and host hopping after sign-in. */
function safeAdminCallbackUrl(raw: string | null): string {
  if (!raw || !raw.startsWith("/") || raw.startsWith("//")) return "/admin";
  if (raw.includes(":")) return "/admin";
  if (!raw.startsWith("/admin")) return "/admin";
  return raw;
}

export function AdminLoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = useMemo(
    () => safeAdminCallbackUrl(searchParams.get("callbackUrl")),
    [searchParams],
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setPending(true);
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl,
    });
    setPending(false);
    if (res?.error) {
      setError("Email or password is incorrect.");
      return;
    }
    window.location.assign(callbackUrl);
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mt-10 space-y-5 rounded-2xl border border-white/10 bg-zinc-900/50 p-6 shadow-xl"
    >
      {error ? (
        <p className="rounded-lg bg-red-950/60 px-3 py-2 text-center text-sm text-red-200">
          {error}
        </p>
      ) : null}
      <div>
        <label htmlFor="email" className="block text-xs font-medium text-zinc-500">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="username"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 w-full rounded-xl border border-white/10 bg-zinc-900 px-3 py-2.5 text-sm text-white focus:border-rose-400/40 focus:outline-none focus:ring-1 focus:ring-rose-400/30"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-xs font-medium text-zinc-500">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 w-full rounded-xl border border-white/10 bg-zinc-900 px-3 py-2.5 text-sm text-white focus:border-rose-400/40 focus:outline-none focus:ring-1 focus:ring-rose-400/30"
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-xl bg-rose-400 py-3 text-sm font-semibold text-zinc-950 hover:bg-rose-300 disabled:opacity-50"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
