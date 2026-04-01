import { auth } from "@/auth";
import { NextResponse } from "next/server";

/**
 * Locks down /admin except /admin/login.
 *
 * IMPORTANT: Do not redirect "authenticated" users away from /admin/login here.
 * Edge `req.auth` can disagree with Node `auth()` in the dashboard layout (session
 * not readable yet, cookie edge cases, www vs apex). That mismatch caused:
 * layout → /admin/login, middleware → /admin, infinite redirects.
 * Logged-in users hitting the login page are redirected once in that route's
 * server component, using the same `auth()` as the rest of the app.
 */
export default auth((req) => {
  const path = req.nextUrl.pathname;
  const isLogin =
    path === "/admin/login" || path.startsWith("/admin/login/");

  if (isLogin) {
    return NextResponse.next();
  }

  if (!req.auth) {
    const url = new URL("/admin/login", req.nextUrl.origin);
    url.searchParams.set("callbackUrl", path);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/admin",
    "/admin/:path*",
  ],
};
