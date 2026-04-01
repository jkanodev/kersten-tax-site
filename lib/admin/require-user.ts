import { auth } from "@/auth";

/** Use in server actions when a logged-in admin must be present. */
export async function requireUser() {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }
  return session.user;
}
