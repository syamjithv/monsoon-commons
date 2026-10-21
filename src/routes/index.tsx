import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero-monsoon.jpg";
import broken from "@/assets/broken-umbrellas.jpg";
import rack from "@/assets/station-rack.jpg";
import { Reveal, SimBadge, UmbrellaGlyph } from "@/components/site";
import { count, useDemo } from "@/lib/demo-store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Monsoon Commons — Rain is a commons. Own less, share more." },
      { name: "description", content: "A community umbrella-sharing prototype for monsoon Kerala: find a station, borrow, return, repair, reuse." },
      { property: "og:title", content: "Monsoon Commons — Rain is a commons." },
      { property: "og:description", content: "Own less. Share more. A better way to move through the monsoon — together." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <Marquee />
      <Problem />
      <Journey />
      <Network />
      <Loop />
      <Impact />
      <Closing />
    </>
  );
}

function Hero() {
  return (
    <section className="rain relative overflow-hidden bg-forest text-paper">
      <div className="mx-auto grid max-w-[1500px] md:grid-cols-12">
        <div className="relative z-10 px-5 pb-12 pt-10 md:col-span-7 md:px-10 md:pb-20 md:pt-16">
          <div className="flex flex-wrap items-center gap-3">
            <span className="label text-lime">Vol. 01 — Kochi, Kerala</span>
            <SimBadge className="text-paper/80" />
          </div>
          <h1 className="display mt-8 text-[clamp(5rem,15vw,15rem)] text-paper">
            Rain
            <br />
            is a <span className="text-lime">com&shy;mons.</span>
          </h1>
          <div className="mt-10 grid gap-8 md:grid-cols-[auto_1fr] md:items-start">
            <span className="label border-t border-lime pt-2 text-lime">Own less.<br />Share more.</span>
            <p className="max-w-lg text-xl leading-relaxed text-paper/85 md:text-2xl">
              A better way to move through the monsoon — together. Shared umbrellas, docked at public stations, treated as a community resource rather than another thing to buy and lose.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link to="/stations" className="btn-lime"><UmbrellaGlyph className="h-5 w-5" /> Find an Umbrella</Link>
            <Link to="/how-it-works" className="btn-line text-paper">Explore the idea →</Link>
          </div>
        </div>
        <div className="relative min-h-[420px] md:col-span-5 md:min-h-0">
          <img src={hero} alt="People walking with umbrellas down a rain-soaked Kerala road lined with coconut palms" width={1536} height={1024} className="absolute inset-0 h-full w-full object-cover object-[35%_center]" />
          <div className="absolute inset-0 bg-gradient-to-r from-forest via-forest/20 to-transparent" />
          <div className="absolute -left-10 bottom-16 z-10 h-40 w-40 rounded-full bg-monsoon mix-blend-multiply md:h-56 md:w-56" />
          <div className="absolute bottom-6 right-6 z-10 max-w-[13rem] bg-lime p-4 text-forest">
            <p className="label">Fig. 01</p>
            <p className="mt-2 text-sm leading-snug">Average monsoon rainfall, Kerala: ~2,000 mm across June–September.</p>
          </div>
          <span className="display absolute right-6 top-6 z-10 text-8xl text-lime/90">01</span>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const t = "Own less · Share more · Borrow · Return · Dry · Repair · Reuse · ";
  return (
    <div className="overflow-hidden border-y border-forest bg-lime py-3 text-forest" aria-hidden>
      <div className="marquee flex w-max whitespace-nowrap">
        {[0, 1].map((i) => (
          <span key={i} className="display px-4 text-4xl">{t.repeat(3)}</span>
        ))}
      </div>
    </div>
  );
}

function Problem() {
  return (
    <section className="mx-auto max-w-[1500px] px-5 py-24 md:px-10 md:py-36">
      <div className="grid gap-12 md:grid-cols-12">
        <Reveal className="md:col-span-5">
          <p className="label text-monsoon">02 — The problem</p>
          <h2 className="display mt-6 text-[clamp(3.5rem,8vw,8rem)] text-forest">
            One person.<br />Four umbrellas.<br /><span className="text-monsoon">Zero</span> when it rains.
          </h2>
        </Reveal>
        <Reveal className="relative md:col-span-6 md:col-start-7" delay={150}>
          <img src={broken} alt="A bin overflowing with broken, discarded umbrellas" loading="lazy" width={1024} height={1280} className="aspect-[4/5] w-full object-cover" />
          <span className="label absolute -left-3 top-8 bg-paper px-3 py-2 text-forest md:-left-16">Fig. 02 — End of a season</span>
        </Reveal>
      </div>
      <div className="mt-20 grid gap-0 border-t border-forest md:grid-cols-3">
        {[
          ["×4", "Umbrellas many households buy and misplace across one monsoon — an illustrative figure."],
          ["~1", "Season of use before ribs bend and canopies tear on cheap, unrepairable models."],
          ["0", "Repair pathways for most mixed steel–nylon umbrellas. They go straight to landfill."],
        ].map(([n, t], i) => (
          <Reveal key={n} delay={i * 120} className="border-forest py-8 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0">
            <p className="display text-8xl text-forest">{n}</p>
            <p className="mt-4 max-w-xs text-lg leading-snug text-muted-foreground">{t}</p>
          </Reveal>
        ))}
      </div>
      <p className="label mt-6 text-muted-foreground">Figures are illustrative for design research, not measured data.</p>
    </section>
  );
}

function Journey() {
  const steps = [
    ["Find", "a station", "Racks sit where the rain catches you: campus verandas, library porches, bus shelters."],
    ["Borrow", "an umbrella", "Tap the station code, take the umbrella it unlocks. No purchase, no deposit in this demo."],
    ["Return", "anywhere", "Dock it at any participating station. It dries, gets checked, and goes back into circulation."],
  ];
  return (
    <section className="bg-paper-dim grain">
      <div className="mx-auto max-w-[1500px] px-5 py-24 md:px-10 md:py-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <p className="label text-electric">03 — How the commons works</p>
          <Link to="/how-it-works" className="label link-under text-forest">Full journey →</Link>
        </div>
        <ol className="mt-12">
          {steps.map(([a, b, t], i) => (
            <Reveal key={a} delay={i * 100}>
              <li className="group grid items-baseline gap-4 border-t border-forest py-8 md:grid-cols-12 md:py-10">
                <span className="display text-6xl text-electric md:col-span-2 md:text-8xl">0{i + 1}</span>
                <h3 className="display text-[clamp(3.5rem,9vw,9rem)] text-forest transition-transform duration-500 group-hover:translate-x-3 md:col-span-6">
                  {a} <span className="font-serif text-[0.35em] font-normal normal-case italic tracking-normal text-muted-foreground">{b}</span>
                </h3>
                <p className="max-w-sm text-lg leading-relaxed md:col-span-4">{t}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Network() {
  const { state } = useDemo();
  const three = state.stations.slice(0, 3);
  return (
    <section className="relative overflow-hidden bg-forest text-paper">
      <div className="mx-auto grid max-w-[1500px] md:grid-cols-12">
        <div className="relative min-h-[380px] md:col-span-6">
          <img src={rack} alt="A rack of shared green umbrellas against a laterite wall on a rainy campus veranda" loading="lazy" width={1280} height={1024} className="absolute inset-0 h-full w-full object-cover" />
          <span className="label absolute left-5 top-5 bg-lime px-3 py-2 text-forest">Physical layer · the rack</span>
          <div className="absolute bottom-5 left-5 right-5 border border-paper/50 bg-forest/80 p-4 backdrop-blur">
            <p className="label text-lime">Physical → Digital</p>
            <p className="mt-2 text-sm">Each slot is a numbered dock. Each umbrella carries an ID tag. The interface mirrors what hangs on the wall.</p>
          </div>
        </div>
        <div className="px-5 py-16 md:col-span-6 md:px-12 md:py-24">
          <div className="flex flex-wrap items-center gap-3">
            <p className="label text-lime">04 — The physical network</p>
            <SimBadge className="text-paper/70" />
          </div>
          <h2 className="display mt-6 text-[clamp(3.5rem,7vw,7rem)]">Three racks.<br />One <span className="text-lime">commons.</span></h2>
          <ul className="mt-12">
            {three.map((s) => (
              <li key={s.slug}>
                <Link to="/stations/$id" params={{ id: s.slug }} className="group grid grid-cols-[1fr_auto] items-center gap-4 border-t border-paper/25 py-6 transition hover:bg-paper/5">
                  <div>
                    <p className="label text-paper/60">{s.id}</p>
                    <p className="display mt-1 text-4xl group-hover:text-lime md:text-5xl">{s.name}</p>
                    <p className="mt-1 text-sm text-paper/60">{s.place}</p>
                  </div>
                  <div className="text-right">
                    <p className="display text-7xl text-lime">{count(s, "available")}<span className="text-3xl text-paper/50">/{s.capacity}</span></p>
                    <p className="label text-paper/60">available</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <Link to="/stations" className="btn-lime mt-8">Open the station map →</Link>
        </div>
      </div>
    </section>
  );
}

function Loop() {
  const nodes = [
    ["Use", "Carried through a downpour by whoever needs it."],
    ["Return", "Docked at any participating station."],
    ["Dry", "Opened on a ventilated rack for 6–12 hours."],
    ["Repair", "Ribs, runners and canopy panels replaced, not binned."],
    ["Reuse", "Back in the rack, another season added."],
  ];
  return (
    <section className="mx-auto max-w-[1500px] px-5 py-24 md:px-10 md:py-36">
      <div className="grid gap-16 md:grid-cols-12 md:items-center">
        <Reveal className="md:col-span-5">
          <p className="label text-electric">05 — The circularity loop</p>
          <h2 className="display mt-6 text-[clamp(3.5rem,8vw,8rem)] text-forest">Mainte&shy;nance is the <span className="text-electric">product.</span></h2>
          <p className="mt-8 max-w-md text-xl leading-relaxed text-muted-foreground">
            A shared umbrella is designed to be opened, dried, fixed and reissued. Every loop extends its useful life — and delays the next one being made.
          </p>
        </Reveal>
        <Reveal className="md:col-span-7" delay={150}>
          <div className="relative mx-auto aspect-square max-w-[620px]">
            <svg viewBox="0 0 200 200" className="spin-slow absolute inset-0 h-full w-full text-forest" aria-hidden>
              <circle cx="100" cy="100" r="78" fill="none" stroke="currentColor" strokeWidth=".4" strokeDasharray="2 2" />
              <circle cx="100" cy="100" r="96" fill="none" stroke="currentColor" strokeWidth=".2" />
            </svg>
            <div className="absolute inset-[30%] flex flex-col items-center justify-center rounded-full bg-lime text-center text-forest">
              <p className="display text-6xl md:text-7xl">∞</p>
              <p className="label mt-1">loops / life</p>
            </div>
            {nodes.map(([t, d], i) => {
              const a = (i / nodes.length) * Math.PI * 2 - Math.PI / 2;
              const x = 50 + Math.cos(a) * 39;
              const y = 50 + Math.sin(a) * 39;
              return (
                <div key={t} style={{ left: `${x}%`, top: `${y}%` }} className="absolute w-28 -translate-x-1/2 -translate-y-1/2 text-center md:w-40">
                  <span className="label text-monsoon">0{i + 1}</span>
                  <p className="display text-3xl text-forest md:text-5xl">{t}</p>
                  <p className="mt-1 hidden text-sm leading-snug text-muted-foreground md:block">{d}</p>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Impact() {
  return (
    <section className="bg-electric text-paper">
      <div className="mx-auto max-w-[1500px] px-5 py-24 md:px-10 md:py-32">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="label">06 — Our impact (modelled)</p>
          <span className="label border border-paper px-2 py-1">Example metrics · not verified savings</span>
        </div>
        <div className="mt-12 grid gap-0 md:grid-cols-2">
          <div className="border-paper/40 pb-10 md:border-r md:pr-12">
            <p className="label text-paper/70">Individual ownership</p>
            <p className="display mt-4 text-[clamp(6rem,14vw,13rem)]">120</p>
            <p className="text-xl">umbrellas bought by 100 people in one example season</p>
          </div>
          <div className="border-t border-paper/40 pt-10 md:border-t-0 md:pl-12 md:pt-0">
            <p className="label text-lime">Shared access</p>
            <p className="display mt-4 text-[clamp(6rem,14vw,13rem)] text-lime">36</p>
            <p className="text-xl">shared umbrellas serving the same 100 people across three stations</p>
          </div>
        </div>
        <div className="mt-14 flex flex-wrap items-center justify-between gap-6 border-t border-paper/40 pt-8">
          <p className="max-w-xl text-lg text-paper/85">These are illustrative scenario numbers for design discussion. A proper lifecycle assessment would test them against real materials, transport, drying energy and repair rates.</p>
          <Link to="/impact" className="btn-lime">Read the lifecycle assessment →</Link>
        </div>
      </div>
    </section>
  );
}

function Closing() {
  return (
    <section className="rain relative bg-forest-deep text-paper">
      <div className="relative z-10 mx-auto max-w-[1500px] px-5 py-28 md:px-10 md:py-44">
        <p className="label text-lime">07 — Closing</p>
        <h2 className="display mt-8 text-[clamp(4rem,11vw,12rem)]">
          The best umbrella isn't always the one <span className="text-lime">you own.</span>
        </h2>
        <div className="mt-14 flex flex-wrap items-center gap-6">
          <Link to="/stations" className="btn-lime"><UmbrellaGlyph className="h-5 w-5" /> Find a station near you</Link>
          <SimBadge className="text-paper/70" />
        </div>
      </div>
    </section>
  );
}
