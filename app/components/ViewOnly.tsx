"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

import { Icon } from "./Icon";

// View-only documents (resume, certificates). They are shown as screen-quality images with no
// download link. This stops casual saving; it cannot stop screenshots or browser developer tools.

/** Button that opens a document in a full-screen, view-only viewer. */
export function ViewOnlyButton({
  image,
  alt,
  caption,
  layout = "fit",
  className,
  style,
  ariaLabel,
  children,
}: {
  image: StaticImageData;
  alt: string;
  caption?: string;
  /** "fit" shows the whole image on screen; "page" fills the width and scrolls (tall documents). */
  layout?: "fit" | "page";
  className?: string;
  style?: CSSProperties;
  ariaLabel?: string;
  children: ReactNode;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) dialogRef.current?.showModal();
  }, [open]);

  const width =
    layout === "page"
      ? "min(100%, 860px)"
      : `min(100%, 1100px, ${image.width}px, calc(80dvh * ${image.width / image.height}))`; // never upscaled

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} aria-label={ariaLabel} className={className} style={style}>
        {children}
      </button>

      {open && (
        <dialog
          ref={dialogRef}
          data-view-only
          aria-label={caption ?? alt}
          onClose={() => setOpen(false)}
          onClick={(e) => {
            // Clicking anywhere outside the document closes the viewer.
            if (!(e.target as HTMLElement).closest("[data-view-only-page], button")) dialogRef.current?.close();
          }}
          className="m-0 h-dvh max-h-none w-full max-w-none bg-transparent p-0 text-white"
        >
          <div
            className={`flex h-full flex-col items-center gap-4 overflow-y-auto overscroll-contain px-4 py-16 sm:px-20 ${
              layout === "fit" ? "justify-center" : ""
            }`}
          >
            <div data-view-only-page className="relative shrink-0 rounded-sm bg-white shadow-2xl" style={{ width }}>
              <Image
                src={image}
                alt={alt}
                draggable={false}
                quality={90}
                placeholder="blur"
                sizes="(min-width: 1100px) 1100px, 100vw"
                className="h-auto w-full rounded-sm"
              />
            </div>
            {caption && <p className="shrink-0 text-center text-sm text-white/80">{caption}</p>}
          </div>

          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            aria-label="Close viewer"
            className="absolute top-4 right-4 grid size-11 place-items-center rounded-full bg-black/60 backdrop-blur-sm transition hover:bg-black/80"
          >
            <Icon name="close" />
          </button>
        </dialog>
      )}
    </>
  );
}

/** Blocks right-click and drag on view-only documents, and the save and print shortcuts. */
export function ViewOnlyGuard() {
  useEffect(() => {
    const inDocument = (e: Event) => (e.target as Element | null)?.closest?.("[data-view-only]");

    function blockIfDocument(e: Event) {
      if (inDocument(e)) e.preventDefault();
    }

    function onKeyDown(e: KeyboardEvent) {
      const key = e.key.toLowerCase();
      if ((e.ctrlKey || e.metaKey) && (key === "s" || key === "p")) e.preventDefault();
    }

    document.addEventListener("contextmenu", blockIfDocument);
    document.addEventListener("dragstart", blockIfDocument);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("contextmenu", blockIfDocument);
      document.removeEventListener("dragstart", blockIfDocument);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return null;
}
