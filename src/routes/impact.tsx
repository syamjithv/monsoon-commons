import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site";

export const Route = createFileRoute("/impact")({
  head: () => ({
    meta: [
      { title: "Our Impact & Lifecycle Assessment — Monsoon Commons" },
      { name: "description", content: "An illustrative lifecycle comparison of owned versus shared umbrellas. Example figures, not verified savings." },
      { property: "og:title", content: "Owned vs shared: an umbrella lifecycle sketch" },
      { property: "og:description", content: "Illustrative lifecycle-assessment framing for the Monsoon Commons prototype." },
    ],
  }),
  component: Impact,
});

const STAGES = [
  ["Materials", "Steel ribs, aluminium shaft, nylon/polyester canopy, plastic handle.", 62, 38],
  ["Manufacture", "Assembly and dyeing, typically overseas.", 18, 9],
  ["Transport", "Shipping to retail; for shared, to stations.", 8, 5],
  ["Use phase", "Shared adds drying and steward trips.", 2, 14],
  ["End of life", "Mostly landfill; shared adds repair & part recovery.", 10, 4],
] as const;

function Impact() {
  return (
    <div>
      <section className="bg-electric text-paper">
        <div className="mx-auto max-w-[1500px] px-5 py-20 md:px-10 md:py-28">
          <div className="flex flex-wrap gap-3">
            <p className="label">03 — Our impact</p>
            <span className="label border border-paper px-2 py-0.5">Illustrative · not verified</span>
          </div>
          <h1 className="display mt-6 text-[clamp(4.5rem,12vw,12rem)]">Owned <span className="text-lime">vs</span> shared.</h1>
          <p className="mt-8 max-w-2xl text-xl leading-relaxed text-paper/90">
            A lifecycle-assessment sketch for design discussion. The numbers below are relative, made-up example weights per person-season — a structure for a future study, not a claim.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-[1500px] px-5 py-20 md:px-10">
        <div className="label grid grid-cols-[1fr_5rem_5rem] gap-4 border-b border-forest pb-3 md:grid-cols-[2fr_3fr_6rem_6rem]">
          <span>Stage</span>
          <span className="hidden md:block">Note</span>
          <span className="text-right">Owned</span>
          <span className="text-right text-electric">Shared</span>
        </div>
        {STAGES.map(([s, n, o, sh], i) => (
          <Reveal key={s} delay={i * 80}>
            <div className="grid grid-cols-[1fr_5rem_5rem] items-center gap-4 border-b border-forest/30 py-6 md:grid-cols-[2fr_3fr_6rem_6rem]">
              <div>
                <p className="display text-4xl text-forest md:text-5xl">{s}</p>
                <div className="mt-3 flex h-2 gap-1">
                  <span className="bg-forest" style={{ width: `${o}%` }} />
                </div>
                <div className="mt-1 flex h-2"><span className="bg-electric" style={{ width: `${sh}%` }} /></div>
              </div>
              <p className="hidden text-muted-foreground md:block">{n}</p>
              <p className="display text-right text-5xl">{o}</p>
              <p className="display text-right text-5xl text-electric">{sh}</p>
            </div>
          </Reveal>
        ))}
        <div className="mt-8 grid grid-cols-[1fr_5rem_5rem] gap-4 md:grid-cols-[2fr_3fr_6rem_6rem]">
          <p className="display text-5xl md:col-span-2">Index total</p>
          <p className="display text-right text-6xl">100</p>
          <p className="display text-right text-6xl text-electric">70</p>
        </div>
        <div className="mt-16 grid gap-8 border-t border-forest pt-10 md:grid-cols-2">
          <div>
            <p className="label text-monsoon">What would make this real</p>
            <ul className="mt-4 space-y-2 text-lg">
              <li>— Measured bill of materials per umbrella model</li>
              <li>— Observed loss, damage and repair rates per station</li>
              <li>— Energy and travel for drying and stewarding</li>
              <li>— Sensitivity to how many people each umbrella actually serves</li>
            </ul>
          </div>
          <div className="flex items-end justify-start md:justify-end">
            <Link to="/stations" className="btn-lime">Try the simulated network →</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
