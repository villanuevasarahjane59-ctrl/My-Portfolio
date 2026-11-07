"use client";

import { useRef } from "react";

import { Icon } from "./Icon";

type Theme = "light" | "dark";

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem("theme", theme);
  } catch {
    // Storage can be blocked (private mode); the theme still applies for this visit.
  }
}

// The icon swap is pure CSS (dark: variant), so the button renders the same on server and client.
export function ThemeToggle({ className = "" }: { className?: string }) {
  const latestRun = useRef(0);

  function toggle() {
    const root = document.documentElement;
    const next: Theme = root.dataset.theme === "dark" ? "light" : "dark";

    // Browsers without view transitions, and visitors who turn animations off, get a plain switch.
    if (
      typeof document.startViewTransition !== "function" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      applyTheme(next);
      return;
    }

    // The new theme spreads out from the center of the screen (see globals.css).
    const run = ++latestRun.current;
    root.classList.add("theme-transition");
    const transition = document.startViewTransition(() => applyTheme(next));
    transition.finished.finally(() => {
      if (run === latestRun.current) root.classList.remove("theme-transition"); // unless a newer click took over
    });
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
