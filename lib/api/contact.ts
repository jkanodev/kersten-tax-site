/**
 * Shared types and validation for the contact form API.
 */

export type ContactPayload = {
  name: string;
  phone: string;
  email: string;
  message: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function parseContactBody(data: unknown): {
  ok: true;
  payload: ContactPayload;
} | {
  ok: false;
  error: string;
} {
  if (!data || typeof data !== "object") {
    return { ok: false, error: "Invalid request body." };
  }

  const b = data as Record<string, unknown>;
  const payload: ContactPayload = {
    name: String(b.name ?? "").trim(),
    phone: String(b.phone ?? "").trim(),
    email: String(b.email ?? "").trim(),
    message: String(b.message ?? "").trim(),
  };

  if (!payload.name || !payload.email || !payload.message) {
    return {
      ok: false,
      error: "Name, email, and message are required.",
    };
  }

  if (!EMAIL_RE.test(payload.email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  return { ok: true, payload };
}
