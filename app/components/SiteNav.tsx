"use client";

import { useEffect, useState } from "react";

import { navItems } from "@/data/portfolio";
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
  const mobileIndex = Math.max(0, mobileItems.findIndex((item) => item.id === mobileActive));

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 border-b border-line/70 bg-bg/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-end gap-6 px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-on-accent transition hover:bg-accent-hover"
            >
              <Icon name="mail" className="size-4" />
              Message Me
            </a>
          </div>
        </div>
      </header>

      {/* Upright side menu (large screens). Every item is the same slot: icon with its label under it,
          equal spacing and padding. One glowing circle slides to the active icon, in line with the others.
          Centered in the space below the header; short screens scale it down so it never reaches the header. */}
      <nav
        aria-label="Main"
        className="fixed top-[calc(50%+2rem)] left-5 z-40 hidden -translate-y-1/2 [--nav-item:3.75rem] lg:block [@media(min-height:521px)_and_(max-height:620px)]:scale-[0.85] [@media(max-height:520px)]:scale-[0.7]"
      >
        <ul className="relative flex flex-col items-center rounded-[1.6rem] border border-line bg-surface/95 px-1.5 py-2 shadow-card backdrop-blur-md">
          <span
            aria-hidden="true"
            className="nav-glow absolute top-3 left-1/2 size-9 rounded-full bg-fg transition-transform duration-500 ease-[cubic-bezier(0.34,1.4,0.64,1)] motion-reduce:transition-none dark:bg-accent"
            style={{ transform: `translate(-50%, calc(${activeIndex} * var(--nav-item)))` }}
          />
          {navItems.map((item) => (
            <li key={item.id}>
              <NavLink item={item} isActive={active === item.id} className="h-(--nav-item) w-[4.75rem] pt-1" tooltip />
            </li>
          ))}
        </ul>
      </nav>

      <nav
        aria-label="Section"
        className="fixed inset-x-3 bottom-3 z-40 rounded-2xl border border-line bg-surface/95 px-1 py-2 shadow-card backdrop-blur-md sm:inset-x-auto sm:left-1/2 sm:w-[min(36rem,calc(100%-3rem))] sm:-translate-x-1/2 lg:hidden"
      >
        <ul className="relative flex">
          {/* Same motion as the side menu: one glowing circle slides to the active icon */}
          <li
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 transition-transform duration-500 ease-[cubic-bezier(0.34,1.4,0.64,1)] motion-reduce:transition-none"
            style={{ width: `${100 / mobileItems.length}%`, transform: `translateX(${mobileIndex * 100}%)` }}
          >
            <span className="nav-glow absolute top-0 left-1/2 size-9 -translate-x-1/2 rounded-full bg-fg dark:bg-accent" />
          </li>
          {mobileItems.map((item) => (
            <li key={item.id} className="min-w-0 flex-1">
              <NavLink item={item} isActive={mobileActive === item.id} className="w-full" />
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}

// One menu item, identical in both menus: a 36px icon circle with room for its label 6px below.
// Only the active item shows its label (it slides in as the circle arrives); every slot keeps the
// same size, so the spacing never changes. `tooltip` adds a hover label beside the side menu.
function NavLink({
  item,
  isActive,
  className,
  tooltip = false,
}: {
  item: (typeof navItems)[number];
  isActive: boolean;
  className: string;
  tooltip?: boolean;
}) {
  return (
    <a
      href={`#${item.id}`}
      aria-current={isActive ? "true" : undefined}
      className={`group relative flex flex-col items-center gap-1.5 ${className}`}
    >
      {/* Glow pulse that plays once each time an item becomes active */}
      {isActive && (
        <span
          aria-hidden="true"
          className="nav-pulse pointer-events-none absolute left-1/2 size-9 -translate-x-1/2 rounded-full motion-reduce:hidden"
        />
      )}
      <span
        className={`relative grid size-9 shrink-0 place-items-center rounded-full transition-[color,box-shadow,background-color] duration-300 ${
          isActive
            ? "text-bg dark:text-on-accent"
            : "text-muted group-hover:bg-accent-soft group-hover:text-fg group-hover:shadow-[0_0_14px_rgb(252_198_60/0.35)]"
        }`}
      >
        <Icon name={item.icon} className="size-5" />
      </span>
      <span
        className={`text-[length:clamp(9px,2.5vw,10.5px)] leading-none font-semibold whitespace-nowrap text-fg transition-[opacity,translate] duration-300 motion-reduce:transition-none lg:text-[10.5px] ${
          isActive ? "translate-y-0 opacity-100 delay-200" : "-translate-y-1 opacity-0"
        }`}
      >
        {item.label}
      </span>
      {tooltip && !isActive && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-[1.375rem] left-full ml-2 -translate-y-1/2 rounded-md bg-fg px-2.5 py-1 text-xs font-medium whitespace-nowrap text-bg opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100"
        >
          {item.label}
        </span>
      )}
    </a>
  );
}
