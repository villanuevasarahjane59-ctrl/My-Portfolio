"use client";

import {
  Children,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
} from "react";

// Center-focused carousel (assets/design-references/carousel reference.webp): the current card sits
// in the middle at full size, its neighbours peek out smaller on both sides, and it keeps gliding to
// the next card on its own. No arrows: swipe/drag, tap a side card, use the dots or ← →.
// Pressing a dot or a card stops it on that card; scrolling away from the section restarts it.
// Every card gets the height of the tallest one, so sliding never moves the page below the carousel.
// With `aspects`, each card instead takes the exact shape of its image at one shared height, and the
// carousel keeps a fixed height, so the page stays still there too.

const sizes = {
  // Slide width and the distance to the neighbouring slide (as a share of the slide's own width)
  project: "[--slide-w:88%] [--step:94%] sm:[--slide-w:86%] sm:[--step:93%] lg:[--slide-w:86%] lg:[--step:92%]",
  wide: "[--slide-w:88%] [--step:94%] sm:[--slide-w:82%] sm:[--step:92%] lg:[--slide-w:78%] lg:[--step:90%]",
  narrow: "[--slide-w:86%] [--step:94%] sm:[--slide-w:62%] sm:[--step:92%] lg:[--slide-w:52%] lg:[--step:90%]",
  // Shared card height and the widest a card may get (used with `aspects`)
  fitted:
    "[--card-h:min(90vw,62dvh)] [--card-max:82vw] sm:[--card-h:min(56vw,62dvh,520px)] sm:[--card-max:76vw] lg:[--card-h:min(36vw,62dvh,520px)] lg:[--card-max:min(60vw,820px)]",
};

const SIDE_SCALE = 0.84;
const SIDE_OPACITY = 0.6;
const FITTED_GAP = "1rem";

// `aspects` mode: a card's width comes from its image's shape, up to the widest allowed.
function fittedWidth(aspect: number) {
  return `min(var(--card-max), calc(var(--card-h) * ${aspect}))`;
}

// Cards differ in width, so a neighbour's distance depends on the current card's width and its own.
function fittedX(aspects: number[], active: number, i: number, offset: number) {
  if (offset === 0) return "0px";
  const direction = offset < 0 ? -1 : 1;
  const beyond = Math.abs(offset) - 1; // hidden cards wait further out
  return `calc(${direction} * (${fittedWidth(aspects[active])} / 2 + ${FITTED_GAP} + ${fittedWidth(aspects[i])} * ${SIDE_SCALE / 2} + ${beyond} * var(--card-max) * ${SIDE_SCALE}))`;
}

