import { highlights } from "@/data/portfolio";

// Stat card that overlaps the bottom of the hero, as in the dark-mode reference.
export function Highlights() {
  return (
    <div className="shell relative z-10 -mt-20">
      <dl
        data-reveal
        className="grid grid-cols-3 divide-x divide-line rounded-3xl border border-line bg-surface px-2 py-8 shadow-card sm:px-8"
      >
        {highlights.map((item) => (
          <div key={item.label} className="flex flex-col items-center px-2 text-center">
            <dt className="order-2 mt-1 text-xs font-semibold text-fg sm:text-sm">{item.label}</dt>
            <dd className="font-display order-1 text-3xl text-accent-ink sm:text-4xl">{item.value}</dd>
            <dd className="order-3 mt-1 hidden text-xs leading-relaxed text-muted sm:block">{item.detail}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
