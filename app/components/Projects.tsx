import { projects } from "@/data/portfolio";
import { Icon } from "./Icon";
import { ProjectGallery } from "./ProjectGallery";
import { SectionHeading } from "./SectionHeading";

export function Projects() {
  return (
    <section id="projects" className="py-24 sm:py-28">
      <div className="shell">
        <SectionHeading
          eyebrow="Projects"
          title="Featured work"
          description="A closer look at the interfaces I've designed, in desktop and mobile views. Click any screen to view it in full."
        />

        <div className="mt-12 space-y-10">
          {projects.map((project, i) => (
            <article
              key={project.title}
              className="rounded-3xl border border-line bg-surface p-5 shadow-card sm:p-8"
            >
              <div data-reveal className="grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:gap-10">
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
                    <span className="mr-1 text-sm font-bold text-muted">{String(i + 1).padStart(2, "0")}</span>
                    <span className="rounded-full bg-accent px-3 py-1 text-on-accent">{project.role}</span>
                    <span className="rounded-full bg-accent-soft px-3 py-1 text-fg">{project.type}</span>
                    {project.year && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-accent-soft px-3 py-1 text-fg">
                        <Icon name="calendar" className="size-3.5" />
                        {project.year}
                      </span>
                    )}
                  </div>
                  <h3 className="font-display mt-4 text-3xl text-fg">{project.title}</h3>
                  <p className="mt-1 font-medium text-accent-ink">{project.subtitle}</p>
                  <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">{project.description}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-line px-3 py-1 text-xs font-medium text-muted"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="self-start rounded-2xl bg-bg-alt p-5">
                  <h4 className="text-sm font-semibold tracking-[0.15em] text-fg uppercase">Core Features</h4>
                  <ul className="mt-4 space-y-3">
                    {project.features.map((feature) => (
                      <li key={feature} className="flex gap-3 text-sm leading-relaxed text-muted">
                        <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-accent text-on-accent">
                          <Icon name="check" className="size-3" />
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8">
                <ProjectGallery screens={project.screens} title={project.title} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
