"use client";

import { useActionState, useState } from "react";
import {
  createAppointmentAction,
  updateAppointmentAction,
  type AppointmentFormState,
} from "@/app/admin/(dashboard)/appointments/actions";
import { APPOINTMENT_STATUSES } from "@/lib/constants/statuses";
import { toDatetimeLocalValue } from "@/lib/datetime-local";
import { serviceOptions } from "@/lib/site";

export type ClientOpt = {
  id: string;
  fullName: string;
  phone: string | null;
  email: string | null;
};

const fieldClass =
  "mt-1 w-full rounded-xl border border-white/10 bg-zinc-900 px-3 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:border-rose-400/50 focus:outline-none focus:ring-1 focus:ring-rose-400/30";
const labelClass = "block text-xs font-medium uppercase tracking-wider text-zinc-500";

function SharedFields({
  clients,
  defaultClientId,
  defaults,
}: {
  clients: ClientOpt[];
  defaultClientId: string;
  defaults?: {
    clientName: string;
    phone: string;
    email: string;
    serviceType: string;
    startAt: Date;
    endAt: Date;
    notes: string | null;
    status: string;
  };
}) {
  const [clientId, setClientId] = useState(defaultClientId);

  const onClientPick = (id: string) => {
    setClientId(id);
    const c = clients.find((x) => x.id === id);
    const nameEl = document.getElementById("clientName") as HTMLInputElement | null;
    const phoneEl = document.getElementById("phone") as HTMLInputElement | null;
    const emailEl = document.getElementById("email") as HTMLInputElement | null;
    if (!c) {
      if (nameEl) nameEl.value = defaults?.clientName ?? "";
      if (phoneEl) phoneEl.value = defaults?.phone ?? "";
      if (emailEl) emailEl.value = defaults?.email ?? "";
      return;
    }
    if (nameEl) nameEl.value = c.fullName;
    if (phoneEl) phoneEl.value = c.phone ?? "";
    if (emailEl) emailEl.value = c.email ?? "";
  };

  return (
    <>
      <div>
        <label className={labelClass} htmlFor="clientId">
          Link client (optional)
        </label>
        <select
          id="clientId"
          name="clientId"
          className={fieldClass}
          value={clientId}
          onChange={(e) => onClientPick(e.target.value)}
        >
          <option value="">— None —</option>
          {clients.map((c) => (
            <option key={c.id} value={c.id}>
              {c.fullName}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="clientName">
            Client name
          </label>
          <input
            id="clientName"
            name="clientName"
            required
            className={fieldClass}
            defaultValue={defaults?.clientName ?? ""}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="phone">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            className={fieldClass}
            defaultValue={defaults?.phone ?? ""}
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
            defaultValue={defaults?.email ?? ""}
          />
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="serviceType">
          Service type
        </label>
        <select
          id="serviceType"
          name="serviceType"
          required
          className={fieldClass}
          defaultValue={defaults?.serviceType ?? ""}
        >
          <option value="">Select…</option>
          {serviceOptions.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="startAt">
            Start
          </label>
          <input
            id="startAt"
            name="startAt"
            type="datetime-local"
            required
            className={fieldClass}
            defaultValue={defaults ? toDatetimeLocalValue(defaults.startAt) : ""}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="endAt">
            End
          </label>
          <input
            id="endAt"
            name="endAt"
            type="datetime-local"
            required
            className={fieldClass}
            defaultValue={defaults ? toDatetimeLocalValue(defaults.endAt) : ""}
          />
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="status">
          Status
        </label>
        <select
          id="status"
          name="status"
          className={fieldClass}
          defaultValue={defaults?.status ?? "PENDING"}
        >
          {APPOINTMENT_STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass} htmlFor="notes">
          Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={4}
          className={fieldClass}
          defaultValue={defaults?.notes ?? ""}
        />
      </div>
    </>
  );
}

export function CreateAppointmentForm({ clients }: { clients: ClientOpt[] }) {
  const [state, formAction, pending] = useActionState(createAppointmentAction, null);

  return (
    <form action={formAction} className="space-y-5">
      {state?.error ? (
        <div
          className="rounded-xl border border-red-400/40 bg-red-950/50 px-4 py-3 text-sm text-red-200"
          role="alert"
        >
          {state.error}
        </div>
      ) : null}
      <SharedFields clients={clients} defaultClientId="" />
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-xl bg-rose-400 px-4 py-3 text-sm font-semibold text-zinc-950 hover:bg-rose-300 disabled:opacity-50 sm:w-auto"
      >
        {pending ? "Saving…" : "Add appointment"}
      </button>
    </form>
  );
}

export function EditAppointmentForm({
  appointmentId,
  clients,
  initial,
}: {
  appointmentId: string;
  clients: ClientOpt[];
  initial: {
    clientId: string | null;
    clientName: string;
    phone: string;
    email: string;
    serviceType: string;
    startAt: Date;
    endAt: Date;
    notes: string | null;
    status: string;
  };
}) {
  const [state, formAction, pending] = useActionState(
    updateAppointmentAction.bind(null, appointmentId),
    null as AppointmentFormState,
  );

  return (
    <form action={formAction} className="space-y-5">
      {state?.error ? (
        <div
          className="rounded-xl border border-red-400/40 bg-red-950/50 px-4 py-3 text-sm text-red-200"
          role="alert"
        >
          {state.error}
        </div>
      ) : null}
      <SharedFields
        clients={clients}
        defaultClientId={initial.clientId ?? ""}
        defaults={{
          clientName: initial.clientName,
          phone: initial.phone,
          email: initial.email,
          serviceType: initial.serviceType,
          startAt: initial.startAt,
          endAt: initial.endAt,
          notes: initial.notes,
          status: initial.status,
        }}
      />
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-xl bg-rose-400 px-4 py-3 text-sm font-semibold text-zinc-950 hover:bg-rose-300 disabled:opacity-50 sm:w-auto"
      >
        {pending ? "Saving…" : "Save changes"}
      </button>
    </form>
  );
}
