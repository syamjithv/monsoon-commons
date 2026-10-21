import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useDemo, count, type Station } from "@/lib/demo-store";

export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          el.classList.add("is-in");
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export function SimBadge({ className = "" }: { className?: string }) {
  return (
    <span className={`label inline-flex items-center gap-2 border border-current px-2.5 py-1 ${className}`}>
      <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-monsoon" />
      Live demo · simulated network
    </span>
  );
}

const NAV = [
  { to: "/stations", label: "Explore Stations", n: "01" },
  { to: "/how-it-works", label: "How It Works", n: "02" },
  { to: "/impact", label: "Our Impact", n: "03" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { state } = useDemo();
  return (
    <header className="sticky top-0 z-50 border-b border-forest/20 bg-paper/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1500px] items-center justify-between gap-4 px-5 md:px-10">
        <Link to="/" className="display text-2xl tracking-tight text-forest md:text-[1.7rem]" onClick={() => setOpen(false)}>
          Monsoon<span className="text-electric">/</span>Commons
        </Link>
        <nav className="hidden items-center gap-8 lg:flex">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} className="label link-under text-forest" activeProps={{ className: "text-electric" }}>
              <span className="mr-1.5 text-monsoon">{n.n}</span>
              {n.label}
            </Link>
          ))}
          {state.loan && (
            <Link to="/return" className="label text-monsoon link-under">
              ● Return {state.loan.umbrellaId}
            </Link>
          )}
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/stations" className="btn-lime hidden !min-h-10 !px-4 !py-2 sm:inline-flex">
            <UmbrellaGlyph className="h-4 w-4" /> Find an Umbrella
          </Link>
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 border border-forest lg:hidden"
          >
            <span className={`h-px w-5 bg-forest transition ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
            <span className={`h-px w-5 bg-forest transition ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-forest/20 bg-forest text-paper lg:hidden">
          <nav className="flex flex-col px-5 py-6">
            {NAV.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="display flex items-baseline gap-4 border-b border-paper/15 py-4 text-5xl">
                <span className="label text-lime">{n.n}</span>
                {n.label}
              </Link>
            ))}
            {state.loan && (
              <Link to="/return" onClick={() => setOpen(false)} className="display py-4 text-4xl text-monsoon">
                Return {state.loan.umbrellaId}
              </Link>
            )}
            <Link to="/stations" onClick={() => setOpen(false)} className="btn-lime mt-6 justify-center">
              Find an Umbrella
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  const { reset } = useDemo();
  return (
    <footer className="bg-forest-deep text-paper">
      <div className="mx-auto grid max-w-[1500px] gap-10 px-5 py-16 md:grid-cols-12 md:px-10">
        <div className="md:col-span-5">
          <p className="display text-6xl text-lime md:text-7xl">Monsoon Commons</p>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-paper/75">
            An experimental community-sharing prototype exploring degrowth, shared access and circular design for monsoon-season Kerala. A student design-research project — not a live service.
          </p>
        </div>
        <div className="md:col-span-3 md:col-start-7">
          <p className="label mb-4 text-lime">Navigate</p>
          <ul className="space-y-2 text-lg">
            <li><Link to="/stations" className="link-under">Explore Stations</Link></li>
            <li><Link to="/how-it-works" className="link-under">How It Works</Link></li>
            <li><Link to="/impact" className="link-under">Our Impact &amp; LCA</Link></li>
            <li><Link to="/return" className="link-under">Return an Umbrella</Link></li>
          </ul>
        </div>
        <div className="md:col-span-3">
          <p className="label mb-4 text-lime">Disclosure</p>
          <p className="text-paper/70">
            All stations, umbrellas and figures are simulated demonstration data. Demo state lives only in this browser.
          </p>
          <button onClick={reset} className="label mt-4 border border-paper/40 px-3 py-2 hover:border-lime hover:text-lime">
            Reset demo network
          </button>
        </div>
      </div>
      <div className="label border-t border-paper/10 px-5 py-5 text-paper/50 md:px-10">
        © 2026 Monsoon Commons · Own less. Share more.
      </div>
    </footer>
  );
}

export function UmbrellaGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden>
      <path d="M2 12a10 10 0 0 1 20 0z" fill="currentColor" fillOpacity=".15" />
      <path d="M12 12v7a2 2 0 0 0 4 0M12 2v1" />
    </svg>
  );
}

