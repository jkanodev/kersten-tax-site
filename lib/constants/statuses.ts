/** Valid appointment.status values — keep in sync with Prisma comments. */
export const APPOINTMENT_STATUSES = [
  "PENDING",
  "CONFIRMED",
  "COMPLETED",
  "CANCELLED",
] as const;
export type AppointmentStatus = (typeof APPOINTMENT_STATUSES)[number];

/** Statuses that still block the calendar if they overlap. */
export const APPOINTMENT_BLOCKING: AppointmentStatus[] = [
  "PENDING",
  "CONFIRMED",
  "COMPLETED",
];

export const INQUIRY_KINDS = ["CONTACT", "SCHEDULE_REQUEST"] as const;
export type InquiryKind = (typeof INQUIRY_KINDS)[number];

export const INQUIRY_STATUSES = ["NEW", "READ", "ARCHIVED"] as const;
export type InquiryStatus = (typeof INQUIRY_STATUSES)[number];

export const PREFERRED_CONTACT = ["PHONE", "EMAIL", "TEXT"] as const;
export type PreferredContact = (typeof PREFERRED_CONTACT)[number];
