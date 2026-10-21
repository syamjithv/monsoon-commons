import { useSyncExternalStore } from "react";

export type UmbrellaStatus = "available" | "borrowed" | "drying" | "repair";
export type Umbrella = { id: string; status: UmbrellaStatus; cycles: number };
export type Station = {
  id: string;
  slug: string;
  name: string;
  place: string;
  capacity: number;
  operational: boolean;
  x: number; // schematic position, 0-100
  y: number;
  umbrellas: Umbrella[];
};
export type Loan = { umbrellaId: string; fromStation: string; at: number };
export type DemoState = { stations: Station[]; loan: Loan | null };

function u(prefix: string, n: number, statuses: UmbrellaStatus[]): Umbrella[] {
  return statuses.slice(0, n).map((status, i) => ({
    id: `${prefix}-${String(i + 1).padStart(3, "0")}`,
    status,
    cycles: 12 + ((i * 7) % 40),
  }));
}

export function seedState(): DemoState {
  return {
    loan: null,
    stations: [
      {
        id: "MC-KOC-01",
        slug: "campus-commons",
        name: "Campus Commons",
        place: "Arts Block veranda, fictional college campus, Kochi",
        capacity: 12,
        operational: true,
        x: 24,
        y: 34,
        umbrellas: u("CC", 10, [
          "available", "available", "available", "available", "available", "available",
          "borrowed", "borrowed", "drying", "repair",
        ]),
      },
      {
        id: "MC-KOC-02",
        slug: "library-loop",
        name: "Library Loop",
        place: "Public reading room porch, Ernakulam (simulated)",
        capacity: 8,
        operational: true,
        x: 62,
        y: 22,
        umbrellas: u("LL", 7, [
          "available", "available", "borrowed", "borrowed", "borrowed", "drying", "drying",
        ]),
      },
      {
        id: "MC-KOC-03",
        slug: "transit-point",
        name: "Transit Point",
        place: "Metro feeder bus shelter, Kaloor (simulated)",
        capacity: 16,
        operational: true,
        x: 72,
        y: 70,
        umbrellas: u("TP", 9, [
          "available", "available", "available", "borrowed", "borrowed", "borrowed",
          "borrowed", "repair", "repair",
        ]),
      },
      {
        id: "MC-KOC-04",
        slug: "market-shade",
        name: "Market Shade",
        place: "Fish market arcade, Broadway (simulated)",
        capacity: 6,
        operational: false,
        x: 34,
        y: 78,
        umbrellas: u("MS", 3, ["borrowed", "repair", "drying"]),
      },
    ],
  };
}

export const count = (s: Station, status: UmbrellaStatus) =>
  s.umbrellas.filter((x) => x.status === status).length;
/** Umbrellas physically docked in the rack (not out on loan). */
export const docked = (s: Station) => s.umbrellas.filter((x) => x.status !== "borrowed").length;
export const freeSlots = (s: Station) => s.capacity - docked(s);

type Result = { ok: true; state: DemoState } | { ok: false; error: string };

export function borrow(state: DemoState, slug: string, umbrellaId: string, now = Date.now()): Result {
  if (state.loan) return { ok: false, error: "You already have an umbrella out. Return it before borrowing another." };
  const st = state.stations.find((s) => s.slug === slug);
  if (!st) return { ok: false, error: "That station doesn't exist." };
  if (!st.operational) return { ok: false, error: "This station is offline for maintenance." };
  const um = st.umbrellas.find((x) => x.id === umbrellaId);
  if (!um) return { ok: false, error: "That umbrella isn't at this station." };
  if (um.status !== "available") return { ok: false, error: `Umbrella ${um.id} is ${um.status} and can't be borrowed.` };
  return {
    ok: true,
    state: {
      loan: { umbrellaId, fromStation: slug, at: now },
      stations: state.stations.map((s) =>
        s.slug !== slug
          ? s
          : { ...s, umbrellas: s.umbrellas.map((x) => (x.id === umbrellaId ? { ...x, status: "borrowed" } : x)) },
      ),
    },
  };
}

export function returnUmbrella(state: DemoState, toSlug: string): Result {
  const loan = state.loan;
  if (!loan) return { ok: false, error: "You don't have an umbrella out right now." };
  const dest = state.stations.find((s) => s.slug === toSlug);
  if (!dest) return { ok: false, error: "That station doesn't exist." };
  if (!dest.operational) return { ok: false, error: "This station is offline. Choose another." };
  if (freeSlots(dest) <= 0) return { ok: false, error: "This rack is full. Choose another station." };
  const origin = state.stations.find((s) => s.slug === loan.fromStation);
  const um = origin?.umbrellas.find((x) => x.id === loan.umbrellaId) ?? {
    id: loan.umbrellaId, status: "borrowed" as const, cycles: 0,
  };
  const returned: Umbrella = { ...um, status: "available", cycles: um.cycles + 1 };
  return {
    ok: true,
    state: {
      loan: null,
      stations: state.stations.map((s) => {
        let list = s.slug === loan.fromStation ? s.umbrellas.filter((x) => x.id !== loan.umbrellaId) : s.umbrellas;
        if (s.slug === toSlug) list = [...list, returned];
        return list === s.umbrellas ? s : { ...s, umbrellas: list };
      }),
    },
  };
}

// ---- tiny client store ----
const KEY = "monsoon-commons-demo-v1";
let SERVER: DemoState | null = null;
let current: DemoState | null = null;
const listeners = new Set<() => void>();

function getServer() {
  return (SERVER ??= seedState());
}
function get() {
  if (current) return current;
  if (typeof window === "undefined") return getServer();
  try {
    const raw = window.localStorage.getItem(KEY);
    current = raw ? (JSON.parse(raw) as DemoState) : seedState();
  } catch {
    current = seedState();
  }
  return current;
}
function set(next: DemoState) {
  current = next;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* ignore */
  }
  listeners.forEach((l) => l());
}
function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

export function useDemo() {
  const state = useSyncExternalStore(subscribe, get, getServer);
  return {
    state,
    borrow: (slug: string, id: string) => {
      const r = borrow(get(), slug, id);
      if (r.ok) set(r.state);
      return r;
    },
    returnTo: (slug: string) => {
      const r = returnUmbrella(get(), slug);
      if (r.ok) set(r.state);
      return r;
    },
    reset: () => set(seedState()),
  };
}