// Position of slide i relative to the active one, wrapped so the carousel loops endlessly.
function offsetOf(i: number, active: number, n: number) {
  const d = (((i - active) % n) + n) % n;
  return d > Math.floor(n / 2) ? d - n : d;
}

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";
function subscribeReducedMotion(cb: () => void) {
  const mq = window.matchMedia(reducedMotionQuery);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

export function Carousel({
  children,
  label,
  itemLabel,
  size = "wide",
  aspects,
  interval = 1500,
}: {
  children: ReactNode;
  label: string;
  itemLabel: string;
  size?: keyof typeof sizes;
  /** Width / height of each card's image; makes every card fit its image exactly. */
  aspects?: number[];
  interval?: number;
}) {
  const slides = Children.toArray(children);
  const n = slides.length;

  const regionRef = useRef<HTMLDivElement>(null);
  const [{ active, prev, step }, setState] = useState({ active: 0, prev: 0, step: 0 });
  const [holdCycle, setHoldCycle] = useState(0);

  // Drag / swipe
  const drag = useRef<{ id: number; x: number; y: number; dx: number; dragging: boolean } | null>(null);
  const suppressClick = useRef(false);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);

  // Autoplay runs until the visitor picks a card (dot, tap/click, swipe, arrow key).
  const [stopped, setStopped] = useState(false);
  const [inView, setInView] = useState(false);
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(reducedMotionQuery).matches,
    () => false,
  );
  const autoplay = n > 1 && !reducedMotion;
  const paused = stopped || dragging || !inView;

  useEffect(() => {
    const el = regionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        // Leaving the section starts the slideshow again for the next visit.
        if (!entry.isIntersecting) setStopped(false);
      },
      // In view when it crosses the middle of the screen, so cards taller than the screen count too.
      { rootMargin: "-25% 0px -25% 0px", threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  function goTo(i: number) {
    setState((s) => {
      const next = ((i % n) + n) % n;
      return next === s.active ? s : { active: next, prev: s.active, step: s.step + 1 };
    });
  }

  // Moves to the next card every `interval` ms while playing (never while a full-screen viewer is open).
  useEffect(() => {
    if (!autoplay || paused) return;
    const timer = setTimeout(() => {
      if (regionRef.current?.querySelector("dialog[open]")) setHoldCycle((c) => c + 1);
      else goTo(active + 1);
    }, interval);
    return () => clearTimeout(timer);
    // goTo only depends on n, which is covered by `autoplay`
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoplay, paused, active, holdCycle, interval]);

  // Picking a card by hand stops the slideshow there.
  function pick(i: number) {
    setStopped(true);
    goTo(i);
  }

  function onPointerDown(e: PointerEvent<HTMLDivElement>) {
    if ((e.target as HTMLElement).closest("dialog")) return;
    if (e.button !== 0 || n < 2) return;
    drag.current = { id: e.pointerId, x: e.clientX, y: e.clientY, dx: 0, dragging: false };
  }

  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    if (!d.dragging) {
      if (Math.abs(dy) > 10 && Math.abs(dy) > Math.abs(dx)) {
        drag.current = null; // vertical scroll, not a swipe
        return;
      }
      if (Math.abs(dx) < 8) return;
      d.dragging = true;
      e.currentTarget.setPointerCapture(e.pointerId);
      window.getSelection()?.removeAllRanges();
      setDragging(true);
    }
    d.dx = dx;
    setDragX(dx);
  }

  function endDrag(e: PointerEvent<HTMLDivElement>, cancelled: boolean) {
    const d = drag.current;
    drag.current = null;
    if (!d?.dragging) return;
    suppressClick.current = !cancelled;
    setDragging(false);
    setDragX(0);
    if (cancelled) return;
    const threshold = Math.min(80, e.currentTarget.offsetWidth * 0.12);
    if (d.dx < -threshold) pick(active + 1);
    else if (d.dx > threshold) pick(active - 1);
    else setStopped(true);
  }

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if ((e.target as HTMLElement).closest("dialog")) return;
    if (e.key === "ArrowRight") pick(active + 1);
    else if (e.key === "ArrowLeft") pick(active - 1);
    else return;
    e.preventDefault();
  }

  if (n === 0) return null;

  return (
    <div
      ref={regionRef}
      data-reveal
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      onKeyDown={onKeyDown}
      className={sizes[size]}
    >
      <div
        className={`relative grid touch-pan-y ${dragging ? "cursor-grabbing select-none" : ""}`}
        style={aspects ? { minHeight: "var(--card-h)" } : undefined}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={(e) => endDrag(e, false)}
        onPointerCancel={(e) => endDrag(e, true)}
        onDragStart={(e) => e.preventDefault()}
        onClickCapture={(e) => {
          if (suppressClick.current) {
            e.preventDefault();
            e.stopPropagation();
            suppressClick.current = false;
            return;
          }
          // Any press on a card (opening a screen, a link, a side card) holds the slideshow there.
          setStopped(true);
        }}
      >
        {slides.map((slide, i) => {
          const offset = n > 1 ? offsetOf(i, active, n) : 0;
          const isActive = offset === 0;
          const visible = Math.abs(offset) <= 1;
          // A slide that wraps around (e.g. from the far left to the right) fades in at its new
          // place instead of sliding across the whole carousel.
          const jumped = step > 0 && Math.abs(offset - offsetOf(i, prev, n)) > 1;

          return (
            <div
              key={i}
              role="group"
              aria-roledescription="slide"
              aria-label={`${itemLabel} ${i + 1} of ${n}`}
              aria-hidden={!isActive || undefined}
              className={`relative col-start-1 row-start-1 justify-self-center ${
                aspects ? "self-center" : "flex self-stretch"
              } ${
                jumped || dragging
                  ? "transition-none"
                  : "transition-[transform,opacity] duration-[900ms] ease-[cubic-bezier(0.65,0,0.35,1)] motion-reduce:transition-none"
              } ${visible ? "" : "pointer-events-none"}`}
              style={{
                width: aspects ? fittedWidth(aspects[i]) : "var(--slide-w)",
                zIndex: 3 - Math.min(Math.abs(offset), 2),
                opacity: isActive ? 1 : visible ? SIDE_OPACITY : 0,
                transform: `translateX(calc(${aspects ? fittedX(aspects, active, i, offset) : `${offset} * var(--step)`} + ${dragX}px)) scale(${isActive ? 1 : SIDE_SCALE})`,
                animation: jumped ? `carousel-fade-${step % 2 ? "a" : "b"} 900ms ease` : undefined,
              }}
            >
              <div inert={!isActive} className="w-full">
                {slide}
              </div>
              {!isActive && visible && (
                <button
                  type="button"
                  tabIndex={-1}
                  aria-hidden="true"
                  onClick={() => pick(i)}
                  className="absolute inset-0 cursor-pointer rounded-3xl"
                />
              )}
            </div>
          );
        })}
      </div>

      {n > 1 && (
        <div className="mt-8 flex flex-wrap items-center justify-center gap-1">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => pick(i)}
              aria-label={`Show ${itemLabel.toLowerCase()} ${i + 1} of ${n}`}
              aria-current={i === active ? "true" : undefined}
              className="group grid h-6 place-items-center px-1"
            >
              <span
                className={`block h-2.5 rounded-full transition-all duration-300 ${
                  i === active ? "w-7 bg-accent" : "w-2.5 bg-line group-hover:bg-muted"
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
