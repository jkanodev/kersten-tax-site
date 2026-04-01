import { StatCard } from "@/components/admin/stat-card";
import { db } from "@/lib/db";

/**
 * Dashboard overview — high-level counts for the practice at a glance.
 */
export default async function AdminDashboardPage() {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const [
    totalClients,
    upcomingAppointments,
    completedAppointments,
    newInquiries,
    recentInquiries,
    recentAppointments,
  ] = await Promise.all([
    db.client.count({ where: { archivedAt: null } }),
    db.appointment.count({
      where: {
        startAt: { gte: startOfDay },
        status: { in: ["PENDING", "CONFIRMED"] },
      },
    }),
    db.appointment.count({ where: { status: "COMPLETED" } }),
    db.inquiry.count({ where: { status: "NEW" } }),
    db.inquiry.findMany({
      orderBy: { createdAt: "desc" },
      take: 6,
      select: {
        id: true,
        kind: true,
        fullName: true,
        createdAt: true,
        status: true,
      },
    }),
    db.appointment.findMany({
      orderBy: { updatedAt: "desc" },
      take: 6,
      select: {
        id: true,
        clientName: true,
        status: true,
        startAt: true,
        updatedAt: true,
      },
    }),
  ]);

  const activity = [
    ...recentInquiries.map((i) => ({
      id: i.id,
      type: "inquiry" as const,
      label: `${i.kind === "CONTACT" ? "Message" : "Schedule req"} · ${i.fullName}`,
      at: i.createdAt,
    })),
    ...recentAppointments.map((a) => ({
      id: a.id,
      type: "appointment" as const,
      label: `Appointment · ${a.clientName} (${a.status})`,
      at: a.updatedAt,
    })),
  ]
    .sort((a, b) => b.at.getTime() - a.at.getTime())
    .slice(0, 12);

  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-white sm:text-3xl">
        Dashboard
      </h1>
      <p className="mt-2 text-sm text-zinc-400">
        Overview of clients, scheduling, and website inquiries.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard label="Active clients" value={totalClients} hint="Not archived" />
        <StatCard
          label="Upcoming appointments"
          value={upcomingAppointments}
          hint="Pending or confirmed, from today"
        />
        <StatCard label="Completed visits" value={completedAppointments} />
        <StatCard label="New inquiries" value={newInquiries} hint="Needs attention" />
      </div>

      <section className="mt-12">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
          Recent activity
        </h2>
        <ul className="mt-4 divide-y divide-white/10 rounded-2xl border border-white/10 bg-zinc-900/50">
          {activity.length === 0 ? (
            <li className="px-4 py-8 text-center text-sm text-zinc-500">
              No activity yet — forms and appointments will appear here.
            </li>
          ) : (
            activity.map((row) => (
              <li
                key={`${row.type}-${row.id}`}
                className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <span className="text-sm text-zinc-200">{row.label}</span>
                <time className="text-xs text-zinc-500" dateTime={row.at.toISOString()}>
                  {row.at.toLocaleString()}
                </time>
              </li>
            ))
          )}
        </ul>
      </section>
    </div>
  );
}
