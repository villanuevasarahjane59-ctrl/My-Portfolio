import Image from "next/image";

import { profile } from "@/data/portfolio";
import { Icon } from "./Icon";

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-hero pt-28 pb-36 sm:pt-32 lg:pb-44">
      <WaveLines />

      <div className="shell relative grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div data-reveal className="order-2 text-center lg:order-1 lg:text-left">
          <p className="text-lg font-medium text-accent-ink">Hi there, I am</p>
          <h1 className="font-display mt-3 text-4xl leading-[1.1] text-fg sm:text-5xl lg:text-6xl">
            {profile.name}
          </h1>
          <p className="mt-4 text-lg font-medium text-fg/90 sm:text-xl">{profile.tagline}</p>
          <p className="mx-auto mt-5 max-w-xl leading-relaxed text-muted lg:mx-0">{profile.intro}</p>

          <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-on-accent shadow-card transition hover:bg-accent-hover"
            >
              View Projects
              <Icon name="arrowRight" className="size-4" />
            </a>
            <a
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="My Resume (PDF, opens in a new tab)"
              className="inline-flex items-center gap-2 rounded-full border border-fg/25 px-6 py-3 text-sm font-semibold text-fg transition hover:border-accent hover:text-accent-ink"
            >
              <Icon name="download" className="size-4" />
              My Resume
            </a>
          </div>
        </div>

        <div data-reveal className="order-1 flex justify-center lg:order-2 lg:justify-end">
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute inset-0 translate-x-4 translate-y-4 rounded-full bg-accent sm:translate-x-6 sm:translate-y-6"
            />
            <div className="relative size-60 overflow-hidden rounded-full bg-white ring-8 ring-bg sm:size-80 lg:size-[22rem]">
              <Image
                src={profile.photo}
                alt={`Portrait of ${profile.name}`}
                fill
                preload
                sizes="(min-width: 1024px) 352px, (min-width: 640px) 320px, 240px"
                className="object-cover object-top"
                placeholder="blur"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Soft flowing lines like the light-mode reference; barely visible in dark mode.
function WaveLines() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 400"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-x-0 bottom-0 h-72 w-full text-fg opacity-[0.07] dark:opacity-[0.05]"
      fill="none"
      stroke="currentColor"
    >
      {Array.from({ length: 14 }, (_, i) => (
        <path
          key={i}
          d={`M0 ${220 + i * 10} C 360 ${120 + i * 14}, 720 ${360 - i * 6}, 1080 ${200 + i * 8} S 1440 ${150 + i * 12}, 1440 ${150 + i * 12}`}
        />
      ))}
    </svg>
  );
}
