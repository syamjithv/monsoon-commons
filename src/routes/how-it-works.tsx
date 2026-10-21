import { createFileRoute, Link } from "@tanstack/react-router";
import { QrGlyph, Reveal } from "@/components/site";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How It Works — Monsoon Commons" },
      { name: "description", content: "Find a station, borrow an umbrella, return it anywhere. How the Monsoon Commons physical-digital loop works." },
      { property: "og:title", content: "How Monsoon Commons works" },
      { property: "og:description", content: "Find. Borrow. Return. Dry. Repair. Reuse." },
    ],
  }),
  component: HowItWorks,
});

const STEPS = [
  ["Find", "Open the station map. Each rack shows live (simulated) counts: available, out, drying, in repair."],
  ["Scan", "At the rack, scan the station code. In the future this unlocks a numbered dock; here it opens the station page."],
  ["Borrow", "Pick an available umbrella by its ID tag. Confirm. The dock releases it and the count drops by one."],
  ["Walk", "Get where you're going, dry. Keep it as long as the rain lasts."],
  ["Return", "Dock it at any participating station with a free slot. The count there rises by one."],
  ["Care", "Stewards rotate wet umbrellas to drying racks and flag damaged ones for repair."],
];

function HowItWorks() {
  return (
    <div>
      <section className="bg-forest text-paper">
        <div className="mx-auto grid max-w-[1500px] gap-10 px-5 py-20 md:grid-cols-12 md:px-10 md:py-28">
          <div className="md:col-span-8">
            <p className="label text-lime">02 — How it works</p>
            <h1 className="display mt-6 text-[clamp(4.5rem,12vw,12rem)]">Six moves.<br /><span className="text-lime">No owners.</span></h1>
          </div>
          <div className="flex items-end md:col-span-3 md:col-start-10">
            <div className="w-full border border-paper/40 p-4 text-forest">
              <QrGlyph value="MC-KOC-01" className="w-full" />
              <p className="label mt-3 text-paper">Station code · placeholder</p>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-[1500px] px-5 py-20 md:px-10">
        {STEPS.map(([t, d], i) => (
          <Reveal key={t}>
            <div className={`grid gap-4 border-t border-forest py-10 md:grid-cols-12 ${i % 2 ? "md:text-right" : ""}`}>
              <span className={`display text-7xl text-monsoon md:col-span-2 ${i % 2 ? "md:order-last md:col-start-11" : ""}`}>0{i + 1}</span>
              <h2 className={`display text-[clamp(3.5rem,8vw,8rem)] text-forest md:col-span-5 ${i % 2 ? "md:col-start-5" : ""}`}>{t}</h2>
              <p className={`max-w-md self-end text-xl leading-relaxed md:col-span-4 ${i % 2 ? "md:order-first md:col-start-1 md:ml-0" : ""}`}>{d}</p>
            </div>
          </Reveal>
        ))}
        <div className="mt-10 flex flex-wrap gap-4">
          <Link to="/stations" className="btn-lime">Find an umbrella →</Link>
          <Link to="/impact" className="btn-line text-forest">See the impact model</Link>
        </div>
      </section>
    </div>
  );
}
