import Link from "next/link";
import { AdminPageTitle } from "@/components/admin/page-title";
import {
  cancelAppointment,
  markAppointmentCompleted,
  markAppointmentConfirmed,
} from "@/app/admin/(dashboard)/appointments/actions";
import {
  APPOINTMENT_STATUSES,
  type AppointmentStatus,
} from "@/lib/constants/statuses";
import { db } from "@/lib/db";
import type { Prisma } from "@prisma/client";

type SearchParams = Promise<{
  status?: string;
  from?: string;
  to?: string;
  error?: string;
}>;

/**
 * All appointments with optional filters; quick actions for confirm / complete / cancel.
 */
export default async function AppointmentsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const sp = await searchParams;
  const statusQ =
    sp.status && APPOINTMENT_STATUSES.includes(sp.status as AppointmentStatus)
      ? (sp.status as AppointmentStatus)
      : undefined;

  const from = sp.from ? new Date(sp.from) : undefined;
  const to = sp.to ? new Date(sp.to) : undefined;
  if (from && !Number.isNaN(from.getTime())) from.setHours(0, 0, 0, 0);
  if (to && !Number.isNaN(to.getTime())) to.setHours(23, 59, 59, 999);

  const where: Prisma.AppointmentWhereInput = {};
  if (statusQ) where.status = statusQ;
  if (from && !Number.isNaN(from.getTime()) && to && !Number.isNaN(to.getTime())) {
    where.startAt = { gte: from, lte: to };
  } else if (from && !Number.isNaN(from.getTime())) {
    where.startAt = { gte: from };
  } else if (to && !Number.isNaN(to.getTime())) {
    where.startAt = { lte: to };
  }

  const rows = await db.appointment.findMany({
    where,
    orderBy: { startAt: "asc" },
    include: { client: { select: { fullName: true } } },
  });

  return (
    <div>
      <AdminPageTitle
        title="Appointments"
        subtitle="Blocks cannot overlap unless a row is cancelled."
        action={{ href: "/admin/appointments/new", label: "New appointment" }}
      />

      {sp.error ? (
        <div
          className="mb-6 rounded-xl border border-amber-400/40 bg-amber-950/40 px-4 py-3 text-sm text-amber-100"
          role="alert"
        >
          {decodeURIComponent(sp.error)}
        </div>
      ) : null}

      <form
        className="mb-8 flex flex-col gap-3 rounded-2xl border border-white/10 bg-zinc-900/40 p-4 sm:flex-row sm:flex-wrap sm:items-end"
        method="get"
      >
        <div>
          <label className="block text-xs text-zinc-500">Status</label>
          <select
            name="status"
            className="mt-1 rounded-lg border border-white/10 bg-zinc-900 px-3 py-2 text-sm text-white"
            defaultValue={statusQ ?? ""}
          >
            <option value="">All</option>
            {APPOINTMENT_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs text-zinc-500">From</label>
          <input
            type="date"
            name="from"
            defaultValue={sp.from ?? ""}
            className="mt-1 rounded-lg border border-white/10 bg-zinc-900 px-3 py-2 text-sm text-white"
          />
        </div>
        <div>
          <label className="block text-xs text-zinc-500">To</label>
          <input
            type="date"
            name="to"
            defaultValue={sp.to ?? ""}
            className="mt-1 rounded-lg border border-white/10 bg-zinc-900 px-3 py-2 text-sm text-white"
          />
        </div>
        <button
          type="submit"
          className="rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/15"
        >
          Apply
        </button>
        <Link
          href="/admin/appointments"
          className="rounded-lg px-4 py-2 text-sm text-zinc-400 hover:text-white"
        >
          Clear
        </Link>
      </form>

      <div className="overflow-x-auto rounded-2xl border border-white/10">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-white/10 bg-zinc-900/80 text-xs uppercase text-zinc-500">
            <tr>
              <th className="px-4 py-3 font-medium">When</th>
              <th className="px-4 py-3 font-medium">Client</th>
              <th className="px-4 py-3 font-medium">Service</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {rows.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-zinc-500">
                  No appointments match these filters.
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id} className="hover:bg-white/[0.02]">
                  <td className="px-4 py-3 text-zinc-300">
                    <div>{row.startAt.toLocaleString()}</div>
                    <div className="text-xs text-zinc-500">to {row.endAt.toLocaleTimeString()}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-zinc-200">{row.clientName}</div>
                    <div className="text-xs text-zinc-500">{row.email}</div>
                  </td>
                  <td className="px-4 py-3 text-zinc-400">{row.serviceType}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-white/10 px-2 py-1 text-xs text-zinc-300">
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      <Link
                        href={`/admin/appointments/${row.id}/edit`}
                        className="rounded-lg border border-white/15 px-2 py-1 text-xs text-rose-300 hover:bg-white/5"
                      >
                        Edit
                      </Link>
                      {row.status === "PENDING" ? (
                        <form action={markAppointmentConfirmed.bind(null, row.id)}>
                          <button
                            type="submit"
                            className="rounded-lg border border-emerald-500/30 px-2 py-1 text-xs text-emerald-300 hover:bg-emerald-500/10"
                          >
                            Confirm
                          </button>
                        </form>
                      ) : null}
                      {row.status !== "COMPLETED" && row.status !== "CANCELLED" ? (
                        <form action={markAppointmentCompleted.bind(null, row.id)}>
                          <button
                            type="submit"
                            className="rounded-lg border border-white/15 px-2 py-1 text-xs text-zinc-300 hover:bg-white/5"
                          >
                            Complete
                          </button>
                        </form>
                      ) : null}
                      {row.status !== "CANCELLED" ? (
                        <form action={cancelAppointment.bind(null, row.id)}>
                          <button
                            type="submit"
                            className="rounded-lg border border-red-500/30 px-2 py-1 text-xs text-red-300 hover:bg-red-500/10"
                          >
                            Cancel
                          </button>
                        </form>
                      ) : null}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
