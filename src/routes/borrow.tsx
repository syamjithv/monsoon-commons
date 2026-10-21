import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { SimBadge, Steps, UmbrellaGlyph } from "@/components/site";
import { count, useDemo } from "@/lib/demo-store";

export const Route = createFileRoute("/borrow")({
  validateSearch: (s) => z.object({ station: z.string().optional() }).parse(s),
  head: () => ({
    meta: [
      { title: "Borrow an Umbrella — Monsoon Commons" },
      { name: "description", content: "Pick a shared umbrella, review, confirm. A simulated three-step borrow." },
      { property: "og:title", content: "Borrow a shared umbrella" },
      { property: "og:description", content: "Three steps to rain cover from the Monsoon Commons network (simulated)." },
    ],
  }),
  component: Borrow,
});


function Borrow() {
  const { station } = Route.useSearch();
  const demo = useDemo();
  const { state } = demo;
  const [slug, setSlug] = useState(station ?? "campus-commons");
  const [pick, setPick] = useState<string | null>(null);
  const [step, setStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<{ id: string; from: string } | null>(null);
  const s = state.stations.find((x) => x.slug === slug);

  if (done) {
    return (
      <section className="rain bg-forest text-paper">
        <div className="relative z-10 mx-auto max-w-[1500px] px-5 py-20 md:px-10 md:py-28">
          <p className="label text-lime">Borrowed · simulated</p>
          <h1 className="display mt-6 text-[clamp(4.5rem,12vw,12rem)]">Stay <span className="text-lime">dry.</span></h1>
          <p className="display mt-6 text-5xl">Umbrella {done.id}</p>
          <p className="mt-2 text-xl text-paper/75">Picked up from {done.from}</p>
          <div className="mt-12 grid max-w-4xl gap-6 border-t border-paper/30 pt-8 md:grid-cols-3">
            {["Use it as long as the rain lasts.", "Return to any participating station with a free dock.", "Shake it off and leave it closed — stewards handle drying."].map((t, i) => (
              <p key={t} className="text-lg"><span className="label mr-2 text-lime">0{i + 1}</span>{t}</p>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap gap-4">
            <Link to="/return" className="btn-lime">Return it now →</Link>
            <Link to="/stations" className="btn-line text-paper">Back to map</Link>
          </div>
        </div>
      </section>
    );
  }

  if (state.loan) {
    return (
      <section className="mx-auto max-w-[1500px] px-5 py-24 md:px-10">
        <p className="label text-monsoon">One at a time</p>
        <h1 className="display mt-4 text-8xl text-forest">You already have {state.loan.umbrellaId}.</h1>
        <p className="mt-4 max-w-lg text-xl">Return it to any station before borrowing another. Sharing works when umbrellas keep moving.</p>
        <Link to="/return" className="btn-lime mt-8">Return {state.loan.umbrellaId} →</Link>
      </section>
    );
  }

  const available = s?.umbrellas.filter((u) => u.status === "available") ?? [];
  const umb = s?.umbrellas.find((u) => u.id === pick);

  const confirm = () => {
    if (!pick) return;
    const r = demo.borrow(slug, pick);
    if (!r.ok) {
      setError(r.error);
      setStep(0);
      setPick(null);
      return;
    }
    setDone({ id: pick, from: s!.name });
  };

  return (
    <section className="mx-auto max-w-[1500px] px-5 py-14 md:px-10 md:py-20">
      <div className="flex flex-wrap items-center gap-3"><p className="label text-electric">Borrow</p><SimBadge className="text-forest" /></div>
      <h1 className="display mt-4 text-[clamp(4rem,10vw,9rem)] text-forest">Borrow an umbrella.</h1>
      <div className="mt-10"><Steps step={step} labels={["Select", "Review", "Confirm"]} /></div>
      {error && <p role="alert" className="mt-6 border-l-4 border-monsoon bg-monsoon/15 p-4 text-lg">{error}</p>}

      {step === 0 && (
        <div className="mt-10 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="label">Pickup station</p>
            <div className="mt-3 flex flex-col">
              {state.stations.map((x) => {
                const a = count(x, "available");
                return (
                  <button
                    key={x.slug}
                    onClick={() => { setSlug(x.slug); setPick(null); setError(null); }}
                    className={`flex min-h-14 items-center justify-between border-t border-forest px-2 text-left ${slug === x.slug ? "bg-forest text-paper" : "hover:bg-paper-dim"}`}
                  >
                    <span className="display text-3xl">{x.name}</span>
                    <span className="label">{x.operational ? `${a} avail` : "offline"}</span>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="md:col-span-8">
            <p className="label">Choose by tag ID · {s?.id}</p>
            {!s?.operational ? (
              <p className="mt-4 border border-monsoon p-6 text-lg text-monsoon">This station is offline for maintenance. Pick another pickup station.</p>
            ) : available.length === 0 ? (
              <p className="mt-4 border border-monsoon p-6 text-lg text-monsoon">No umbrellas available here right now. Try another station.</p>
            ) : (
              <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-6">
                {s.umbrellas.map((u) => {
                  const ok = u.status === "available";
                  return (
                    <button
                      key={u.id}
                      disabled={!ok}
                      onClick={() => setPick(u.id)}
                      aria-pressed={pick === u.id}
                      className={`flex aspect-[3/4] flex-col justify-between p-2 text-left transition ${
                        !ok ? "cursor-not-allowed bg-paper-dim text-muted-foreground opacity-60" : pick === u.id ? "bg-forest text-lime" : "border border-forest hover:bg-lime"
                      }`}
                    >
                      <UmbrellaGlyph className="h-6 w-6" />
                      <span><span className="label block">{u.id}</span><span className="label block !text-[0.6rem] opacity-70">{u.status}</span></span>
                    </button>
                  );
                })}
              </div>
            )}
            <button disabled={!pick} onClick={() => setStep(1)} className="btn-lime mt-8">Review →</button>
          </div>
        </div>
      )}

      {step >= 1 && umb && s && (
        <div className="mt-10 grid gap-10 md:grid-cols-12">
          <div className="bg-forest p-8 text-paper md:col-span-7">
            <p className="label text-lime">Your umbrella</p>
            <p className="display mt-2 text-[clamp(5rem,12vw,10rem)] text-lime">{umb.id}</p>
            <dl className="mt-6 grid grid-cols-2 gap-6">
              <div><dt className="label text-paper/60">Pickup</dt><dd className="display text-3xl">{s.name}</dd></div>
              <div><dt className="label text-paper/60">Station ID</dt><dd className="display text-3xl">{s.id}</dd></div>
              <div><dt className="label text-paper/60">Loops so far</dt><dd className="display text-3xl">{umb.cycles}</dd></div>
              <div><dt className="label text-paper/60">Cost</dt><dd className="display text-3xl">Free · demo</dd></div>
            </dl>
          </div>
          <div className="md:col-span-5">
            {step === 1 ? (
              <>
                <p className="text-xl">Check the tag on the umbrella matches <strong>{umb.id}</strong>. Next, you'll confirm and the (simulated) dock releases it.</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <button onClick={() => setStep(2)} className="btn-lime">Continue →</button>
                  <button onClick={() => setStep(0)} className="btn-line text-forest">Change</button>
                </div>
              </>
            ) : (
              <>
                <p className="display text-5xl text-forest">Confirm borrow?</p>
                <p className="mt-4 text-lg text-muted-foreground">Availability at {s.name} drops by one. Return it to any participating station.</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <button onClick={confirm} className="btn-lime">Confirm borrow</button>
                  <button onClick={() => setStep(1)} className="btn-line text-forest">Back</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
