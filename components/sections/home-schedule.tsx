import { SectionShell } from "@/components/section-shell";
import { ScheduleForm } from "@/components/forms/schedule-form";

/**
 * Full-width schedule section on the homepage — same form component as /schedule.
 */
export function HomeSchedule() {
  return (
    <SectionShell
      id="schedule"
      className="bg-gradient-to-b from-cream-deep/30 via-blush-soft/20 to-transparent"
    >
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-plum-light">
          Schedule
        </p>
        <h2 className="mt-4 font-serif text-3xl font-semibold tracking-tight text-plum sm:text-4xl">
          Begin with a conversation
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-warm sm:text-base">
          Choose a window that suits you. I&apos;ll confirm by phone or email — whichever
          you prefer — and we can talk through what to bring before we meet.
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-xl">
        <ScheduleForm />
      </div>
    </SectionShell>
  );
}
