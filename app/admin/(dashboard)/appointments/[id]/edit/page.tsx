import Link from "next/link";
import { notFound } from "next/navigation";
import { EditAppointmentForm } from "@/components/admin/appointments/appointment-form";
import { db } from "@/lib/db";

export default async function EditAppointmentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const appt = await db.appointment.findUnique({ where: { id } });
  if (!appt) notFound();

  const clients = await db.client.findMany({
    where: { archivedAt: null },
    orderBy: { fullName: "asc" },
    select: { id: true, fullName: true, phone: true, email: true },
  });

  return (
    <div>
      <Link href="/admin/appointments" className="text-sm text-zinc-500 hover:text-white">
        ← Appointments
      </Link>
      <h1 className="mt-4 font-serif text-2xl font-semibold text-white">Edit appointment</h1>
      <div className="mt-8 max-w-xl">
        <EditAppointmentForm
          appointmentId={appt.id}
          clients={clients}
          initial={{
            clientId: appt.clientId,
            clientName: appt.clientName,
            phone: appt.phone,
            email: appt.email,
            serviceType: appt.serviceType,
            startAt: appt.startAt,
            endAt: appt.endAt,
            notes: appt.notes,
            status: appt.status,
          }}
        />
      </div>
    </div>
  );
}
