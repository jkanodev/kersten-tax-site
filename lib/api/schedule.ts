/**
 * Shared types and validation helpers for the schedule appointment API.
 * Keeps route handlers thin and easier to test later.
 */

export type SchedulePayload = {
  fullName: string;
  phone: string;
  email: string;
  preferredDate: string;
  preferredTime: string;
  serviceNeeded: string;
  notes: string;
};

const REQUIRED: (keyof SchedulePayload)[] = [
  "fullName",
  "phone",
  "email",
  "preferredDate",
  "preferredTime",
  "serviceNeeded",
];

/** Basic email pattern — good enough for a first line of defense before a real email send. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function parseScheduleBody(data: unknown): {
  ok: true;
  payload: SchedulePayload;
} | {
  ok: false;
  error: string;
} {
  if (!data || typeof data !== "object") {
    return { ok: false, error: "Invalid request body." };
  }

  const b = data as Record<string, unknown>;
  const payload: SchedulePayload = {
    fullName: String(b.fullName ?? "").trim(),
    phone: String(b.phone ?? "").trim(),
    email: String(b.email ?? "").trim(),
    preferredDate: String(b.preferredDate ?? "").trim(),
    preferredTime: String(b.preferredTime ?? "").trim(),
    serviceNeeded: String(b.serviceNeeded ?? "").trim(),
    notes: String(b.notes ?? "").trim(),
  };

  for (const key of REQUIRED) {
    if (!payload[key]) {
      return { ok: false, error: `Missing required field: ${key}` };
    }
  }

  if (!EMAIL_RE.test(payload.email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  return { ok: true, payload };
}
