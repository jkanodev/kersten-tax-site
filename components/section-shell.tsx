import type { ReactNode } from "react";

type SectionShellProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  /** Wider sections (e.g. hero) can pass false for a slimmer max width elsewhere */
  narrow?: boolean;
};

/**
 * Consistent horizontal padding and vertical rhythm for each homepage section.
 */
export function SectionShell({
  id,
  children,
  className = "",
  narrow = false,
}: SectionShellProps) {
  return (
    <section
      id={id}
      className={`scroll-mt-20 px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28 ${className}`}
    >
      <div
        className={`mx-auto ${narrow ? "max-w-3xl" : "max-w-6xl"}`}
      >
        {children}
      </div>
    </section>
  );
}
