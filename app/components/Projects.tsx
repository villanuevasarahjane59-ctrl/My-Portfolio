import { projects } from "@/data/portfolio";
import { Carousel } from "./Carousel";
import { ProjectGallery } from "./ProjectGallery";
import { SectionHeading } from "./SectionHeading";

export function Projects() {
  return (
    <section id="projects" className="overflow-x-clip py-24 sm:py-28">
      <div className="shell">
        <SectionHeading
          eyebrow="Projects"
          title="Featured work"
          description="A closer look at the interfaces I've designed, in desktop and mobile views. Click any screen to view it in full."
        />

        <div className="mt-12">
          <Carousel label="Featured projects" itemLabel="Project" size="project">
            {projects.map((project) => (
              <article
                key={project.title}
                className="rounded-3xl border border-line bg-surface p-5 shadow-card sm:p-7"
              >
                {/* Compact intro so the screens below get the spotlight */}
                <div data-reveal className="max-w-3xl">
                  <h3 className="font-display text-2xl text-fg sm:text-3xl">{project.title}</h3>
                  <p className="mt-0.5 text-sm font-medium text-accent-ink sm:text-base">{project.subtitle}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{project.description}</p>
                </div>

                <div className="mt-5">
                  <ProjectGallery screens={project.screens} title={project.title} />
                </div>
              </article>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
}
