/**
 * Thin wrapper so /admin/login and /admin/(dashboard) share no chrome here.
 * Auth + sidebar live in the (dashboard) group layout.
 */
export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
