"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/admin/require-user";
import { PREFERRED_CONTACT, type PreferredContact } from "@/lib/constants/statuses";
import { db } from "@/lib/db";

export type ClientFormState = { error?: string } | null;

export async function createClientAction(
  _prev: ClientFormState,
  formData: FormData,
): Promise<ClientFormState> {
  await requireUser();
  const fullName = (formData.get("fullName") as string)?.trim();
  const phone = (formData.get("phone") as string)?.trim() || null;
  const email = (formData.get("email") as string)?.trim() || null;
  const address = (formData.get("address") as string)?.trim() || null;
  const taxNotes = (formData.get("taxNotes") as string)?.trim() || null;
  const preferredContactMethod = (formData.get("preferredContactMethod") as string)?.trim();

  if (!fullName) return { error: "Name is required." };
  if (!PREFERRED_CONTACT.includes(preferredContactMethod as PreferredContact)) {
    return { error: "Invalid contact preference." };
  }

  await db.client.create({
    data: {
      fullName,
      phone,
      email,
      address,
      taxNotes,
      preferredContactMethod,
    },
  });
  revalidatePath("/admin/clients");
  revalidatePath("/admin");
  redirect("/admin/clients");
}

export async function updateClientAction(
  id: string,
  _prev: ClientFormState,
  formData: FormData,
): Promise<ClientFormState> {
  await requireUser();
  const fullName = (formData.get("fullName") as string)?.trim();
  const phone = (formData.get("phone") as string)?.trim() || null;
  const email = (formData.get("email") as string)?.trim() || null;
  const address = (formData.get("address") as string)?.trim() || null;
  const taxNotes = (formData.get("taxNotes") as string)?.trim() || null;
  const preferredContactMethod = (formData.get("preferredContactMethod") as string)?.trim();

  if (!fullName) return { error: "Name is required." };
  if (!PREFERRED_CONTACT.includes(preferredContactMethod as PreferredContact)) {
    return { error: "Invalid contact preference." };
  }

  await db.client.update({
    where: { id },
    data: {
      fullName,
      phone,
      email,
      address,
      taxNotes,
      preferredContactMethod,
    },
  });
  revalidatePath("/admin/clients");
  revalidatePath(`/admin/clients/${id}`);
  revalidatePath("/admin");
  redirect(`/admin/clients/${id}`);
}

export async function archiveClient(id: string) {
  await requireUser();
  await db.client.update({
    where: { id },
    data: { archivedAt: new Date() },
  });
  revalidatePath("/admin/clients");
  revalidatePath("/admin");
  redirect("/admin/clients");
}

export async function restoreClient(id: string) {
  await requireUser();
  await db.client.update({
    where: { id },
    data: { archivedAt: null },
  });
  revalidatePath("/admin/clients");
  revalidatePath(`/admin/clients/${id}`);
  revalidatePath("/admin");
  redirect(`/admin/clients/${id}`);
}
