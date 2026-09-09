"use client";
import { useEffect, useRef, useState } from "react";
import type { CompareResult } from "@/lib/types";
import { AnalysisWorker } from "@/lib/workerClient";
import { maxRadiusFor, oddPow } from "@/lib/spiral";
import Histogram from "./charts/Histogram";
import LineChart from "./charts/LineChart";
import { LineTable, structure } from "./LeaderboardPanel";

const FIB = [2, 3, 5, 8];

export default function ComparePanel() {
  const [dims, setDims] = useState<number[]>([2, 3, 4, 5, 6, 8]);
  const [targetN, setTargetN] = useState(2_000_000);
  const [maxNonzero, setMaxNonzero] = useState(3);
  const [minLen, setMinLen] = useState(5);
  const [progress, setProgress] = useState<{ frac: number; label: string } | null>(null);
  const [result, setResult] = useState<CompareResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const workerRef = useRef<AnalysisWorker | null>(null);

  useEffect(() => () => workerRef.current?.terminate(), []);

  const run = async () => {
    setError(null);
    setProgress({ frac: 0, label: "starting" });
    workerRef.current?.terminate();
    const w = new AnalysisWorker();
    workerRef.current = w;
    try {
      const r = await w.call<CompareResult>({ type: "compare", dims: dims.slice().sort((a, b) => a - b), targetN, maxNonzero, minLen }, (frac, label) => setProgress({ frac, label }));
      setResult(r);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setProgress(null);
      w.terminate();
      workerRef.current = null;
    }
  };

  const toggle = (d: number) => setDims((ds) => (ds.includes(d) ? ds.filter((x) => x !== d) : [...ds, d]));

  const structureSeries = result
    ? [
        { name: "(Φ−1)/Ē, all lines", color: "var(--s1)", points: result.entries.map((e) => [e.d, structure(e.leaderboard.overall)] as [number, number]) },
        ...([1, 2, 3] as const).map((nz, i) => ({
          name: nz === 1 ? "(Φ−1)/Ē, axis-parallel" : `(Φ−1)/Ē, ${nz} non-zero`,
          color: ["var(--s2)", "var(--s3)", "var(--s4)"][i],
          points: result.entries.filter((e) => e.leaderboard.classes.some((c) => c.nonzero === nz)).map((e) => [e.d, structure(e.leaderboard.classes.find((c) => c.nonzero === nz)!)] as [number, number]),
        })),
      ].filter((s) => s.points.length > 0)
    : [];
  const dispersionSeries = result
    ? [
        { name: "Φ, all lines", color: "var(--s1)", points: result.entries.map((e) => [e.d, e.leaderboard.overall.dispersion] as [number, number]) },
        ...([1, 2, 3] as const).map((nz, i) => ({
          name: nz === 1 ? "Φ, axis-parallel" : `Φ, ${nz} non-zero`,
          color: ["var(--s2)", "var(--s3)", "var(--s4)"][i],
          points: result.entries.filter((e) => e.leaderboard.classes.some((c) => c.nonzero === nz)).map((e) => [e.d, e.leaderboard.classes.find((c) => c.nonzero === nz)!.dispersion] as [number, number]),
        })),
      ].filter((s) => s.points.length > 0)
    : [];

  return (
    <div className="h-full overflow-auto p-3 space-y-3">
      <div className="flex items-center gap-4 flex-wrap">
        <span className="label">compare dimensions</span>
        <div className="flex items-center gap-2 text-[12px]">
          {[2, 3, 4, 5, 6, 7, 8].map((d) => (
            <label key={d} className={"flex items-center gap-1 " + (FIB.includes(d) ? "text-ink" : "text-muted")}>
              <input type="checkbox" checked={dims.includes(d)} onChange={() => toggle(d)} />d = {d}
              {FIB.includes(d) && <span className="text-s4">★</span>}
            </label>
          ))}
        </div>
        <label className="text-[11px] text-muted flex items-center gap-1">
          numbers per dimension ≈
          <select value={targetN} onChange={(e) => setTargetN(+e.target.value)}>
            {[500_000, 1_000_000, 2_000_000, 4_000_000, 8_000_000].map((n) => (
              <option key={n} value={n}>
                {n.toLocaleString()}
              </option>
            ))}
          </select>
        </label>
        <label className="text-[11px] text-muted flex items-center gap-1">
          directions with ≤
          <select value={maxNonzero} onChange={(e) => setMaxNonzero(+e.target.value)}>
            {[1, 2, 3, 4].map((k) => (
              <option key={k} value={k}>
                {k}
              </option>
            ))}
          </select>
          non-zero entries (capped at 2 for d ≥ 6)
        </label>
        <label className="text-[11px] text-muted flex items-center gap-1">
          min line length
          <input type="number" min={2} value={minLen} onChange={(e) => setMinLen(Math.max(2, +e.target.value))} style={{ width: 56 }} />
        </label>
        <button className="btn primary" onClick={run} disabled={!!progress || dims.length === 0}>
          run comparison
        </button>
      </div>
      <div className="text-[11px] text-muted">
        boxes: {dims
          .slice()
          .sort((a, b) => a - b)
          .map((d) => {
            const R = Math.max(1, maxRadiusFor(targetN, d));
            return `d=${d}: R=${R} (${oddPow(R, d).toLocaleString()} numbers)`;
          })
          .join(" · ")}
        . ★ marks the Fibonacci dimensions; the others are controls.
      </div>
      {progress && (
        <div>
          <div className="text-[11px] text-muted mb-1">{progress.label}</div>
          <div className="progress">
            <div style={{ width: `${progress.frac * 100}%` }} />
          </div>
        </div>
      )}
      {error && <div className="text-crit">{error}</div>}
      {result && (
        <>
          <table className="data">
            <thead>
              <tr>
                <th>d</th>
                <th>R</th>
                <th>N</th>
                <th>primes</th>
                <th>density</th>
                <th>1/ln N</th>
                <th>lines</th>
                <th>Ē per line</th>
                <th>Φ all</th>
                <th>Φ axis</th>
                <th>Φ 2-nz</th>
                <th>Φ 3-nz</th>
                <th>(Φ−1)/Ē all</th>
                <th>(Φ−1)/Ē axis</th>
                <th>(Φ−1)/Ē 2-nz</th>
                <th>sd(z)</th>
                <th>empty obs/exp</th>
                <th>best z</th>
                <th>best C(f)</th>
              </tr>
            </thead>
            <tbody>
              {result.entries.map((e) => {
                const cls = (nz: number) => e.leaderboard.classes.find((c) => c.nonzero === nz);
                const o = e.leaderboard.overall;
                return (
                  <tr key={e.d} className={FIB.includes(e.d) ? "" : "text-muted"}>
                    <td className="text-ink">
                      {e.d}
                      {FIB.includes(e.d) ? " ★" : ""}
                    </td>
                    <td className="num">{e.R}</td>
                    <td className="num">{e.N.toLocaleString()}</td>
                    <td className="num">{e.primeCount.toLocaleString()}</td>
                    <td className="num">{e.primeDensity.toFixed(4)}</td>
                    <td className="num">{(1 / Math.log(e.N)).toFixed(4)}</td>
                    <td className="num">{o.lines.toLocaleString()}</td>
                    <td className="num">{(o.expected / Math.max(1, o.lines)).toFixed(2)}</td>
                    <td className="num">{o.dispersion.toFixed(3)}</td>
                    <td className="num">{cls(1)?.dispersion.toFixed(3) ?? "–"}</td>
                    <td className="num">{cls(2)?.dispersion.toFixed(3) ?? "–"}</td>
                    <td className="num">{cls(3)?.dispersion.toFixed(3) ?? "–"}</td>
                    <td className="num text-ink">{structure(o).toFixed(3)}</td>
                    <td className="num">{cls(1) ? structure(cls(1)!).toFixed(3) : "–"}</td>
                    <td className="num">{cls(2) ? structure(cls(2)!).toFixed(3) : "–"}</td>
                    <td className="num">{o.sdZ.toFixed(3)}</td>
                    <td className="num">
                      {o.emptyLines.toLocaleString()} / {o.emptyExpected.toFixed(0)}
                    </td>
                    <td className="num">{e.topLines[0]?.z.toFixed(2) ?? "–"}</td>
                    <td className="num">{Math.max(0, ...e.topLines.map((l) => l.C ?? 0)).toFixed(2)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="grid grid-cols-2 gap-3">
            <div className="panel p-2">
              <div className="label mb-1">structure (Φ−1)/Ē by dimension (0 = no line structure; comparable across box sizes)</div>
              <LineChart series={structureSeries} xLabel="dimension d" height={200} />
            </div>
            <div className="panel p-2">
              <div className="label mb-1">raw dispersion index Φ by dimension (1 = Poisson)</div>
              <LineChart series={dispersionSeries} xLabel="dimension d" height={200} />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {result.entries.map((e) => (
              <div key={e.d} className="panel p-2">
                <Histogram bins={e.leaderboard.overall.zHist} lo={-6} hi={6} normal title={`d = ${e.d}: z-scores of all lines (dashed: standard normal)`} color={FIB.includes(e.d) ? "var(--s1)" : "var(--s7)"} />
              </div>
            ))}
          </div>
          {result.entries.map((e) => (
            <div key={e.d} className="space-y-1">
              <div className="label">d = {e.d}: richest lines and their polynomials</div>
              <LineTable rows={e.topLines} onPick={() => {}} picked={null} d={e.d} />
            </div>
          ))}
          <p className="text-[11px] text-muted max-w-[90ch]">
            How to read this. Under the heuristic that the prime pattern on lattice lines is fully explained by Bateman–Horn, Φ − 1 ≈ Ē · Var(C): it grows with the spread of the constants C(f) across the lines of the box
            and with the expected count per line Ē. Lines get short quickly as d grows (2R+1 points), so Φ alone collapses towards 1 for trivial reasons; (Φ−1)/Ē removes that and should vary smoothly with d. When Ē falls
            below about 1 the counts are sums of a handful of Bernoulli trials, whose variance is below the Poisson value, so Φ slightly under 1 (negative structure) is expected noise rather than anti-structure: raise the
            number of numbers per dimension or the minimum line length before reading anything into the high dimensions. A dimension that stands out from its neighbours, in particular a jump at the Fibonacci dimensions relative to d = 4, 6, 7, would be a genuine anomaly worth
            reporting. Keep the number of numbers per dimension fixed (as here) so that the comparison is not confounded by prime density 1/ln N.
          </p>
        </>
      )}
    </div>
  );
}
