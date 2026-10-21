import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SimBadge, StationMap, StatusTag } from "@/components/site";
import { count, useDemo } from "@/lib/demo-store";

export const Route = createFileRoute("/stations/")({
  head: () => ({
    meta: [
      { title: "Explore Stations — Monsoon Commons" },
      { name: "description", content: "Find a shared umbrella station across a simulated Kochi network: Campus Commons, Library Loop, Transit Point." },
      { property: "og:title", content: "Explore Monsoon Commons stations" },
      { property: "og:description", content: "A simulated map of shared umbrella racks in Kochi, Kerala." },
    ],
  }),
  component: Stations,
});

type Filter = "all" | "available" | "low";

function Stations() {
  const { state } = useDemo();
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [active, setActive] = useState<string | undefined>("campus-commons");

  const list = useMemo(() => {
    const t = q.trim().toLowerCase();
    return state.stations.filter((s) => {
      const a = count(s, "available");
      if (t && !`${s.name} ${s.id} ${s.place}`.toLowerCase().includes(t)) return false;
      if (filter === "available") return s.operational && a > 0;
      if (filter === "low") return a <= 2;
      return true;
    });
  }, [state, q, filter]);

  const total = state.stations.reduce((n, s) => n + count(s, "available"), 0);

  return (
    <div>
      <section className="mx-auto max-w-[1500px] px-5 pt-14 md:px-10 md:pt-20">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <div className="flex flex-wrap items-center gap-3">
              <p className="label text-electric">01 — Explore stations</p>
              <SimBadge className="text-forest" />
            </div>
            <h1 className="display mt-6 text-[clamp(4rem,11vw,11rem)] text-forest">Where's the <span className="text-electric">rain cover?</span></h1>
          </div>
          <div className="md:col-span-4 md:text-right">
            <p className="display text-[8rem] leading-none text-forest">{total}</p>
            <p className="label text-muted-foreground">umbrellas ready across the network</p>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-12 grid max-w-[1500px] gap-0 border-t border-forest md:grid-cols-12">
        <div className="md:col-span-7 md:border-r md:border-forest">
          <StationMap stations={state.stations} active={active} onSelect={setActive} />
          <p className="label px-5 py-3 text-muted-foreground md:px-10">Tap a marker · numbers = available umbrellas · locations are fictional</p>
        </div>
        <div className="px-5 py-8 md:col-span-5 md:px-8">
          <label className="label block text-forest" htmlFor="q">Search stations</label>
          <input
            id="q"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Name, ID or place…"
            className="mt-2 h-12 w-full border-b-2 border-forest bg-transparent text-xl outline-none placeholder:text-muted-foreground focus:border-electric"
          />
          <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="Filter">
            {([["all", "All"], ["available", "Has umbrellas"], ["low", "Low / empty"]] as const).map(([k, l]) => (
              <button
                key={k}
                onClick={() => setFilter(k)}
                aria-pressed={filter === k}
                className={`label min-h-10 border px-3 ${filter === k ? "border-forest bg-forest text-paper" : "border-forest/40 hover:border-forest"}`}
              >
                {l}
              </button>
            ))}
          </div>
          <ul className="mt-6">
            {list.length === 0 && (
              <li className="border-t border-forest py-10 text-lg text-muted-foreground">No stations match. Try clearing the search or filter.</li>
            )}
            {list.map((s) => {
              const a = count(s, "available");
              const on = active === s.slug;
              return (
                <li key={s.slug} className={`border-t border-forest py-5 transition ${on ? "bg-lime/40 -mx-3 px-3" : ""}`} onMouseEnter={() => setActive(s.slug)}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="label text-muted-foreground">{s.id}</p>
                      <p className="display mt-1 text-4xl text-forest">{s.name}</p>
                      <p className="text-sm text-muted-foreground">{s.place}</p>
                      <div className="mt-3"><StatusTag station={s} /></div>
                    </div>
                    <div className="text-right">
                      <p className={`display text-7xl ${a === 0 ? "text-monsoon" : "text-forest"}`}>{a}</p>
                      <p className="label text-muted-foreground">of {s.capacity}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <Link to="/stations/$id" params={{ id: s.slug }} className="label link-under min-h-10 py-2 text-forest">Station details →</Link>
                    {s.operational && a > 0 && (
                      <Link to="/borrow" search={{ station: s.slug }} className="label min-h-10 bg-forest px-3 py-2 text-lime">Borrow here</Link>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </div>
  );
}
