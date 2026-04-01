import type { PrismaClient } from "@prisma/client";
import { APPOINTMENT_BLOCKING } from "@/lib/constants/statuses";

/**
 * Returns true if [startAt, endAt) overlaps any non-cancelled appointment.
 */
export async function findAppointmentOverlap(
  prisma: PrismaClient,
  params: {
    startAt: Date;
    endAt: Date;
    excludeId?: string;
  },
): Promise<{ conflict: boolean; conflictingLabel?: string }> {
  const { startAt, endAt, excludeId } = params;

  if (startAt >= endAt) {
    return { conflict: true, conflictingLabel: "End must be after start." };
  }

  const other = await prisma.appointment.findFirst({
    where: {
      id: excludeId ? { not: excludeId } : undefined,
      status: { in: [...APPOINTMENT_BLOCKING] },
      startAt: { lt: endAt },
      endAt: { gt: startAt },
    },
    select: { clientName: true, startAt: true, endAt: true },
  });

  if (!other) return { conflict: false };

  const label = `${other.clientName} (${other.startAt.toLocaleString()} – ${other.endAt.toLocaleTimeString()})`;
  return { conflict: true, conflictingLabel: label };
}
