import { about } from "@/data/portfolio";
import { SectionHeading } from "./SectionHeading";

export function About() {
  return (
    <section id="about" className="bg-bg-alt py-24 sm:py-28">
      <div className="shell grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeading eyebrow="About Me" title="Designing with passion, learning every day." />
          <div data-reveal className="mt-6 space-y-4 text-lg leading-relaxed text-muted">
            {about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>

        <dl data-reveal className="grid content-center gap-4 sm:grid-cols-2">
          {about.facts.map((fact) => (
            <div
              key={fact.label}
              className="rounded-2xl border border-line bg-surface p-6 shadow-card transition hover:-translate-y-1 hover:border-accent/60"
            >
              <dt className="text-xs font-semibold tracking-[0.15em] text-muted uppercase">{fact.label}</dt>
              <dd className="font-display mt-2 text-2xl text-fg">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
