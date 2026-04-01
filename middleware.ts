import { auth } from "@/auth";
import { ADMIN_CANONICAL_HOST, ADMIN_CANONICAL_ORIGIN } from "@/lib/admin-canonical";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/**
 * Admin auth: ONE place that decides login vs dashboard.
 *
 * - No second `auth()` + redirect in the dashboard layout (that fought Edge and caused loops).
 * - No redirect on the login page server component (same reason).
 * - Production (Vercel `VERCEL_ENV=production`): force `www.kerstencrawford.com` for all
 *   /admin routes so session cookies stay on the canonical host.
 *
 * Flow:
 * - /admin/login → always continue (no auth redirect here).
 * - other /admin/* without session → one redirect to canonical /admin/login?callbackUrl=…
 * - other /admin/* with session → continue
 */
function normalizeAdminHost(request: NextRequest): NextResponse | null {
  if (process.env.VERCEL_ENV !== "production") return null;

  const host = request.headers.get("host")?.split(":")[0] ?? "";
  if (host === ADMIN_CANONICAL_HOST) return null;

  const target = new URL(
    request.nextUrl.pathname + request.nextUrl.search,
    ADMIN_CANONICAL_ORIGIN,
  );
  return NextResponse.redirect(target, 307);
}

export default auth((request) => {
  const canon = normalizeAdminHost(request);
  if (canon) return canon;

  const path = request.nextUrl.pathname;
  const isLogin =
    path === "/admin/login" || path.startsWith("/admin/login/");

  if (isLogin) {
    return NextResponse.next();
  }

  if (!request.auth) {
    const login = new URL("/admin/login", ADMIN_CANONICAL_ORIGIN);
    const returnTo = `${path}${request.nextUrl.search}` || "/admin";
    login.searchParams.set("callbackUrl", returnTo);
    return NextResponse.redirect(login);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
