import Link from "next/link";

/**
 * Three quick highlights directly under the hero so mobile visitors see scope immediately.
 */
export function ServiceHighlights() {
  const items = [
    {
      title: "Personal returns",
      blurb: "W-2 households to more layered filings — explained clearly.",
    },
    {
      title: "1099 & self-employed",
      blurb: "Schedule C, expenses, and the rhythm of quarterly estimates.",
    },
    {
      title: "Small business",
      blurb: "Support that respects how hard you work for every dollar.",
    },
  ];

  return (
    <section
      className="border-t border-white/30 bg-white/20 px-4 py-12 sm:px-6 lg:px-8"
      aria-label="Service highlights"
    >
      <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-3 sm:gap-5">
        {items.map((item) => (
          <Link
            key={item.title}
            href="/#services"
            className="group card-premium block rounded-2xl p-5 sm:p-6"
          >
            <p className="font-serif text-lg font-semibold text-plum transition-colors group-hover:text-plum-light sm:text-xl">
              {item.title}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-warm">{item.blurb}</p>
            <span className="mt-4 inline-flex items-center text-xs font-semibold uppercase tracking-wider text-plum-light group-hover:underline">
              View all services →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
