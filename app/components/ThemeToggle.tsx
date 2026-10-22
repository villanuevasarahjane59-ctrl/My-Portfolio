"use client";

import { Icon } from "./Icon";

// The icon swap is pure CSS (dark: variant), so the button renders the same on server and client.
export function ThemeToggle({ className = "" }: { className?: string }) {
  function toggle() {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Storage can be blocked (private mode); the theme still applies for this visit.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Switch between light and dark mode"
      title="Switch theme"
      className={`grid size-10 place-items-center rounded-full border border-line bg-surface text-fg transition hover:border-accent hover:text-accent-ink ${className}`}
    >
      <Icon name="moon" className="size-[18px] dark:hidden" />
      <Icon name="sun" className="hidden size-[18px] dark:block" />
    </button>
  );
}
