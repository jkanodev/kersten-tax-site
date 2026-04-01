import Link from "next/link";
import { CreateAppointmentForm } from "@/components/admin/appointments/appointment-form";
import { db } from "@/lib/db";

export default async function NewAppointmentPage() {
  const clients = await db.client.findMany({
    where: { archivedAt: null },
    orderBy: { fullName: "asc" },
    select: { id: true, fullName: true, phone: true, email: true },
  });

  return (
    <div>
      <Link
        href="/admin/appointments"
        className="text-sm text-zinc-500 hover:text-white"
      >
        ← Appointments
      </Link>
      <h1 className="mt-4 font-serif text-2xl font-semibold text-white">New appointment</h1>
      <p className="mt-2 text-sm text-zinc-400">
        Saving checks for overlapping times with all non-cancelled visits.
      </p>
      <div className="mt-8 max-w-xl">
        <CreateAppointmentForm clients={clients} />
      </div>
    </div>
  );
}
