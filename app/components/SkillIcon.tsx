import type { ReactNode } from "react";

// Small brand-style marks shown before a skill's name. Skills without an entry show no icon.
const officeTile = (letter: string, color: string) => (
  <>
    <rect width="24" height="24" rx="4" fill={color} />
    <text x="12" y="17" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff" fontFamily="inherit">
      {letter}
    </text>
  </>
);

const icons: Record<string, ReactNode> = {
  Java: (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 2.5c-1.3 1.5 1.3 2.3 0 4M13.6 2.5c-1.3 1.5 1.3 2.3 0 4" stroke="#E76F00" strokeWidth="1.7" />
      <path d="M4.5 9h12v4.2a5.3 5.3 0 0 1-5.3 5.3H9.8a5.3 5.3 0 0 1-5.3-5.3z" stroke="#5382A1" strokeWidth="1.9" />
      <path d="M16.5 10.5h1.4a2.4 2.4 0 0 1 0 4.8h-1.7" stroke="#5382A1" strokeWidth="1.7" />
      <path d="M3 21.5h15" stroke="#E76F00" strokeWidth="1.9" />
    </g>
  ),
  JavaScript: (
    <>
      <rect width="24" height="24" rx="3" fill="#F7DF1E" />
      <text x="21.5" y="21" textAnchor="end" fontSize="11.5" fontWeight="700" fill="#000" fontFamily="inherit">
        JS
      </text>
    </>
  ),
  HTML: (
    <>
      <path d="M3 1.5h18l-1.65 18.6L12 22.5l-7.35-2.4z" fill="#E34F26" />
      <path d="M12 3.2v17.5l5.9-1.9 1.4-15.6z" fill="#EF652A" />
      <path
        d="M7.6 5.8h8.8l-.27 2.6H10.3l.2 2.3h5.4l-.6 6.1L12 17.9l-3.3-1.1-.24-2.5h2.4l.12 1.2 1.02.35 1.03-.35.16-1.9H8.2z"
        fill="#fff"
      />
    </>
  ),
  "Next.js": (
    <>
      <circle cx="12" cy="12" r="11.5" fill="currentColor" />
      <path
        d="M8.6 16.6V7.4l7.6 10.4M15.4 7.4v5.4"
        fill="none"
        stroke="var(--bg-alt)"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
  "MS Word": officeTile("W", "#2B579A"),
  "MS PowerPoint": officeTile("P", "#C43E1C"),
  "MS Publisher": officeTile("P", "#077568"),
};

export function SkillIcon({ name, className = "size-4" }: { name: string; className?: string }) {
  const icon = icons[name];
  if (!icon) return null;
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={`shrink-0 ${className}`}>
      {icon}
    </svg>
  );
}
