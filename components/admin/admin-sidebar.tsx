import Link from "next/link";
import { SignOutButton } from "@/components/admin/sign-out-button";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/appointments", label: "Appointments" },
  { href: "/admin/clients", label: "Clients" },
  { href: "/admin/inquiries", label: "Inquiries" },
  { href: "/admin/settings", label: "Settings" },
] as const;

/** Dark sidebar (desktop) + compact horizontal nav on small screens. */
export function AdminSidebar() {
  return (
    <>
      <nav
        className="flex items-center gap-1 overflow-x-auto border-b border-white/10 bg-zinc-900/95 px-3 py-3 lg:hidden"
        aria-label="Admin sections"
      >
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="shrink-0 rounded-lg px-3 py-2 text-xs font-medium text-zinc-300 transition-colors hover:bg-white/10 hover:text-white"
          >
            {l.label}
          </Link>
        ))}
        <SignOutButton compact className="ml-auto shrink-0" />
      </nav>
      <aside className="hidden w-56 shrink-0 border-r border-white/10 bg-zinc-950 lg:flex lg:flex-col">
        <div className="border-b border-white/10 px-5 py-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Kersten Crawford
          </p>
          <p className="mt-1 text-sm font-medium text-zinc-200">Admin</p>
        </div>
        <nav className="flex flex-1 flex-col gap-0.5 p-3" aria-label="Admin main">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-lg px-3 py-2.5 text-sm text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-white/10 p-3">
          <SignOutButton />
        </div>
      </aside>
    </>
  );
}
