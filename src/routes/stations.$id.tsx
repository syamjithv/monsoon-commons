import { createFileRoute, Link } from "@tanstack/react-router";
import { QrGlyph, SimBadge, StatusTag } from "@/components/site";
import { count, docked, freeSlots, seedState, useDemo, type UmbrellaStatus } from "@/lib/demo-store";

export const Route = createFileRoute("/stations/$id")({
  head: ({ params }) => {
    const s = seedState().stations.find((x) => x.slug === params.id);
    const name = s ? `${s.name} (${s.id})` : "Station";
    return {
      meta: [
        { title: `${name} — Monsoon Commons` },
        { name: "description", content: `Simulated inventory and borrowing for ${name}, a Monsoon Commons umbrella station.` },
        { property: "og:title", content: `${name} — Monsoon Commons` },
        { property: "og:description", content: "Available, borrowed, drying and repair inventory for a shared umbrella rack." },
      ],
    };
  },
  component: StationPage,
});

const STATES: [UmbrellaStatus, string, string][] = [
  ["available", "Available", "bg-lime text-forest"],
  ["borrowed", "Borrowed", "bg-electric text-paper"],
  ["drying", "Drying", "bg-paper-dim text-forest"],
  ["repair", "Repair", "bg-monsoon text-forest-deep"],
];

function StationPage() {
  const { id } = Route.useParams();
  const { state } = useDemo();
  const s = state.stations.find((x) => x.slug === id);
  if (!s) {
    return (
      <div className="mx-auto max-w-[1500px] px-5 py-32 md:px-10">
        <h1 className="display text-8xl">No such station.</h1>
        <Link to="/stations" className="btn-lime mt-8">Back to map</Link>
      </div>
    );
  }
  const a = count(s, "available");
  const util = Math.round((count(s, "borrowed") / Math.max(1, s.umbrellas.length)) * 100);
  const slots = Array.from({ length: s.capacity }, (_, i) => s.umbrellas.filter((x) => x.status !== "borrowed")[i]);

  return (
    <div>
      <section className="bg-forest text-paper">
        <div className="mx-auto grid max-w-[1500px] gap-10 px-5 py-14 md:grid-cols-12 md:px-10 md:py-20">
          <div className="md:col-span-8">
            <Link to="/stations" className="label link-under text-lime">← All stations</Link>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="label border border-lime px-2 py-1 text-lime">{s.id}</span>
              <StatusTag station={s} />
              <SimBadge className="text-paper/70" />
            </div>
            <h1 className="display mt-6 text-[clamp(4.5rem,12vw,12rem)]">{s.name}</h1>
            <p className="mt-4 text-xl text-paper/75">{s.place}</p>
          </div>
          <div className="md:col-span-4 md:text-right">
            <p className="display text-[clamp(8rem,18vw,16rem)] leading-none text-lime">{a}</p>
            <p className="label">umbrellas ready to borrow</p>
            <div className="mt-8">
              {s.operational && a > 0 ? (
                <Link to="/borrow" search={{ station: s.slug }} className="btn-lime">Borrow an umbrella →</Link>
              ) : (
                <p className="border border-monsoon p-4 text-left text-monsoon">
                  {s.operational ? "This rack is empty right now. Try a nearby station." : "Offline for maintenance. Borrowing is paused."}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] px-5 py-16 md:px-10">
        <div className="grid border-t border-forest sm:grid-cols-2 lg:grid-cols-4">
          {STATES.map(([k, l]) => (
            <div key={k} className="border-b border-forest py-6 sm:odd:border-r lg:border-r lg:px-6 lg:first:pl-0 lg:last:border-r-0">
              <p className="label text-muted-foreground">{l}</p>
              <p className="display text-8xl text-forest">{count(s, k)}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          <div><p className="label text-muted-foreground">Capacity</p><p className="display text-6xl">{s.capacity} docks</p></div>
          <div><p className="label text-muted-foreground">Docked now</p><p className="display text-6xl">{docked(s)} · {freeSlots(s)} free</p></div>
          <div>
            <p className="label text-muted-foreground">Utilisation (out on loan)</p>
            <p className="display text-6xl">{util}%</p>
            <div className="mt-2 h-2 bg-paper-dim"><div className="h-full bg-electric" style={{ width: `${util}%` }} /></div>
          </div>
        </div>
      </section>

      <section className="bg-paper-dim">
        <div className="mx-auto grid max-w-[1500px] gap-12 px-5 py-16 md:grid-cols-12 md:px-10 md:py-24">
          <div className="md:col-span-7">
            <p className="label text-electric">The rack, mirrored</p>
            <h2 className="display mt-4 text-6xl text-forest md:text-7xl">Every dock, one cell.</h2>
            <div className="mt-8 grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8">
              {slots.map((u, i) => {
                const style = u ? STATES.find((x) => x[0] === u.status)![2] : "border border-dashed border-forest/40 text-muted-foreground";
                return (
                  <div key={i} className={`flex aspect-[3/5] flex-col justify-between p-1.5 ${style}`}>
                    <span className="label !text-[0.6rem]">D{String(i + 1).padStart(2, "0")}</span>
                    <span className="label !text-[0.6rem]">{u ? u.id : "empty"}</span>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 flex flex-wrap gap-4">
              {STATES.filter(([k]) => k !== "borrowed").map(([k, l, c]) => (
                <span key={k} className="label flex items-center gap-2"><span className={`h-3 w-3 ${c}`} />{l}</span>
              ))}
            </div>
          </div>
          <div className="md:col-span-4 md:col-start-9">
            <div className="bg-paper p-6 text-forest">
              <QrGlyph value={s.id} className="w-full" />
              <p className="label mt-4">Station code · {s.id}</p>
              <p className="mt-1 text-sm text-muted-foreground">Placeholder for a printed code on the physical rack. No live scanning in this prototype.</p>
            </div>
            <ol className="mt-8 space-y-4 text-lg">
              <li><span className="label mr-2 text-monsoon">01</span>Each rack has numbered docks and a printed station code.</li>
              <li><span className="label mr-2 text-monsoon">02</span>Each umbrella carries a tag matching its ID here.</li>
              <li><span className="label mr-2 text-monsoon">03</span>A future dock lock would release the umbrella you confirm — and register it when returned.</li>
            </ol>
          </div>
        </div>
      </section>
    </div>
  );
}
