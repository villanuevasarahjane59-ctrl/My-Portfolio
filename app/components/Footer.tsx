import { navItems, profile } from "@/data/portfolio";
import { Icon } from "./Icon";
import { SocialLinks } from "./SocialLinks";

export function Footer() {
  // Bottom padding keeps the floating "Back to top" button clear of the footer text.
  return (
    <footer className="border-t border-line bg-bg/80 pb-40 lg:pb-20">
      <div className="shell grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr]">
        <div>
          <a href="#home" className="inline-block">
            <span className="font-display block text-lg leading-tight text-fg">{profile.name}</span>
            <span className="text-sm text-accent-ink">{profile.role}</span>
          </a>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            Designing clean, user-friendly digital layouts, one interface at a time.
          </p>
        </div>

        <nav aria-label="Footer">
          <h2 className="text-xs font-bold tracking-[0.18em] text-fg uppercase">Quick Links</h2>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5 text-sm">
            {navItems.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className="text-muted transition hover:text-accent-ink">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-xs font-bold tracking-[0.18em] text-fg uppercase">Get in Touch</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex max-w-full items-center gap-2.5 text-muted transition hover:text-accent-ink"
              >
                <Icon name="mail" className="size-4 shrink-0 text-accent-ink" />
                <span className="truncate">{profile.email}</span>
              </a>
            </li>
            <li className="inline-flex items-center gap-2.5 text-muted">
              <Icon name="pin" className="size-4 shrink-0 text-accent-ink" />
              {profile.location}
            </li>
          </ul>
          <SocialLinks size="sm" className="mt-5" />
        </div>
      </div>
    </footer>
  );
}
