import { profile } from "@/data/portfolio";

// Logo-only buttons for GitHub and Instagram (assets/design-references/contact design .png).
// The addresses are never printed; each logo opens the account in a new tab.
export function SocialLinks({ size = "md", className = "" }: { size?: "sm" | "md"; className?: string }) {
  const links = [
    { name: "GitHub", url: profile.github.url, logo: <GitHubLogo /> },
    { name: "Instagram", url: profile.instagram.url, logo: <InstagramLogo id={`ig-${size}`} /> },
  ];

  return (
    <ul className={`flex items-center gap-4 ${className}`}>
      {links.map((link) => (
        <li key={link.name}>
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${link.name} (opens in a new tab)`}
            title={link.name}
            className={`grid place-items-center rounded-full border border-line bg-surface text-fg shadow-card transition duration-300 hover:-translate-y-0.5 hover:border-accent hover:shadow-[0_0_18px_rgb(252_198_60/0.45)] ${
              size === "md" ? "size-12 [&_svg]:size-6" : "size-10 [&_svg]:size-5"
            }`}
          >
            {link.logo}
          </a>
        </li>
      ))}
    </ul>
  );
}

function GitHubLogo() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

// Outline glyph in Instagram's gradient; `id` keeps the gradient unique when the logo appears twice.
function InstagramLogo({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke={`url(#${id})`} strokeWidth="2.2">
      <defs>
        <linearGradient id={id} x1="3" y1="21" x2="21" y2="3" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#feda75" />
          <stop offset="0.3" stopColor="#fa7e1e" />
          <stop offset="0.6" stopColor="#d62976" />
          <stop offset="1" stopColor="#4f5bd5" />
        </linearGradient>
      </defs>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4.4" />
      <circle cx="17.6" cy="6.4" r="0.6" fill={`url(#${id})`} />
    </svg>
  );
}
