import { AdminPageTitle } from "@/components/admin/page-title";
import { archiveInquiry, markInquiryRead } from "@/app/admin/(dashboard)/inquiries/actions";
import { db } from "@/lib/db";

/**
 * Website contact + scheduling requests captured from public forms.
 */
export default async function InquiriesPage() {
  const rows = await db.inquiry.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return (
    <div>
      <AdminPageTitle
        title="Inquiries"
        subtitle="Messages and appointment requests submitted from the public site."
      />

      <div className="space-y-6">
        {rows.map((row) => (
          <article
            key={row.id}
            className="rounded-2xl border border-white/10 bg-zinc-900/40 p-5"
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-zinc-500">
                  {row.kind === "CONTACT" ? "Contact" : "Schedule request"} ·{" "}
                  <time dateTime={row.createdAt.toISOString()}>
                    {row.createdAt.toLocaleString()}
                  </time>
                </p>
                <h2 className="mt-1 font-medium text-white">{row.fullName}</h2>
                <p className="text-sm text-zinc-400">
                  {row.email}
                  {row.phone ? ` · ${row.phone}` : ""}
                </p>
              </div>
              <span className="shrink-0 rounded-full bg-white/10 px-3 py-1 text-xs text-zinc-300">
                {row.status}
              </span>
            </div>

            {row.message ? (
              <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-zinc-300">
                {row.message}
              </p>
            ) : null}

            {row.kind === "SCHEDULE_REQUEST" ? (
              <ul className="mt-4 space-y-1 text-sm text-zinc-400">
                {row.serviceType ? <li>Service: {row.serviceType}</li> : null}
                {row.preferredDate ? <li>Preferred date: {row.preferredDate}</li> : null}
                {row.preferredTime ? <li>Preferred time: {row.preferredTime}</li> : null}
                {row.notes ? (
                  <li className="text-zinc-300">Notes: {row.notes}</li>
                ) : null}
              </ul>
            ) : null}

            <div className="mt-4 flex flex-wrap gap-2">
              {row.status === "NEW" ? (
                <form action={markInquiryRead.bind(null, row.id)}>
                  <button
                    type="submit"
                    className="rounded-lg border border-white/15 px-3 py-1.5 text-xs text-zinc-200 hover:bg-white/5"
                  >
                    Mark read
                  </button>
                </form>
              ) : null}
              {row.status !== "ARCHIVED" ? (
                <form action={archiveInquiry.bind(null, row.id)}>
                  <button
                    type="submit"
                    className="rounded-lg border border-zinc-600 px-3 py-1.5 text-xs text-zinc-400 hover:bg-white/5"
                  >
                    Archive
                  </button>
                </form>
              ) : (
                <form action={markInquiryRead.bind(null, row.id)}>
                  <button
                    type="submit"
                    className="rounded-lg border border-white/15 px-3 py-1.5 text-xs text-zinc-200 hover:bg-white/5"
                  >
                    Unarchive (mark read)
                  </button>
                </form>
              )}
            </div>
          </article>
        ))}
        {rows.length === 0 ? (
          <p className="text-center text-sm text-zinc-500">No inquiries yet.</p>
        ) : null}
      </div>
    </div>
  );
}
