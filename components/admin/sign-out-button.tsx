"use client";

import { signOut } from "next-auth/react";

type Props = { className?: string; compact?: boolean };

export function SignOutButton({ className = "", compact }: Props) {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/admin/login" })}
      className={`rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-zinc-300 transition-colors hover:bg-white/10 hover:text-white ${
        compact ? "shrink-0" : "w-full text-left"
      } ${className}`}
    >
      {compact ? "Out" : "Sign out"}
    </button>
  );
}