/** Deterministic QR-like placeholder graphic generated from a string. */
export function QrGlyph({ value, className = "" }: { value: string; className?: string }) {
  const N = 21;
  let h = 0;
  for (const c of value) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  const cells: [number, number][] = [];
  for (let y = 0; y < N; y++)
    for (let x = 0; x < N; x++) {
      const finder = (x < 8 && y < 8) || (x > N - 9 && y < 8) || (x < 8 && y > N - 9);
      if (finder) continue;
      h = (h * 1103515245 + 12345) >>> 0;
      if ((h >> 16) & 1) cells.push([x, y]);
    }
  const Finder = ({ x, y }: { x: number; y: number }) => (
    <g>
      <rect x={x} y={y} width="7" height="7" fill="currentColor" />
      <rect x={x + 1} y={y + 1} width="5" height="5" fill="var(--paper)" />
      <rect x={x + 2} y={y + 2} width="3" height="3" fill="currentColor" />
    </g>
  );
  return (
    <svg viewBox={`-1 -1 ${N + 2} ${N + 2}`} className={className} role="img" aria-label={`Placeholder station code for ${value}`}>
      <rect x="-1" y="-1" width={N + 2} height={N + 2} fill="var(--paper)" />
      {cells.map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="currentColor" />
      ))}
      <Finder x={0} y={0} />
      <Finder x={N - 7} y={0} />
      <Finder x={0} y={N - 7} />
    </svg>
  );
}

export function StatusTag({ station }: { station: Station }) {
  const a = count(station, "available");
  const [txt, cls] = !station.operational
    ? ["Offline · maintenance", "bg-monsoon text-forest-deep"]
    : a === 0
      ? ["Empty rack", "border border-monsoon text-monsoon"]
      : a <= 2
        ? ["Running low", "border border-current"]
        : ["Operational", "bg-lime text-forest"];
  return <span className={`label inline-block px-2 py-1 ${cls}`}>{txt}</span>;
}

/** Stylised schematic of a fictional Kochi neighbourhood with clickable station markers. */
export function StationMap({
  stations,
  active,
  onSelect,
}: {
  stations: Station[];
  active?: string | undefined;
  onSelect?: (slug: string) => void;
}) {
  return (
    <div className="grid-lines relative aspect-[4/3] w-full overflow-hidden bg-forest text-paper md:aspect-[16/11]">
      <svg viewBox="0 0 100 75" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
        {/* backwater */}
        <path d="M0 55 C 20 50, 30 65, 50 60 S 80 40, 100 48 L100 75 L0 75Z" fill="var(--electric)" fillOpacity=".35" />
        {/* roads */}
        <path d="M0 30 L100 18" stroke="var(--paper)" strokeOpacity=".35" strokeWidth=".6" fill="none" />
        <path d="M18 0 L40 75" stroke="var(--paper)" strokeOpacity=".35" strokeWidth=".6" fill="none" />
        <path d="M55 0 C 60 30, 75 40, 80 75" stroke="var(--paper)" strokeOpacity=".35" strokeWidth=".6" fill="none" />
        {/* commons route */}
        <path d="M24 25 L62 16 L72 52 L34 58 Z" stroke="var(--lime)" strokeWidth=".35" strokeDasharray="1.2 1" fill="none" />
      </svg>
      <span className="label absolute left-4 top-4 text-lime">Schematic · Kochi (fictional)</span>
      <span className="label absolute bottom-4 left-4 text-paper/60">Vembanad backwater ≈</span>
      <span className="label absolute right-4 top-4 text-paper/60">N ↑</span>
      {stations.map((s) => {
        const a = count(s, "available");
        const isActive = active === s.slug;
        return (
          <button
            key={s.slug}
            onClick={() => onSelect?.(s.slug)}
            style={{ left: `${s.x}%`, top: `${s.y}%` }}
            className="group absolute -translate-x-1/2 -translate-y-1/2 text-left"
            aria-label={`${s.name}, ${a} available`}
          >
            <span
              className={`flex h-12 w-12 items-center justify-center border-2 font-display text-2xl font-black transition md:h-14 md:w-14 md:text-3xl ${
                !s.operational
                  ? "border-monsoon bg-forest-deep text-monsoon"
                  : isActive
                    ? "scale-110 border-lime bg-lime text-forest"
                    : "border-lime bg-forest text-lime group-hover:bg-lime group-hover:text-forest"
              }`}
            >
              {a}
            </span>
            <span className={`label mt-1 block whitespace-nowrap ${isActive ? "text-lime" : "text-paper"}`}>
              {s.id.slice(-2)} · {s.name}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function Steps({ step, labels }: { step: number; labels: string[] }) {
  return (
    <ol className="flex flex-wrap gap-x-8 gap-y-2 border-b border-forest pb-4">
      {labels.map((l, i) => (
        <li key={l} className={`label ${i === step ? "text-electric" : i < step ? "text-forest" : "text-muted-foreground"}`}>
          <span className="mr-2">{i < step ? "✓" : `0${i + 1}`}</span>{l}
        </li>
      ))}
    </ol>
  );
}
