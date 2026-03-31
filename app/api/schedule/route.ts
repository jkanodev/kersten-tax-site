import { NextResponse } from "next/server";
import { parseScheduleBody } from "@/lib/api/schedule";
import { logSubmission } from "@/lib/api/log-submission";

/**
 * POST /api/schedule
 * Accepts appointment requests from the schedule form.
 * Vercel serverless-friendly: no long-running connections required.
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

  await logSubmission("schedule", { ...parsed.payload });

  return NextResponse.json({
    success: true,
    message: "Thank you — your appointment request was received.",
  });
}
