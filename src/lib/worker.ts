/// <reference lib="webworker" />
import { analyzePoint, annotateLine, buildBox, cloud3D, leaderboard, riemannSeries, slice2D, type Box } from "../../research/lib/analysis";
import { diffraction } from "../../research/lib/fft";
import { OMEGA_MASK, type SieveResult } from "../../research/lib/sieve";
import { maxRadiusFor } from "../../research/lib/spiral";
import type { BuildResult, CompareEntry, CompareResult, DiffractionData, WorkerRequest, WorkerResponse } from "../../research/lib/types";

let box: Box | null = null;
let lastSieve: SieveResult | null = null;

const post = (m: WorkerResponse, transfer?: Transferable[]) => (self as unknown as Worker).postMessage(m, transfer ?? []);

function progress(id: number) {
  let lastT = 0;
  return (frac: number, label = "") => {
    const now = performance.now();
    if (now - lastT < 40 && frac < 1) return;
    lastT = now;
    post({ type: "progress", id, frac, label });
  };
}

function need(): Box {
  if (!box) throw new Error("No box built yet");
  return box;
}

self.onmessage = (ev: MessageEvent<WorkerRequest>) => {
  const req = ev.data;
  const id = req.id;
  try {
    switch (req.type) {
      case "build": {
        const t0 = performance.now();
        box = null; // free the old grid before allocating
        box = buildBox(req.d, req.R, lastSieve, progress(id));
        lastSieve = box.sv;
        const data: BuildResult = { d: box.d, R: box.R, N: box.N, primeCount: countPrimes(box), elapsedMs: performance.now() - t0 };
        post({ type: "result", id, data });
        break;
      }
      case "slice": {
        const s = slice2D(need(), req.axes, req.fixed);
        post({ type: "result", id, data: s }, [s.buffer]);
        break;
      }
      case "cloud": {
        const c = cloud3D(need(), req.axes, req.fixed);
        post({ type: "result", id, data: c }, [c.pos.buffer, c.n.buffer]);
        break;
      }
      case "point": {
        const p = progress(id);
        const data = analyzePoint(need(), req.coords, req.maxNonzero, req.extT, (f) => p(f, "analysing lines"));
        post({ type: "result", id, data });
        break;
      }
      case "leaderboard": {
        const b = need();
        const lb = leaderboard(b, req.maxNonzero, req.minLen, req.topK, progress(id));
        lb.top = lb.top.map((r) => annotateLine(r, b.d));
        lb.bottom = lb.bottom.map((r) => annotateLine(r, b.d));
        post({ type: "result", id, data: lb });
        break;
      }
      case "diffraction": {
        const b = need();
        const s = slice2D(b, req.axes, req.fixed);
        const size = Math.min(req.size, 1 << Math.floor(Math.log2(b.side)));
        const field = new Uint8Array(size * size);
        const off = Math.floor((b.side - size) / 2);
        let primes = 0;
        for (let y = 0; y < size; y++)
          for (let x = 0; x < size; x++) {
            const v = (s[(y + off) * b.side + x + off] & OMEGA_MASK) === 1 ? 1 : 0;
            field[y * size + x] = v;
            primes += v;
          }
        const df = diffraction(field, size);
        const data: DiffractionData = { ...df, primesInWindow: primes };
        post({ type: "result", id, data }, [df.logPower.buffer, df.autocorr.buffer]);
        break;
      }
      case "riemann": {
        const p = progress(id);
        const data = riemannSeries(need(), 1200, (f) => p(f, "accumulating π, ψ, M"));
        post({ type: "result", id, data });
        break;
      }
      case "compare": {
        const p = progress(id);
        const entries: CompareEntry[] = [];
        let sv: SieveResult | null = null;
        req.dims.forEach((d, i) => {
          const R = Math.max(1, maxRadiusFor(req.targetN, d));
          const base = i / req.dims.length,
            span = 1 / req.dims.length;
          const b = buildBox(d, R, sv, (f, l) => p(base + f * span * 0.4, `d=${d}: ${l}`));
          sv = b.sv;
          const maxNz = d >= 6 ? Math.min(req.maxNonzero, 2) : Math.min(req.maxNonzero, d);
          const lb = leaderboard(b, maxNz, req.minLen, 8, (f, l) => p(base + span * (0.4 + 0.6 * f), `d=${d}: ${l}`));
          lb.top = lb.top.map((r) => annotateLine(r, d));
          lb.bottom = [];
          entries.push({ d, R, N: b.N, primeCount: countPrimes(b), primeDensity: countPrimes(b) / b.N, leaderboard: lb, topLines: lb.top });
        });
        const data: CompareResult = { targetN: req.targetN, entries };
        post({ type: "result", id, data });
        break;
      }
    }
  } catch (e) {
    post({ type: "error", id, message: e instanceof Error ? e.message : String(e) });
  }
};

function countPrimes(b: Box): number {
  let c = 0;
  const data = b.sv.data;
  for (let n = 2; n <= b.N; n++) if ((data[n] & OMEGA_MASK) === 1) c++;
  return c;
}
