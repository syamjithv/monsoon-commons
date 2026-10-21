import { describe, expect, it } from "vitest";
import { borrow, count, returnUmbrella, seedState } from "@/lib/demo-store";

const avail = (s: ReturnType<typeof seedState>, slug: string) =>
  count(s.stations.find((x) => x.slug === slug)!, "available");

describe("demo borrowing rules", () => {
  it("borrowing decreases pickup availability by one", () => {
    const s = seedState();
    const r = borrow(s, "campus-commons", "CC-001");
    expect(r.ok).toBe(true);
    if (r.ok) expect(avail(r.state, "campus-commons")).toBe(avail(s, "campus-commons") - 1);
  });

  it("returning increases destination availability by one", () => {
    const r1 = borrow(seedState(), "campus-commons", "CC-001");
    if (!r1.ok) throw new Error();
    const before = avail(r1.state, "transit-point");
    const r2 = returnUmbrella(r1.state, "transit-point");
    expect(r2.ok).toBe(true);
    if (r2.ok) expect(avail(r2.state, "transit-point")).toBe(before + 1);
  });

  it("refuses to borrow an umbrella that is not available", () => {
    expect(borrow(seedState(), "campus-commons", "CC-010").ok).toBe(false); // in repair
  });

  it("refuses a second borrow while one is out", () => {
    const r1 = borrow(seedState(), "campus-commons", "CC-001");
    if (!r1.ok) throw new Error();
    expect(borrow(r1.state, "campus-commons", "CC-002").ok).toBe(false);
  });

  it("refuses to borrow from an offline station", () => {
    expect(borrow(seedState(), "market-shade", "MS-001").ok).toBe(false);
  });
});
