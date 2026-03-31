import { SectionShell } from "@/components/section-shell";

const services = [
  {
    title: "Personal Tax Preparation",
    description:
      "W-2s, dependents, itemizing when it makes sense — tailored guidance so you file with confidence.",
    icon: LeafIcon,
  },
  {
    title: "Self-Employed and 1099 Filing",
    description:
      "Independent contractors and side businesses: income, expenses, estimated payments, and Schedule C support.",
    icon: ChartIcon,
  },
  {
    title: "Small Business Tax Help",
    description:
      "Structured support for sole proprietors and small entities so your books and filings stay aligned.",
    icon: BuildingIcon,
  },
  {
    title: "Prior Year Returns",
    description:
      "Catching up on undone years with patience and a clear path forward — no judgment, just solutions.",
    icon: CalendarIcon,
  },
  {
    title: "Tax Consultation",
    description:
      "When you need answers before you commit — planning questions, life changes, or a second look.",
    icon: ChatIcon,
  },
] as const;

/** Service grid with icon-forward cards and subtle hover lift via .card-premium */
export function Services() {
  return (
    <SectionShell id="services">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-plum-light">
          Services
        </p>
        <h2 className="mt-4 font-serif text-3xl font-semibold tracking-tight text-plum sm:text-4xl">
          Built around real situations
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-warm sm:text-base">
          Every return has a person behind it. These are the ways I show up for
          mine — thoughtfully, thoroughly, and with room for your questions.
        </p>
      </div>

      <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:gap-6 xl:grid-cols-3">
        {services.map((s) => (
          <li key={s.title}>
            <article className="card-premium flex h-full flex-col p-6 sm:p-7">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blush-soft/70 text-plum">
                <s.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-serif text-xl font-semibold text-plum">
                {s.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-warm sm:text-[15px]">
                {s.description}
              </p>
            </article>
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}

function LeafIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 21c-4-4-6-8-6-12a6 6 0 0112 0c0 4-2 8-6 12z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path d="M12 21V11" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

function ChartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 19h16" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <path
        d="M7 16V10M12 16V6M17 16v-4"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BuildingIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 20h16M6 20V8l6-4 6 4v12M9 20v-4h6v4M10 12h1M13 12h1M10 16h1M13 16h1"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M8 6V4m8 2V4M5 10h14M6 4h12a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChatIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 18l-3 3v-6a4 4 0 013.7-4h.3a7 7 0 111.4 5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
