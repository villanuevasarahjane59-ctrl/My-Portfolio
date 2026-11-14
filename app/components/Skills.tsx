import { skillGroups } from "@/data/portfolio";
import { SkillIcon } from "./SkillIcon";
import { SectionHeading } from "./SectionHeading";

// Logo tiles (assets/design-references/skills design.png): one small card per skill, its group under the name.
const skills = skillGroups.flatMap((group) => group.items.map((name) => ({ name, group: group.title })));

export function Skills() {
  return (
    <section id="skills" className="py-24 sm:py-28">
      <div className="shell">
        <SectionHeading
          eyebrow="Skills"
          title="What I work with"
          description="A blend of design sense and technical skills that helps me turn ideas into usable interfaces."
        />

        <ul data-reveal className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {skills.map((skill) => (
            <li
              key={skill.name}
              className="group flex min-w-0 items-center gap-2.5 rounded-2xl border border-line bg-surface px-3 py-3 shadow-card transition duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-[0_14px_30px_-14px_rgb(252_198_60/0.55)] sm:gap-3 sm:px-5 sm:py-3.5"
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-bg-alt transition group-hover:bg-accent-soft sm:size-10">
                <SkillIcon name={skill.name} className="size-5 sm:size-6" />
              </span>
              <span className="min-w-0 leading-snug">
                <span className="block text-[13px] font-semibold text-fg sm:text-sm">{skill.name}</span>
                <span className="block text-xs text-muted">{skill.group}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
