import { NextResponse } from "next/server";
import { parseContactBody } from "@/lib/api/contact";
import { db } from "@/lib/db";

/**
 * POST /api/contact
 * Stores the message as an Inquiry (CONTACT) for the admin inbox.
 */
export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Expected JSON body." }, { status: 400 });
  }

  const parsed = parseContactBody(json);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const p = parsed.payload;
  await db.inquiry.create({
    data: {
      kind: "CONTACT",
      fullName: p.name,
      phone: p.phone || null,
      email: p.email,
      message: p.message,
    },
  });

  return NextResponse.json({
    success: true,
    message: "Thank you — your message was sent.",
  });
}
