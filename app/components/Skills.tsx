import { skillGroups } from "@/data/portfolio";
import { Icon } from "./Icon";
import { SectionHeading } from "./SectionHeading";

export function Skills() {
  return (
    <section id="skills" className="bg-bg-alt py-24 sm:py-28">
      <div className="shell">
        <SectionHeading
          eyebrow="Skills"
          title="What I work with"
          description="A blend of design sense and technical skills that helps me turn ideas into usable interfaces."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group) => (
            <article
              key={group.title}
              data-reveal
              className="group rounded-2xl border border-line bg-surface p-6 shadow-card transition hover:-translate-y-1 hover:border-accent/60"
            >
              <span className="grid size-12 place-items-center rounded-xl bg-accent-soft text-accent-ink transition group-hover:bg-accent group-hover:text-on-accent">
                <Icon name={group.icon} className="size-6" />
              </span>
              <h3 className="font-display mt-5 text-xl text-fg">{group.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{group.description}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-line bg-bg-alt px-3 py-1 text-xs font-medium text-fg"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
