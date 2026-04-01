import { AdminSidebar } from "@/components/admin/admin-sidebar";

/**
 * Dashboard chrome only. Access control is entirely in middleware.ts (single gate).
 */
export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 text-zinc-100 lg:flex-row">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        <div className="mx-auto max-w-6xl px-4 py-8 lg:px-10 lg:py-10">{children}</div>
      </main>
    </div>
  );
}
