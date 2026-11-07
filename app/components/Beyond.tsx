import Image from "next/image";

import { beyondItems } from "@/data/portfolio";
import { Carousel } from "./Carousel";
import { SectionHeading } from "./SectionHeading";
import { ViewOnlyButton } from "./ViewOnly";

// Images only, in the same carousel as Certificates. Each card takes the exact shape of its photo, so
// there are no bars and nothing is cropped. Photos are loaded up front at low priority, so a card is
// already sharp when it slides into view.
export function Beyond() {
  return (
    <section id="beyond" className="overflow-x-clip bg-bg-alt py-24 sm:py-28">
      <div className="shell">
        <SectionHeading
          eyebrow="Beyond the Code"
          title="Life outside the screen"
          description="Moments from academics, pageants, school competitions and youth work that shaped who I am."
        />

        <div className="mt-14">
          <Carousel
            label="Beyond the Code"
            itemLabel="Photo"
            size="fitted"
            aspects={beyondItems.map((item) => item.image.width / item.image.height)}
          >
            {beyondItems.map((item) => {
              const aspect = item.image.width / item.image.height;
              return (
                <article
                  key={item.alt}
                  className="overflow-hidden rounded-3xl bg-surface shadow-card ring-1 ring-line transition hover:-translate-y-1 hover:ring-accent/60"
                >
                  <div data-view-only>
                    <ViewOnlyButton
                      image={item.image}
                      alt={item.alt}
                      ariaLabel={`View photo: ${item.alt}`}
                      className="relative block w-full cursor-zoom-in"
                      style={{ aspectRatio: aspect }}
                    >
                      <Image
                        src={item.image}
                        alt={item.alt}
                        fill
                        draggable={false}
                        quality={90}
                        loading="eager"
                        fetchPriority="low"
                        sizes={`(min-width: 1024px) ${Math.round(Math.min(820, 520 * aspect))}px, (min-width: 640px) ${Math.round(Math.min(780, 520 * aspect))}px, ${Math.round(Math.min(82, 90 * aspect))}vw`}
                        className="object-cover"
                      />
                    </ViewOnlyButton>
                  </div>
                </article>
              );
            })}
          </Carousel>
        </div>
      </div>
    </section>
  );
}
