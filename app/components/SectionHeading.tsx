import type { ReactNode } from "react";

// Section label ("About Me", "Projects", …): larger and bolder, with a yellow accent line.
export function Eyebrow({ children, center = false }: { children: ReactNode; center?: boolean }) {
  return (
    <p
      className={`flex items-center gap-3 text-base font-bold tracking-[0.18em] text-accent-ink uppercase sm:text-lg ${
        center ? "justify-center" : ""
      }`}
    >
      <span aria-hidden="true" className="h-[3px] w-8 rounded-full bg-accent" />
      {children}
      {center && <span aria-hidden="true" className="h-[3px] w-8 rounded-full bg-accent" />}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  center = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  center?: boolean;
}) {
  return (
    <div data-reveal className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <Eyebrow center={center}>{eyebrow}</Eyebrow>
      <h2 className="font-display mt-3 text-3xl leading-tight text-fg sm:text-4xl">{title}</h2>
      {description && <p className="mt-4 leading-relaxed text-muted">{description}</p>}
    </div>
  );
}
