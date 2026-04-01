"use server";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { db } from "@/lib/db";

export type SettingsFormState = { error?: string; success?: string } | null;

/**
 * Lets the logged-in admin rotate their password without a separate user-management UI.
 */
export async function changePasswordAction(
  _prev: SettingsFormState,
  formData: FormData,
): Promise<SettingsFormState> {
  const session = await auth();
  if (!session?.user?.id) return { error: "Not signed in." };

  const current = formData.get("currentPassword") as string;
  const next = formData.get("newPassword") as string;
  const confirm = formData.get("confirmPassword") as string;

  if (!current || !next || !confirm) {
    return { error: "All password fields are required." };
  }
  if (next.length < 10) {
    return { error: "New password should be at least 10 characters." };
  }
  if (next !== confirm) {
    return { error: "New password and confirmation must match." };
  }

  const admin = await db.adminUser.findUnique({ where: { id: session.user.id } });
  if (!admin) return { error: "Account not found." };

  const ok = await bcrypt.compare(current, admin.passwordHash);
  if (!ok) return { error: "Current password is incorrect." };

  await db.adminUser.update({
    where: { id: admin.id },
    data: { passwordHash: await bcrypt.hash(next, 12) },
  });

  revalidatePath("/admin/settings");
  return { success: "Password updated. Use it next time you sign in." };
}
