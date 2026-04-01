import { auth } from "@/auth";

/**
 * Locks down /admin except /admin/login.
 * Public marketing site stays open; dashboard lives on same domain (e.g. www.kerstencrawford.com/admin).
 */
export default auth((req) => {
  const path = req.nextUrl.pathname;
  const isLogin =
    path === "/admin/login" || path.startsWith("/admin/login/");

  if (isLogin && req.auth) {
    return Response.redirect(new URL("/admin", req.nextUrl.origin));
  }

  if (isLogin) return;

  if (path.startsWith("/admin") && !req.auth) {
    const url = new URL("/admin/login", req.nextUrl.origin);
    url.searchParams.set("callbackUrl", path);
    return Response.redirect(url);
  }
});

export const config = {
  matcher: ["/admin/:path*"],
};
