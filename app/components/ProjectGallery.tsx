"use client";

import Image from "next/image";
import { useRef, useState, type CSSProperties, type KeyboardEvent } from "react";

import type { ProjectImage, ProjectScreen } from "@/data/portfolio";
import { Icon } from "./Icon";

// One device mockup per screen (e.g. poster → login → homepage). Tablets and desktops show every screen
// side by side in one equal row; phones show one large screen at a time with numbered buttons to switch.
// The full-screen viewer shows the same mockup, only larger, so what you see is what you see when zoomed.
export function ProjectGallery({ screens, title }: { screens: ProjectScreen[]; title: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);
  const [shown, setShown] = useState(0); // the screen on display on phones
  const current = screens[index];

  function open(i: number) {
    setIndex(i);
    dialogRef.current?.showModal();
  }

  function step(delta: number) {
    setIndex((i) => (i + delta + screens.length) % screens.length);
  }

  function onKeyDown(e: KeyboardEvent<HTMLDialogElement>) {
    if (e.key === "ArrowRight") step(1);
    if (e.key === "ArrowLeft") step(-1);
  }

  return (
    <>
      <ol
        className="grid gap-4 sm:grid-cols-(--cols) lg:gap-5"
        style={{ "--cols": `repeat(${screens.length}, minmax(0, 1fr))` } as CSSProperties}
      >
        {screens.map((screen, i) => (
          <li
            key={screen.caption}
            className={`group/tile min-w-0 rounded-2xl border border-line bg-bg-alt p-3 transition-[border-color,box-shadow] duration-300 hover:border-accent hover:shadow-[0_14px_34px_-14px_rgb(252_198_60/0.6)] sm:p-3.5 ${
              i === shown ? "" : "max-sm:hidden"
            }`}
          >
            <h4 className="flex min-w-0 items-center gap-2.5 text-sm font-semibold text-fg">
              <span className="grid size-6 shrink-0 place-items-center rounded-full bg-accent text-[11px] text-on-accent">
                {i + 1}
              </span>
              <span className="truncate">{screen.caption}</span>
            </h4>
            <button
              type="button"
              onClick={() => open(i)}
              aria-label={`View ${screen.caption} in full screen`}
              className="group relative mt-3.5 block w-full rounded-lg text-left transition-transform duration-300 group-hover/tile:-translate-y-1"
            >
              <DeviceMockup screen={screen} size="tile" />
              <span className="absolute top-2 right-2 grid size-7 place-items-center rounded-full bg-black/60 text-white opacity-0 backdrop-blur-sm transition group-hover:opacity-100 group-focus-visible:opacity-100">
                <Icon name="expand" className="size-3.5" />
              </span>
            </button>
          </li>
        ))}
      </ol>

      {/* Phones: numbered buttons to switch between the screens */}
      {screens.length > 1 && (
        <div className="mt-4 flex justify-center gap-2 sm:hidden">
          {screens.map((screen, i) => (
            <button
              key={screen.caption}
              type="button"
              onClick={() => setShown(i)}
              aria-label={`Show ${screen.caption}`}
              aria-current={i === shown ? "true" : undefined}
              className={`grid size-9 place-items-center rounded-full text-sm font-semibold transition-colors ${
                i === shown
                  ? "bg-accent text-on-accent shadow-[0_0_14px_rgb(252_198_60/0.45)]"
                  : "border border-line bg-bg-alt text-muted hover:border-accent hover:text-fg"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      <dialog
        ref={dialogRef}
        onKeyDown={onKeyDown}
        onClick={(e) => {
          // Clicking the backdrop (anything that isn't the mockup or a control) closes the viewer.
          if (!(e.target as HTMLElement).closest("[data-mockup], button")) dialogRef.current?.close();
        }}
        aria-label={`${title}: ${current.caption}`}
        className="m-0 h-dvh max-h-none w-full max-w-none bg-transparent p-0 text-white"
      >
        <figure className="flex h-full w-full flex-col items-center justify-center gap-5 px-14 py-10 sm:px-20">
          <div className="w-[min(100%,1100px,calc(78dvh*10/7))]">
            <DeviceMockup screen={current} size="large" />
          </div>
          <figcaption className="text-center text-sm text-white/80">
            {title} · {current.caption} · {index + 1} / {screens.length}
          </figcaption>
        </figure>

        <button
          type="button"
          onClick={() => dialogRef.current?.close()}
          aria-label="Close full screen view"
          className="absolute top-4 right-4 grid size-11 place-items-center rounded-full bg-white/10 transition hover:bg-white/20"
        >
          <Icon name="close" />
        </button>
        {screens.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous screen"
              className="absolute top-1/2 left-2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 transition hover:bg-white/20 sm:left-5"
            >
              <Icon name="chevronLeft" />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next screen"
              className="absolute top-1/2 right-2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 transition hover:bg-white/20 sm:right-5"
            >
              <Icon name="chevronRight" />
            </button>
          </>
        )}
      </dialog>
    </>
  );
}

const imageSizes = {
  tile: { monitor: "(min-width: 1024px) 300px, (min-width: 640px) 30vw, 85vw", phone: "(min-width: 1024px) 90px, 25vw" },
  large: { monitor: "(min-width: 1200px) 950px, 90vw", phone: "(min-width: 1200px) 270px, 25vw" },
};

// Desktop monitor with a phone standing beside it. Every dimension uses container units (cqw),
// so the mockup keeps identical proportions in a small card and in the full-screen viewer.
function DeviceMockup({ screen, size }: { screen: ProjectScreen; size: "tile" | "large" }) {
  const sizes = imageSizes[size];
  const mobile = screen.mobile ?? screen.desktop;

  return (
    <div data-mockup className="@container relative aspect-[10/7] w-full">
      {/* Monitor */}
      <div className="absolute top-0 left-0 w-[86cqw] drop-shadow-[0_1.2cqw_1.6cqw_rgb(0_0_0/0.35)]">
        <div className="rounded-t-[1.6cqw] bg-[#0d0f14] p-[1.5cqw] pb-[1.5cqw] ring-1 ring-white/10">
          <div className="relative aspect-[16/10] overflow-hidden rounded-[0.4cqw] bg-[#e9edf5]">
            {screen.desktopFit === "cover" ? (
              <Image
                src={screen.desktop.src}
                alt={screen.desktop.alt}
                fill
                sizes={sizes.monitor}
                className="object-cover object-top"
              />
            ) : (
              <FittedImage image={screen.desktop} sizes={sizes.monitor} />
            )}
            {/* Subtle glass reflection */}
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
          </div>
        </div>
        {/* Chin */}
        <div className="grid h-[4.6cqw] place-items-center rounded-b-[1.6cqw] bg-gradient-to-b from-[#e4e7ee] to-[#b8bdc8]">
          <span className="size-[1.1cqw] rounded-full bg-[#9aa0ad]" />
        </div>
        {/* Stand */}
        <div className="mx-auto h-[6cqw] w-[12cqw] bg-gradient-to-b from-[#a9aeb9] to-[#d3d7df] [clip-path:polygon(12%_0,88%_0,100%_100%,0_100%)]" />
        <div className="mx-auto h-[1.3cqw] w-[28cqw] rounded-t-[0.4cqw] rounded-b-[0.8cqw] bg-gradient-to-b from-[#dfe2e8] to-[#a9aeb9]" />
      </div>

      {/* Phone */}
      <div className="absolute right-0 bottom-0 w-[23cqw] rounded-[3.4cqw] bg-[#0d0f14] p-[1cqw] shadow-[0_1.2cqw_2cqw_rgb(0_0_0/0.4)] ring-1 ring-white/15">
        <div className="relative aspect-[9/19.5] overflow-hidden rounded-[2.5cqw] bg-[#e9edf5]">
          {screen.mobile ? (
            <Image src={mobile.src} alt={mobile.alt} fill sizes={sizes.phone} className="object-cover object-top" />
          ) : (
            <FittedImage image={mobile} sizes={sizes.phone} />
          )}
          <span className="absolute top-[1cqw] left-1/2 h-[1.6cqw] w-[7cqw] -translate-x-1/2 rounded-full bg-[#0d0f14]" />
        </div>
      </div>
    </div>
  );
}

// Fills the screen with a blurred copy of the image, then shows the whole image on top,
// so screenshots of any shape sit neatly on a device screen without plain bars.
function FittedImage({ image, sizes }: { image: ProjectImage; sizes: string }) {
  return (
    <>
      <Image src={image.src} alt="" fill sizes={sizes} className="scale-110 object-cover opacity-70 blur-md" />
      <Image src={image.src} alt={image.alt} fill sizes={sizes} className="object-contain" />
    </>
  );
}
