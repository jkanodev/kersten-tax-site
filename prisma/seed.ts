import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

/**
 * Seeds the database with:
 * - One admin user (password from SEED_ADMIN_PASSWORD or a dev default — change in production!)
 * - Demo clients, appointments, and inquiries for a populated dashboard.
 *   Requires DATABASE_URL pointing at PostgreSQL (local Docker or hosted).
 */
async function main() {
  const adminPassword = process.env.SEED_ADMIN_PASSWORD ?? "ChangeMeSoon!123";

  /* Create admin once; do not overwrite password on re-seed (avoids surprise lockout). */
  const existing = await prisma.adminUser.findUnique({
    where: { email: "kerstencrawford@outlook.com" },
  });
  if (!existing) {
    await prisma.adminUser.create({
      data: {
        email: "kerstencrawford@outlook.com",
        name: "Kersten Crawford",
        passwordHash: bcrypt.hashSync(adminPassword, 12),
      },
    });
    console.log("Created admin user (first run only).");
  }

  const existingClients = await prisma.client.count();
  if (existingClients > 0) {
    console.log("Seed skipped demo records (clients already exist).");
    return;
  }

  const c1 = await prisma.client.create({
    data: {
      fullName: "Sample Client — Individual",
      phone: "405-555-0101",
      email: "sample.individual@example.com",
      address: "Oklahoma City, OK",
      taxNotes: "Itemized last year; new W-2 from employer change mid-year.",
      preferredContactMethod: "EMAIL",
    },
  });

  const c2 = await prisma.client.create({
    data: {
      fullName: "Sample Client — 1099",
      phone: "405-555-0102",
      email: "sample.1099@example.com",
      preferredContactMethod: "PHONE",
    },
  });

  const start1 = new Date();
  start1.setDate(start1.getDate() + 3);
  start1.setHours(10, 0, 0, 0);
  const end1 = new Date(start1);
  end1.setHours(11, 0, 0, 0);

  const start2 = new Date();
  start2.setDate(start2.getDate() + 5);
  start2.setHours(14, 0, 0, 0);
  const end2 = new Date(start2);
  end2.setHours(15, 30, 0, 0);

  await prisma.appointment.create({
    data: {
      clientId: c1.id,
      clientName: c1.fullName,
      phone: c1.phone ?? "",
      email: c1.email ?? "",
      serviceType: "Personal Tax Preparation",
      startAt: start1,
      endAt: end1,
      status: "CONFIRMED",
      notes: "Bring prior-year return.",
    },
  });

  await prisma.appointment.create({
    data: {
      clientId: c2.id,
      clientName: c2.fullName,
      phone: c2.phone ?? "",
      email: c2.email ?? "",
      serviceType: "Self-Employed and 1099 Filing",
      startAt: start2,
      endAt: end2,
      status: "PENDING",
    },
  });

  await prisma.inquiry.create({
    data: {
      kind: "CONTACT",
      fullName: "Website Visitor",
      email: "visitor@example.com",
      phone: "405-555-0199",
      message: "Do you offer consultations before tax season?",
    },
  });

  await prisma.inquiry.create({
    data: {
      kind: "SCHEDULE_REQUEST",
      fullName: "Another Visitor",
      email: "schedule@example.com",
      phone: "405-555-0188",
      serviceType: "Tax Consultation",
      preferredDate: new Date().toISOString().slice(0, 10),
      preferredTime: "Afternoon",
      notes: "Demo scheduling request from seed.",
    },
  });

  console.log("Seed complete. Admin: kerstencrawford@outlook.com");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
