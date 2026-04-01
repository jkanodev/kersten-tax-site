/**
 * One-time / emergency: create or reset the AdminUser used by NextAuth credentials.
 *
 * Uses the same library and cost factor as `prisma/seed.ts` and `auth.ts` (bcryptjs, 12 rounds).
 *
 * SAFETY: Exits unless ALLOW_ADMIN_BOOTSTRAP=1 is set, so it cannot run by accident.
 *
 * Production PostgreSQL (run from your machine; uses same DATABASE_URL as Vercel):
 *   ALLOW_ADMIN_BOOTSTRAP=1 DATABASE_URL="<paste Vercel prod DATABASE_URL>" npm run bootstrap:admin
 *
 * Optional: BOOTSTRAP_ADMIN_PASSWORD overrides the default password (default: ChangeMeSoon!123)
 */
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const ADMIN_EMAIL = "kerstencrawford@outlook.com";
const ADMIN_NAME = "Kersten Crawford";
const DEFAULT_PASSWORD = "ChangeMeSoon!123";

async function main() {
  if (process.env.ALLOW_ADMIN_BOOTSTRAP !== "1") {
    console.error(
      "Refusing to run: set ALLOW_ADMIN_BOOTSTRAP=1 to confirm you intend to create/reset the admin user.",
    );
    process.exit(1);
  }

  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is required (use the same connection string as production).");
    process.exit(1);
  }

  const password = process.env.BOOTSTRAP_ADMIN_PASSWORD ?? DEFAULT_PASSWORD;
  const passwordHash = bcrypt.hashSync(password, 12);

  const prisma = new PrismaClient();

  await prisma.adminUser.upsert({
    where: { email: ADMIN_EMAIL },
    create: {
      email: ADMIN_EMAIL,
      name: ADMIN_NAME,
      passwordHash,
    },
    update: {
      name: ADMIN_NAME,
      passwordHash,
    },
  });

  console.log(`Admin ready: ${ADMIN_EMAIL}`);
  console.log("Sign in with that email and the password you set (default: ChangeMeSoon!123).");
  console.log("Change the password under Admin → Settings after logging in.");

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
