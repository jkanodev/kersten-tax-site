"use client";

import { useActionState } from "react";
import { changePasswordAction } from "@/app/admin/(dashboard)/settings/actions";

const fieldClass =
  "mt-1 w-full rounded-xl border border-white/10 bg-zinc-900 px-3 py-2.5 text-sm text-white focus:border-rose-400/50 focus:outline-none focus:ring-1 focus:ring-rose-400/30";
const labelClass = "block text-xs font-medium uppercase tracking-wider text-zinc-500";

export function PasswordChangeForm() {
  const [state, action, pending] = useActionState(changePasswordAction, null);

  return (
    <form action={action} className="space-y-4 rounded-2xl border border-white/10 bg-zinc-900/40 p-6">
      {state?.error ? (
        <p className="text-sm text-red-300" role="alert">
          {state.error}
        </p>
      ) : null}
      {state?.success ? (
        <p className="text-sm text-emerald-300" role="status">
          {state.success}
        </p>
      ) : null}
      <div>
        <label className={labelClass} htmlFor="currentPassword">
          Current password
        </label>
        <input
          id="currentPassword"
          name="currentPassword"
          type="password"
          autoComplete="current-password"
          required
          className={fieldClass}
        />
      </div>
      <div>
        <label className={labelClass} htmlFor="newPassword">
          New password
        </label>
        <input
          id="newPassword"
          name="newPassword"
          type="password"
          autoComplete="new-password"
          required
          className={fieldClass}
        />
      </div>
      <div>
        <label className={labelClass} htmlFor="confirmPassword">
          Confirm new password
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          required
          className={fieldClass}
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="rounded-xl bg-rose-400 px-4 py-3 text-sm font-semibold text-zinc-950 disabled:opacity-50"
      >
        {pending ? "Updating…" : "Update password"}
      </button>
    </form>
  );
}
