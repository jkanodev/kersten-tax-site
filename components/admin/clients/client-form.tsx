"use client";

import { useActionState } from "react";
import {
  createClientAction,
  updateClientAction,
  type ClientFormState,
} from "@/app/admin/(dashboard)/clients/actions";
import { PREFERRED_CONTACT } from "@/lib/constants/statuses";

const fieldClass =
  "mt-1 w-full rounded-xl border border-white/10 bg-zinc-900 px-3 py-2.5 text-sm text-white focus:border-rose-400/50 focus:outline-none focus:ring-1 focus:ring-rose-400/30";
const labelClass = "block text-xs font-medium uppercase tracking-wider text-zinc-500";

export function CreateClientForm() {
  const [state, action, pending] = useActionState(createClientAction, null);
  return (
    <form action={action} className="space-y-5">
      {state?.error ? (
        <p className="rounded-xl border border-red-400/40 bg-red-950/50 px-4 py-3 text-sm text-red-200">
          {state.error}
        </p>
      ) : null}
      <Shared />
      <button
        type="submit"
        disabled={pending}
        className="rounded-xl bg-rose-400 px-4 py-3 text-sm font-semibold text-zinc-950 disabled:opacity-50"
      >
        {pending ? "Saving…" : "Add client"}
      </button>
    </form>
  );
}

export function EditClientForm({
  clientId,
  initial,
}: {
  clientId: string;
  initial: {
    fullName: string;
    phone: string | null;
    email: string | null;
    address: string | null;
    taxNotes: string | null;
    preferredContactMethod: string;
  };
}) {
  const [state, action, pending] = useActionState(
    updateClientAction.bind(null, clientId),
    null as ClientFormState,
  );
  return (
    <form action={action} className="space-y-5">
      {state?.error ? (
        <p className="rounded-xl border border-red-400/40 bg-red-950/50 px-4 py-3 text-sm text-red-200">
          {state.error}
        </p>
      ) : null}
      <Shared initial={initial} />
      <button
        type="submit"
        disabled={pending}
        className="rounded-xl bg-rose-400 px-4 py-3 text-sm font-semibold text-zinc-950 disabled:opacity-50"
      >
        {pending ? "Saving…" : "Save"}
      </button>
    </form>
  );
}

function Shared({
  initial,
}: {
  initial?: {
    fullName: string;
    phone: string | null;
    email: string | null;
    address: string | null;
    taxNotes: string | null;
    preferredContactMethod: string;
  };
}) {
  return (
    <>
      <div>
        <label className={labelClass} htmlFor="fullName">
          Full name
        </label>
        <input
          id="fullName"
          name="fullName"
          required
          className={fieldClass}
          defaultValue={initial?.fullName ?? ""}
        />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="phone">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            className={fieldClass}
            defaultValue={initial?.phone ?? ""}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className={fieldClass}
            defaultValue={initial?.email ?? ""}
          />
        </div>
      </div>
      <div>
        <label className={labelClass} htmlFor="address">
          Address (optional)
        </label>
        <input
          id="address"
          name="address"
          className={fieldClass}
          defaultValue={initial?.address ?? ""}
        />
      </div>
      <div>
        <label className={labelClass} htmlFor="taxNotes">
          Tax notes
        </label>
        <textarea
          id="taxNotes"
          name="taxNotes"
          rows={4}
          className={fieldClass}
          defaultValue={initial?.taxNotes ?? ""}
        />
      </div>
      <div>
        <label className={labelClass} htmlFor="preferredContactMethod">
          Preferred contact
        </label>
        <select
          id="preferredContactMethod"
          name="preferredContactMethod"
          className={fieldClass}
          defaultValue={initial?.preferredContactMethod ?? "PHONE"}
        >
          {PREFERRED_CONTACT.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
