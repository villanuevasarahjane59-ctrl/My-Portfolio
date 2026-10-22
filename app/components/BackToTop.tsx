"use client";

import { useEffect, useState, type MouseEvent } from "react";

import { Icon } from "./Icon";

// Floating pill (styled like "Message Me") that appears once the Home section is scrolled past.
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const home = document.getElementById("home");
    if (!home) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting), {
      rootMargin: "-64px 0px 0px 0px", // ignore the part hidden under the fixed header
    });
    observer.observe(home);
    return () => observer.disconnect();
  }, []);

  // Glide to the top even when the OS "reduce animations" setting turns off CSS smooth scrolling.
  function scrollToTop(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    history.replaceState(null, "", "#home");
  }

  return (
    <a
      href="#home"
      onClick={scrollToTop}
      aria-label="Back to top"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={`fixed right-4 bottom-24 z-40 inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-on-accent shadow-card transition-[opacity,translate,scale,background-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform hover:bg-accent-hover hover:shadow-[0_0_20px_rgb(252_198_60/0.55)] sm:px-5 lg:right-8 lg:bottom-8 ${
        visible ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none translate-y-6 scale-90 opacity-0"
      }`}
    >
      <Icon name="arrowUp" className="size-4" />
      Back to top
    </a>
  );
}
