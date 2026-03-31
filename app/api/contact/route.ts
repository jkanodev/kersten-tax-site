import { NextResponse } from "next/server";
import { parseContactBody } from "@/lib/api/contact";
import { logSubmission } from "@/lib/api/log-submission";

/**
 * POST /api/contact
 * Accepts general inquiries from the contact form.
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

  await logSubmission("contact", { ...parsed.payload });

  return NextResponse.json({
    success: true,
    message: "Thank you — your message was sent.",
  });
}
