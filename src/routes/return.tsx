import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SimBadge } from "@/components/site";
import { count, freeSlots, useDemo } from "@/lib/demo-store";
import { Steps } from "./borrow";

export const Route = createFileRoute("/return")({
  head: () => ({
    meta: [
      { title: "Return an Umbrella — Monsoon Commons" },
      { name: "description", content: "Dock your shared umbrella at any participating station (simulated)." },
      { property: "og:title", content: "Return a shared umbrella" },
      { property: "og:description", content: "Return to any Monsoon Commons station with a free dock." },
    ],
  }),
  component: Return,
});

function Return() {
  const demo = useDemo();
  const { state } = demo;
  const [slug, setSlug] = useState<string | null>(null);
  const [step, setStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<{ id: string; to: string; avail: number } | null>(null);

  if (done) {
    return (
      <section className="bg-lime text-forest">
        <div className="mx-auto max-w-[1500px] px-5 py-20 md:px-10 md:py-28">
          <p className="label">Returned · simulated</p>
          <h1 className="display mt-6 text-[clamp(4.5rem,12vw,12rem)]">Back in the commons.</h1>
          <p className="mt-6 text-2xl">{done.id} is docked at {done.to}. That rack now has <strong>{done.avail}</strong> ready for the next person.</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link to="/stations" className="btn-line">See the map</Link>
            <Link to="/" className="btn-line">Home</Link>
          </div>
        </div>
      </section>
    );
  }

  if (!state.loan) {
    return (
      <section className="mx-auto max-w-[1500px] px-5 py-24 md:px-10">
        <p className="label text-electric">Return</p>
        <h1 className="display mt-4 text-[clamp(4rem,10vw,9rem)] text-forest">Nothing to return.</h1>
        <p className="mt-4 max-w-lg text-xl">You don't have a shared umbrella out right now.</p>
        <Link to="/stations" className="btn-lime mt-8">Find an umbrella →</Link>
      </section>
    );
  }

  const loan = state.loan;
  const dest = state.stations.find((s) => s.slug === slug);
  const confirm = () => {
    if (!slug) return;
    const r = demo.returnTo(slug);
    if (!r.ok) { setError(r.error); setStep(0); return; }
    const st = r.state.stations.find((s) => s.slug === slug)!;
    setDone({ id: loan.umbrellaId, to: st.name, avail: count(st, "available") });
  };

  return (
    <section className="mx-auto max-w-[1500px] px-5 py-14 md:px-10 md:py-20">
      <div className="flex flex-wrap items-center gap-3"><p className="label text-electric">Return</p><SimBadge className="text-forest" /></div>
      <h1 className="display mt-4 text-[clamp(4rem,10vw,9rem)] text-forest">Return <span className="text-electric">{loan.umbrellaId}.</span></h1>
      <div className="mt-10"><Steps step={step} labels={["Choose station", "Review & confirm"]} /></div>
      {error && <p role="alert" className="mt-6 border-l-4 border-monsoon bg-monsoon/15 p-4 text-lg">{error}</p>}

      {step === 0 ? (
        <div className="mt-8">
          <ul>
            {state.stations.map((s) => {
              const free = freeSlots(s);
              const ok = s.operational && free > 0;
              return (
                <li key={s.slug}>
                  <button
                    disabled={!ok}
                    onClick={() => { setSlug(s.slug); setError(null); }}
                    aria-pressed={slug === s.slug}
                    className={`grid w-full grid-cols-[1fr_auto] items-center gap-4 border-t border-forest px-3 py-5 text-left transition ${
                      !ok ? "cursor-not-allowed opacity-45" : slug === s.slug ? "bg-forest text-paper" : "hover:bg-paper-dim"
                    }`}
                  >
                    <span>
                      <span className="label block opacity-70">{s.id}</span>
                      <span className="display block text-4xl md:text-5xl">{s.name}</span>
                    </span>
                    <span className="text-right">
                      <span className="display block text-5xl">{ok ? free : "—"}</span>
                      <span className="label">{!s.operational ? "offline" : free > 0 ? "free docks" : "rack full"}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
          <button disabled={!slug} onClick={() => setStep(1)} className="btn-lime mt-8">Review →</button>
        </div>
      ) : (
        dest && (
          <div className="mt-10 grid gap-10 md:grid-cols-12">
            <div className="bg-forest p-8 text-paper md:col-span-7">
              <p className="label text-lime">Returning</p>
              <p className="display mt-2 text-[clamp(5rem,12vw,10rem)] text-lime">{loan.umbrellaId}</p>
              <p className="display mt-4 text-4xl">→ {dest.name}</p>
              <p className="label mt-2 text-paper/60">{dest.id} · {freeSlots(dest)} free docks · {count(dest, "available")} available now</p>
            </div>
            <div className="md:col-span-5">
              <p className="text-xl">Slot it into any free dock and close the strap. Availability at {dest.name} rises by one.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button onClick={confirm} className="btn-lime">Confirm return</button>
                <button onClick={() => setStep(0)} className="btn-line text-forest">Change station</button>
              </div>
            </div>
          </div>
        )
      )}
    </section>
  );
}
