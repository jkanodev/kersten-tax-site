"use server";

import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/admin/require-user";
import { db } from "@/lib/db";

export async function markInquiryRead(id: string) {
  await requireUser();
  await db.inquiry.update({ where: { id }, data: { status: "READ" } });
  revalidatePath("/admin/inquiries");
  revalidatePath("/admin");
}

export async function archiveInquiry(id: string) {
  await requireUser();
  await db.inquiry.update({ where: { id }, data: { status: "ARCHIVED" } });
  revalidatePath("/admin/inquiries");
  revalidatePath("/admin");
}
