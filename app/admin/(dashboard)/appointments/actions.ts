"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/admin/require-user";
import { findAppointmentOverlap } from "@/lib/appointments/overlap";
import { APPOINTMENT_STATUSES, type AppointmentStatus } from "@/lib/constants/statuses";
import { db } from "@/lib/db";

function parseDateTime(value: FormDataEntryValue | null): Date | null {
  if (!value || typeof value !== "string" || !value.trim()) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

export type AppointmentFormState = { error?: string } | null;

export async function createAppointmentAction(
  _prev: AppointmentFormState,
  formData: FormData,
): Promise<AppointmentFormState> {
  await requireUser();

  const clientId = (formData.get("clientId") as string)?.trim() || null;
  const clientName = (formData.get("clientName") as string)?.trim();
  const phone = (formData.get("phone") as string)?.trim() ?? "";
  const email = (formData.get("email") as string)?.trim() ?? "";
  const serviceType = (formData.get("serviceType") as string)?.trim();
  const notes = (formData.get("notes") as string)?.trim() || null;
  const status = (formData.get("status") as string)?.trim() as AppointmentStatus;
  const startAt = parseDateTime(formData.get("startAt"));
  const endAt = parseDateTime(formData.get("endAt"));

  if (!clientName || !serviceType || !startAt || !endAt) {
    return { error: "Name, service, start, and end are required." };
  }
  if (!APPOINTMENT_STATUSES.includes(status)) {
    return { error: "Invalid status." };
  }

  if (status !== "CANCELLED") {
    const overlap = await findAppointmentOverlap(db, { startAt, endAt });
    if (overlap.conflict) {
      return {
        error: `Time conflict: another appointment is already booked (${overlap.conflictingLabel ?? "overlap"}). Choose a different time.`,
      };
    }
  }

  await db.appointment.create({
    data: {
      clientId: clientId || null,
      clientName,
      phone,
      email,
      serviceType,
      startAt,
      endAt,
      notes,
      status,
    },
  });

  revalidatePath("/admin/appointments");
  revalidatePath("/admin");
  redirect("/admin/appointments");
}

export async function updateAppointmentAction(
  id: string,
  _prev: AppointmentFormState,
  formData: FormData,
): Promise<AppointmentFormState> {
  await requireUser();

  const clientId = (formData.get("clientId") as string)?.trim() || null;
  const clientName = (formData.get("clientName") as string)?.trim();
  const phone = (formData.get("phone") as string)?.trim() ?? "";
  const email = (formData.get("email") as string)?.trim() ?? "";
  const serviceType = (formData.get("serviceType") as string)?.trim();
  const notes = (formData.get("notes") as string)?.trim() || null;
  const status = (formData.get("status") as string)?.trim() as AppointmentStatus;
  const startAt = parseDateTime(formData.get("startAt"));
  const endAt = parseDateTime(formData.get("endAt"));

  if (!clientName || !serviceType || !startAt || !endAt) {
    return { error: "Name, service, start, and end are required." };
  }
  if (!APPOINTMENT_STATUSES.includes(status)) {
    return { error: "Invalid status." };
  }

  if (status !== "CANCELLED") {
    const overlap = await findAppointmentOverlap(db, {
      startAt,
      endAt,
      excludeId: id,
    });
    if (overlap.conflict) {
      return {
        error: `Time conflict: ${overlap.conflictingLabel ?? "overlaps another appointment"}.`,
      };
    }
  }

  await db.appointment.update({
    where: { id },
    data: {
      clientId: clientId || null,
      clientName,
      phone,
      email,
      serviceType,
      startAt,
      endAt,
      notes,
      status,
    },
  });

  revalidatePath("/admin/appointments");
  revalidatePath(`/admin/appointments/${id}/edit`);
  revalidatePath("/admin");
  redirect("/admin/appointments");
}

/** Sets status to CANCELLED (soft cancel — stays on calendar as cancelled, no overlap). */
export async function cancelAppointment(id: string) {
  await requireUser();
  await db.appointment.update({
    where: { id },
    data: { status: "CANCELLED" },
  });
  revalidatePath("/admin/appointments");
  revalidatePath("/admin");
  redirect("/admin/appointments");
}

export async function markAppointmentConfirmed(id: string) {
  await requireUser();
  const appt = await db.appointment.findUnique({ where: { id } });
  if (!appt) redirect("/admin/appointments?error=" + encodeURIComponent("Not found."));
  if (appt.status === "CANCELLED" || appt.status === "COMPLETED") {
    redirect(
      "/admin/appointments?error=" + encodeURIComponent("Cannot confirm this appointment."),
    );
  }
  const overlap = await findAppointmentOverlap(db, {
    startAt: appt.startAt,
    endAt: appt.endAt,
    excludeId: id,
  });
  if (overlap.conflict) {
    redirect(
      "/admin/appointments?error=" +
        encodeURIComponent(`Cannot confirm — ${overlap.conflictingLabel ?? "time conflict"}`),
    );
  }
  await db.appointment.update({
    where: { id },
    data: { status: "CONFIRMED" },
  });
  revalidatePath("/admin/appointments");
  revalidatePath("/admin");
  redirect("/admin/appointments");
}

export async function markAppointmentCompleted(id: string) {
  await requireUser();
  await db.appointment.update({
    where: { id },
    data: { status: "COMPLETED" },
  });
  revalidatePath("/admin/appointments");
  revalidatePath("/admin");
  redirect("/admin/appointments");
}
