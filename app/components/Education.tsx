import { education } from "@/data/portfolio";
import { Icon } from "./Icon";
import { SectionHeading } from "./SectionHeading";

export function Education() {
  return (
    <section id="education" className="py-24 sm:py-28">
      <div className="shell">
        <SectionHeading
          eyebrow="Education"
          title="My academic journey"
          description="From Kawayan to Biliran Province State University, where I'm now in my final year of Computer Science."
        />

        <ol className="relative mt-14 space-y-8 border-l-2 border-line pl-8 sm:ml-4 sm:pl-12">
          {education.map((entry) => (
            <li key={entry.level} data-reveal className="relative">
              <span
                aria-hidden="true"
                className={`absolute top-6 -left-[calc(2rem+9px)] grid size-4 place-items-center rounded-full ring-4 ring-bg sm:-left-[calc(3rem+9px)] ${
                  entry.current ? "bg-accent" : "bg-line"
                }`}
              />
              <article className="rounded-2xl border border-line bg-surface p-6 shadow-card sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-xs font-semibold tracking-[0.15em] text-accent-ink uppercase">{entry.level}</p>
                  <p
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                      entry.current ? "bg-accent text-on-accent" : "bg-accent-soft text-fg"
                    }`}
                  >
                    <Icon name="calendar" className="size-3.5" />
                    {entry.period}
                  </p>
                </div>
                <h3 className="font-display mt-3 text-2xl text-fg">{entry.school}</h3>
                {entry.program && <p className="mt-1 font-medium text-fg/90">{entry.program}</p>}
                {entry.department && <p className="mt-1 text-sm text-muted">{entry.department}</p>}
                <p className="mt-3 inline-flex items-center gap-1.5 text-sm text-muted">
                  <Icon name="pin" className="size-4" />
                  {entry.address}
                </p>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
