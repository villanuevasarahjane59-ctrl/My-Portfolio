import Image from "next/image";

import { certificates } from "@/data/portfolio";
import { Icon } from "./Icon";
import { SectionHeading } from "./SectionHeading";

export function Certificates() {
  return (
    <section id="certificates" className="py-24 sm:py-28">
      <div className="shell">
        <SectionHeading
          eyebrow="Certificates"
          title="Courses & achievements"
          description="Trainings, seminars and courses I've completed to keep learning beyond the classroom."
        />

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {certificates.map((cert) => (
            <article
              key={cert.title}
              data-reveal
              className="group flex flex-col overflow-hidden rounded-3xl border border-line bg-surface shadow-card transition hover:-translate-y-1 hover:border-accent/60"
            >
              <a
                href={cert.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open the ${cert.title} certificate`}
                className="relative block aspect-[1.414/1] overflow-hidden border-b border-line bg-bg-alt"
              >
                <Image
                  src={cert.image}
                  alt={`Certificate: ${cert.title}`}
                  fill
                  sizes="(min-width: 768px) 560px, 100vw"
                  placeholder="blur"
                  className="object-contain p-3 transition duration-500 group-hover:scale-[1.02]"
                />
              </a>

              <div className="flex flex-1 flex-col p-6">
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
                  <span className="rounded-full bg-accent-soft px-3 py-1 text-fg">{cert.kind}</span>
                  <span className="inline-flex items-center gap-1 text-muted">
                    <Icon name="calendar" className="size-3.5" />
                    {cert.date}
                  </span>
                </div>
                <h3 className="font-display mt-4 text-xl leading-snug text-fg">{cert.title}</h3>
                <p className="mt-1 text-sm text-muted">{cert.issuer}</p>

                <div className="mt-auto flex flex-wrap gap-x-5 gap-y-2 pt-5 text-sm font-semibold">
                  <a
                    href={cert.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-accent-ink underline-offset-4 hover:underline"
                  >
                    View certificate
                    <Icon name="external" className="size-4" />
                  </a>
                  {cert.extraLink && (
                    <a
                      href={cert.extraLink.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-muted underline-offset-4 hover:text-fg hover:underline"
                    >
                      {cert.extraLink.label}
                      <Icon name="external" className="size-4" />
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
