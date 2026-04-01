import { auth } from "@/auth";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { redirect } from "next/navigation";

/**
 * Protected shell: sidebar + main content. Middleware also guards /admin routes.
 */
export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 text-zinc-100 lg:flex-row">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        <div className="mx-auto max-w-6xl px-4 py-8 lg:px-10 lg:py-10">{children}</div>
      </main>
    </div>
  );
}
