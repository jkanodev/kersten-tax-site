import { auth } from "@/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { AdminLoginForm } from "@/app/admin/login/login-form";

/**
 * Admin sign-in. Credentials live in AdminUser (see Prisma seed).
 * Production URL: https://www.kerstencrawford.com/admin/login
 *
 * If already signed in (same `auth()` as dashboards), skip the form — avoids
 * conflicting with middleware when session is valid in Node but was previously
 * mishandled in the Edge login→admin redirect.
 */
export default async function AdminLoginPage() {
  const session = await auth();
  if (session?.user) {
    redirect("/admin");
  }

  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 px-4 py-16 text-zinc-100">
      <div className="mx-auto w-full max-w-md">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">
          Kersten Crawford
        </p>
        <h1 className="mt-4 text-center font-serif text-2xl font-semibold text-white">
          Admin sign in
        </h1>
        <p className="mt-2 text-center text-sm text-zinc-500">
          Private dashboard — not linked from the public menu.
        </p>

        <Suspense
          fallback={
            <div className="mt-10 rounded-2xl border border-white/10 bg-zinc-900/50 p-10 text-center text-sm text-zinc-500">
              Loading…
            </div>
          }
        >
          <AdminLoginForm />
        </Suspense>

        <p className="mt-8 text-center text-xs text-zinc-600">
          <Link href="/" className="text-zinc-400 hover:text-white">
            ← Back to public site
          </Link>
        </p>
      </div>
    </div>
  );
}
