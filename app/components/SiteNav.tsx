"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { navItems, profile } from "@/data/portfolio";
import { Icon } from "./Icon";
import { ThemeToggle } from "./ThemeToggle";

const sectionIds = navItems.map((item) => item.id);

// The mobile bar has room for five items; Skills sits under Projects and Education under About.
const mobileItems = navItems.filter((item) => item.id !== "education" && item.id !== "skills");
const mobileParent: Record<string, string> = { skills: "projects", education: "about" };

function useActiveSection() {
  const [active, setActive] = useState<string>(sectionIds[0]);

  useEffect(() => {
    // A thin band across the middle of the viewport; whichever section crosses it is active.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -54% 0px" },
    );
    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    // The last section may never reach the middle band on tall screens.
    function onScroll() {
      const atBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 4;
      if (atBottom) setActive(sectionIds[sectionIds.length - 1]);
    }
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return active;
}

export function SiteNav() {
  const active = useActiveSection();
  const mobileActive = mobileParent[active] ?? active;
  const activeIndex = Math.max(0, navItems.findIndex((item) => item.id === active));

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 border-b border-line/70 bg-bg/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-4 sm:px-6">
          <a
            href="#home"
            aria-label={`${profile.name}, back to top`}
          >
          </a>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <a
              href="#contact"
              className="hidden items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-on-accent transition hover:bg-accent-hover sm:inline-flex"
            >
              <Icon name="mail" className="size-4" />
              Message Me
            </a>
          </div>
        </div>
      </header>

      {/* Upright side menu (large screens), matching the phone bar (assets/design-references/bottom-nav.jpg).
          One glowing circle slides to the active icon; its label sits centered right under it. */}
      <nav aria-label="Main" className="fixed top-1/2 left-5 z-40 hidden -translate-y-1/2 lg:block">
        <ul className="relative flex flex-col items-center gap-0.5 rounded-[1.6rem] border border-line bg-surface/95 px-1 py-2 shadow-card backdrop-blur-md">
          <span
            aria-hidden="true"
            className="nav-glow absolute top-2.5 left-1/2 size-11 rounded-full bg-fg transition-transform duration-500 ease-[cubic-bezier(0.34,1.4,0.64,1)] motion-reduce:transition-none dark:bg-accent"
            style={{ transform: `translate(-50%, calc(${activeIndex} * (4rem + 0.125rem)))` }}
          />
          {navItems.map((item) => {
            const isActive = active === item.id;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className="group relative flex h-16 w-[5.5rem] flex-col items-center pt-1 text-muted"
                >
                  {/* Glow pulse that plays once each time an item becomes active */}
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="nav-pulse pointer-events-none absolute top-0.5 left-1/2 size-11 -translate-x-1/2 rounded-full motion-reduce:hidden"
                    />
                  )}
                  <span
                    className={`relative grid size-10 shrink-0 place-items-center rounded-full transition-[color,box-shadow,background-color] duration-300 ${
                      isActive
                        ? "text-bg dark:text-on-accent"
                        : "group-hover:bg-accent-soft group-hover:text-fg group-hover:shadow-[0_0_14px_rgb(252_198_60/0.35)]"
                    }`}
                  >
                    <Icon name={item.icon} className="size-5" />
                  </span>
                  {isActive ? (
                    <span className="absolute inset-x-0 bottom-0.5 text-center text-[10.5px] leading-none font-semibold whitespace-nowrap text-fg">
                      {item.label}
                    </span>
                  ) : (
                    // Hover/focus tooltip so icon-only items are still identifiable
                    <span className="pointer-events-none absolute top-1/2 left-full ml-3 -translate-y-1/2 rounded-md bg-fg px-2.5 py-1 text-xs font-medium whitespace-nowrap text-bg opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100">
                      {item.label}
                    </span>
                  )}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      <nav
        aria-label="Section"
        className="fixed inset-x-3 bottom-3 z-40 rounded-2xl border border-line bg-surface/95 px-2 pt-2 pb-1.5 shadow-card backdrop-blur-md lg:hidden"
      >
        <ul className="flex items-end justify-around">
          {mobileItems.map((item) => {
            const isActive = mobileActive === item.id;
            return (
              <li key={item.id} className="flex-1">
                <a
                  href={`#${item.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className="flex flex-col items-center gap-1 text-muted"
                >
                  <span
                    className={`grid place-items-center rounded-full transition-all duration-300 ${
                      isActive
                        ? "-mt-7 size-12 bg-fg text-bg shadow-card ring-4 ring-bg dark:bg-accent dark:text-on-accent"
                        : "size-9 hover:text-fg"
                    }`}
                  >
                    <Icon name={item.icon} className="size-5" />
                  </span>
                  <span
                    className={`text-[11px] leading-none font-medium ${
                      isActive ? "text-fg" : "sr-only"
                    }`}
                  >
                    {item.label}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
