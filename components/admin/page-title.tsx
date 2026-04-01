import Link from "next/link";

export function AdminPageTitle({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: { href: string; label: string };
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="font-serif text-2xl font-semibold text-white sm:text-3xl">{title}</h1>
        {subtitle ? <p className="mt-2 max-w-xl text-sm text-zinc-400">{subtitle}</p> : null}
      </div>
      {action ? (
        <Link
          href={action.href}
          className="inline-flex shrink-0 items-center justify-center rounded-xl bg-rose-400/90 px-5 py-2.5 text-sm font-semibold text-zinc-950 transition-colors hover:bg-rose-300"
        >
          {action.label}
        </Link>
      ) : null}
    </div>
  );
}
