import { AdminPageTitle } from "@/components/admin/page-title";
import { PasswordChangeForm } from "@/components/admin/settings/password-form";
import { site } from "@/lib/site";

/**
 * Practice settings: password rotation + read-only business profile (single source: lib/site.ts).
 */
export default async function SettingsPage() {
  return (
    <div>
      <AdminPageTitle
        title="Settings"
        subtitle="Security and reference info. Marketing copy is edited in code under lib/site.ts."
      />

      <section className="max-w-lg rounded-2xl border border-white/10 bg-zinc-900/40 p-6">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
          Public site profile
        </h2>
        <dl className="mt-4 space-y-3 text-sm">
          <div>
            <dt className="text-zinc-500">Name</dt>
            <dd className="text-zinc-200">{site.name}</dd>
          </div>
          <div>
            <dt className="text-zinc-500">Domain</dt>
            <dd className="text-zinc-200">{site.domain}</dd>
          </div>
          <div>
            <dt className="text-zinc-500">Phone</dt>
            <dd className="text-zinc-200">{site.phone}</dd>
          </div>
          <div>
            <dt className="text-zinc-500">Public email</dt>
            <dd className="text-zinc-200">{site.email}</dd>
          </div>
        </dl>
      </section>

      <section className="mt-10 max-w-lg">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
          Change password
        </h2>
        <p className="mt-2 text-sm text-zinc-400">
          Use a strong, unique password. This account protects all client data in the admin
          area.
        </p>
        <div className="mt-4">
          <PasswordChangeForm />
        </div>
      </section>
    </div>
  );
}
