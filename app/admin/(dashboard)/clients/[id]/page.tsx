import Link from "next/link";
import { notFound } from "next/navigation";
import { archiveClient, restoreClient } from "@/app/admin/(dashboard)/clients/actions";
import { EditClientForm } from "@/components/admin/clients/client-form";
import { db } from "@/lib/db";

export default async function ClientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const client = await db.client.findUnique({
    where: { id },
    include: {
      appointments: { orderBy: { startAt: "desc" }, take: 25 },
    },
  });
  if (!client) notFound();

  const archived = !!client.archivedAt;

  return (
    <div>
      <Link href="/admin/clients" className="text-sm text-zinc-500 hover:text-white">
        ← Clients
      </Link>
      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="font-serif text-2xl font-semibold text-white">{client.fullName}</h1>
          <p className="mt-1 text-sm text-zinc-500">
            Client since {client.createdAt.toLocaleDateString()}
            {archived ? " · Archived" : ""}
          </p>
        </div>
        {archived ? (
          <form action={restoreClient.bind(null, id)}>
            <button
              type="submit"
              className="rounded-xl border border-white/15 px-4 py-2 text-sm text-zinc-200 hover:bg-white/5"
            >
              Restore client
            </button>
          </form>
        ) : (
          <form action={archiveClient.bind(null, id)}>
            <button
              type="submit"
              className="rounded-xl border border-red-500/40 px-4 py-2 text-sm text-red-300 hover:bg-red-500/10"
            >
              Archive client
            </button>
          </form>
        )}
      </div>

      <section className="mt-10">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
          Edit profile
        </h2>
        <div className="mt-4 max-w-xl">
          <EditClientForm
            clientId={id}
            initial={{
              fullName: client.fullName,
              phone: client.phone,
              email: client.email,
              address: client.address,
              taxNotes: client.taxNotes,
              preferredContactMethod: client.preferredContactMethod,
            }}
          />
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
          Appointment history
        </h2>
        <ul className="mt-4 divide-y divide-white/10 rounded-2xl border border-white/10">
          {client.appointments.length === 0 ? (
            <li className="px-4 py-6 text-center text-sm text-zinc-500">No appointments yet.</li>
          ) : (
            client.appointments.map((a) => (
              <li key={a.id} className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:justify-between">
                <div>
                  <div className="text-zinc-200">{a.serviceType}</div>
                  <div className="text-xs text-zinc-500">{a.startAt.toLocaleString()}</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-zinc-400">{a.status}</span>
                  <Link href={`/admin/appointments/${a.id}/edit`} className="text-xs text-rose-300">
                    Edit
                  </Link>
                </div>
              </li>
            ))
          )}
        </ul>
      </section>
    </div>
  );
}
