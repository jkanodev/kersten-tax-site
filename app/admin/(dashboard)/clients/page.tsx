import Link from "next/link";
import { AdminPageTitle } from "@/components/admin/page-title";
import { db } from "@/lib/db";

type SearchParams = Promise<{ archived?: string }>;

export default async function ClientsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const sp = await searchParams;
  const showArchived = sp.archived === "1";

  const rows = await db.client.findMany({
    where: showArchived ? { NOT: { archivedAt: null } } : { archivedAt: null },
    orderBy: { fullName: "asc" },
    select: {
      id: true,
      fullName: true,
      email: true,
      phone: true,
      archivedAt: true,
      createdAt: true,
    },
  });

  return (
    <div>
      <AdminPageTitle
        title="Clients"
        subtitle={showArchived ? "Archived records" : "Active clients"}
        action={{ href: "/admin/clients/new", label: "New client" }}
      />

      <div className="mb-6 flex gap-3 text-sm">
        <Link
          href="/admin/clients"
          className={!showArchived ? "font-semibold text-rose-300" : "text-zinc-500"}
        >
          Active
        </Link>
        <Link
          href="/admin/clients?archived=1"
          className={showArchived ? "font-semibold text-rose-300" : "text-zinc-500"}
        >
          Archived
        </Link>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-white/10">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-white/10 bg-zinc-900/80 text-xs uppercase text-zinc-500">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Since</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {rows.map((row) => (
              <tr key={row.id} className="hover:bg-white/[0.02]">
                <td className="px-4 py-3 text-zinc-200">{row.fullName}</td>
                <td className="px-4 py-3 text-zinc-400">
                  <div>{row.email ?? "—"}</div>
                  <div className="text-xs">{row.phone ?? ""}</div>
                </td>
                <td className="px-4 py-3 text-zinc-500">
                  {row.createdAt.toLocaleDateString()}
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/clients/${row.id}`}
                    className="text-rose-300 hover:underline"
                  >
                    Open
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
