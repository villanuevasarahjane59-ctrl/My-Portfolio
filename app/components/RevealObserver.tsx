"use client";

import { useEffect } from "react";

// Glides [data-reveal] elements in and out as they enter and leave the screen, in both scroll
// directions: from below when scrolling down, from above when scrolling back up (see globals.css).
export function RevealObserver() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          entry.target.classList.toggle("is-visible", entry.isIntersecting);
          entry.target.classList.toggle("is-above", !entry.isIntersecting && entry.boundingClientRect.top < 0);
        }
      },
      // Any part of the element inside the screen counts, so tall cards work too.
      { rootMargin: "-6% 0px -6% 0px", threshold: 0 },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
