import type { ReactNode } from "react";

import { profile } from "@/data/portfolio";
import { CopyEmailButton } from "./CopyEmailButton";
import { Icon, type IconName } from "./Icon";
import { Eyebrow } from "./SectionHeading";
import { SocialLinks } from "./SocialLinks";

// Right-hand panel follows assets/design-references/contact design .png: plain icon rows for email
// and address, then a centered row of logo-only GitHub and Instagram buttons.
export function Contact() {
  return (
    <section id="contact" className="bg-section-alt py-24 sm:py-28">
      <div className="shell">
        <div
          data-reveal
          className="relative grid grid-cols-1 gap-10 overflow-hidden rounded-3xl bg-hero px-6 py-12 shadow-card ring-1 ring-line sm:px-12 sm:py-16 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-14"
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

          <div className="relative rounded-2xl border border-line bg-surface/80 p-6 shadow-card backdrop-blur-sm sm:p-8">
            <ul className="space-y-5">
              <ContactLine icon="mail" label="Email">
                <a
                  href={`mailto:${profile.email}`}
                  className="min-w-0 font-medium [overflow-wrap:anywhere] text-fg underline-offset-4 hover:text-accent-ink hover:underline"
                >
                  {/* On narrow screens the address wraps before the "@", not in the middle of a word */}
                  {profile.email.split("@")[0]}
                  <wbr />@{profile.email.split("@")[1]}
                </a>
                <CopyEmailButton email={profile.email} />
              </ContactLine>
              <ContactLine icon="pin" label="Address">
                <p className="font-medium text-fg">{profile.location}</p>
              </ContactLine>
            </ul>

            <SocialLinks className="mt-6 justify-center border-t border-line pt-6" />
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactLine({ icon, label, children }: { icon: IconName; label: string; children: ReactNode }) {
  return (
    <li className="flex items-start gap-4">
      <Icon name={icon} className="mt-0.5 size-6 shrink-0 text-accent-ink" />
      <span className="sr-only">{label}:</span>
      <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-3 gap-y-2">{children}</div>
    </li>
  );
}
