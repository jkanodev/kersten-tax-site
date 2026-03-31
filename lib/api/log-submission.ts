/**
 * Placeholder for persistence / notifications.
 * On Vercel, replace with: Resend, SendGrid, a database (Prisma + Postgres), or Slack webhook.
 * Keeping a single function avoids duplicating console + future email logic in every route.
 */

type SubmissionKind = "schedule" | "contact";

export async function logSubmission(
  kind: SubmissionKind,
  payload: Record<string, unknown>,
): Promise<void> {
  // Helpful in `vercel logs` during development and first deploys.
  console.info(`[${kind}] submission received`, {
    ...payload,
    receivedAt: new Date().toISOString(),
  });

  // Example hook (uncomment when wired):
  // await fetch(process.env.SLACK_WEBHOOK_URL!, { method: "POST", ... });
}
