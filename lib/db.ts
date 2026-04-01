import { PrismaClient } from "@prisma/client";

/**
 * Single Prisma client for the whole app (Next.js hot reload safe).
 * Import from here instead of instantiating PrismaClient everywhere.
 */
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
