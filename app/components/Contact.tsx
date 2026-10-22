import type { ReactNode } from "react";

import { profile } from "@/data/portfolio";
import { CopyEmailButton } from "./CopyEmailButton";
import { Icon, type IconName } from "./Icon";
import { Eyebrow } from "./SectionHeading";

export function Contact() {
  return (
    <section id="contact" className="bg-bg-alt py-24 sm:py-28">
      <div className="shell">
        <div
          data-reveal
          className="relative grid grid-cols-1 gap-10 overflow-hidden rounded-3xl bg-hero px-6 py-12 shadow-card ring-1 ring-line sm:px-12 sm:py-16 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-14"
        >
          <div
            aria-hidden="true"
            className="absolute -top-24 -right-24 size-64 rounded-full bg-accent opacity-15 blur-2xl"
          />

          <div className="relative">
            <Eyebrow>Contact</Eyebrow>
            <h2 className="font-display mt-3 text-3xl leading-tight text-fg sm:text-4xl">
              Let&apos;s create something great together.
            </h2>
            <p className="mt-5 max-w-md leading-relaxed text-muted">
              Have a project, an opportunity, or just want to say hi? Send me an email or a message on
              Instagram and I&apos;ll get back to you.
            </p>
          </div>

          <ul className="relative space-y-3">
            <ContactRow icon="mail" label="Email">
              <a
                href={`mailto:${profile.email}`}
                className="min-w-0 font-semibold break-all text-fg underline-offset-4 hover:text-accent-ink hover:underline"
              >
                {profile.email}
              </a>
              <CopyEmailButton email={profile.email} />
            </ContactRow>
            <ContactRow icon="instagram" label="Instagram">
              <a
                href={profile.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`@${profile.instagram.handle} on Instagram (opens in a new tab)`}
                className="inline-flex items-center gap-1.5 font-semibold text-fg underline-offset-4 hover:text-accent-ink hover:underline"
              >
                @{profile.instagram.handle}
                <Icon name="external" className="size-3.5 text-muted" />
              </a>
            </ContactRow>
            <ContactRow icon="pin" label="Address">
              <p className="font-semibold text-fg">{profile.location}</p>
            </ContactRow>
          </ul>
        </div>
      </div>
    </section>
  );
}

function ContactRow({ icon, label, children }: { icon: IconName; label: string; children: ReactNode }) {
  return (
    <li className="flex items-center gap-4 rounded-2xl border border-line bg-surface p-4 shadow-card">
      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent text-on-accent">
        <Icon name={icon} className="size-5" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold tracking-[0.15em] text-muted uppercase">{label}</p>
        <div className="mt-0.5 flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5">{children}</div>
      </div>
    </li>
  );
}
