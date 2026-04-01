import { NextResponse } from "next/server";
import { parseScheduleBody } from "@/lib/api/schedule";
import { db } from "@/lib/db";

/**
 * POST /api/schedule
 * Stores a scheduling request as an Inquiry (SCHEDULE_REQUEST) for the admin inbox.
 */
export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Expected JSON body." }, { status: 400 });
  }

  const parsed = parseScheduleBody(json);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const p = parsed.payload;
  await db.inquiry.create({
    data: {
      kind: "SCHEDULE_REQUEST",
      fullName: p.fullName,
      phone: p.phone,
      email: p.email,
      serviceType: p.serviceNeeded,
      preferredDate: p.preferredDate,
      preferredTime: p.preferredTime,
      notes: p.notes || null,
    },
  });

  return NextResponse.json({
    success: true,
    message: "Thank you — your appointment request was received.",
  });
}
