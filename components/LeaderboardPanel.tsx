"use client";
import type { ClassStats, LeaderboardResult, LineRecord } from "@/lib/types";
import { dirLabel } from "@/lib/spiral";
import Histogram from "./charts/Histogram";

interface Props {
  d: number;
  result: LeaderboardResult | null;
  progress: { frac: number; label: string } | null;
  params: { maxNonzero: number; minLen: number; topK: number };
  onParams: (p: { maxNonzero: number; minLen: number; topK: number }) => void;
  onRun: () => void;
  onPick: (r: LineRecord) => void;
  picked: LineRecord | null;
  disabled: boolean;
}

/** Size-normalised structure statistic: (Φ − 1) / Ē ≈ Var(C) across the lines of the class. */
export function structure(c: ClassStats): number {
  const meanE = c.expected / Math.max(1, c.lines);
  return meanE > 0 ? (c.dispersion - 1) / meanE : 0;
}

export function ClassTable({ classes, overall }: { classes: ClassStats[]; overall: ClassStats }) {
  const row = (c: ClassStats, name: string) => (
    <tr key={name}>
      <td>{name}</td>
      <td className="num">{c.directions}</td>
      <td className="num">{c.lines.toLocaleString()}</td>
      <td className="num">{c.actual.toLocaleString()}</td>
      <td className="num">{c.expected.toFixed(0)}</td>
      <td className="num">{(c.expected / Math.max(1, c.lines)).toFixed(2)}</td>
      <td className="num text-ink">{c.dispersion.toFixed(3)}</td>
      <td className="num text-ink">{structure(c).toFixed(3)}</td>
      <td className="num">{c.sdZ.toFixed(3)}</td>
      <td className="num">
        {c.emptyLines.toLocaleString()} / {c.emptyExpected.toFixed(0)}
      </td>
    </tr>
  );
  return (
    <table className="data">
      <thead>
        <tr>
          <th>direction class</th>
          <th>dirs</th>
          <th>lines</th>
          <th>primes</th>
          <th>expected</th>
          <th>Ē per line</th>
          <th>dispersion Φ</th>
          <th>(Φ−1)/Ē</th>
          <th>sd(z)</th>
          <th>empty lines obs / exp</th>
        </tr>
      </thead>
      <tbody>
        {classes.map((c) => row(c, c.nonzero === 1 ? "axis-parallel" : `${c.nonzero} non-zero entries`))}
        {row(overall, "all")}
      </tbody>
    </table>
  );
}

export function LineTable({ rows, onPick, picked, d }: { rows: LineRecord[]; onPick: (r: LineRecord) => void; picked: LineRecord | null; d: number }) {
  void d;
  return (
    <table className="data">
      <thead>
        <tr>
          <th>start</th>
          <th>direction</th>
          <th>len</th>
          <th>primes</th>
          <th>expected</th>
          <th>z</th>
          <th>C(f)</th>
          <th>polynomial of the ray</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => {
          const isP = picked && picked.start.join() === r.start.join() && picked.dir.join() === r.dir.join();
          return (
            <tr key={i} className={"clickable " + (isP ? "active" : "")} onClick={() => onPick(r)}>
              <td className="mono">({r.start.join(",")})</td>
              <td className="mono">{dirLabel(r.dir)}</td>
              <td className="num">{r.length}</td>
              <td className="num text-ink">{r.actual}</td>
              <td className="num">{r.expected.toFixed(1)}</td>
              <td className="num" style={{ color: r.z > 0 ? "var(--s3)" : "var(--s2)" }}>
                {r.z.toFixed(2)}
              </td>
              <td className="num">{r.C !== undefined ? r.C.toFixed(3) : "–"}</td>
              <td className="mono" style={{ whiteSpace: "normal", maxWidth: 380 }}>
                {r.poly ?? "–"}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default function LeaderboardPanel({ d, result, progress, params, onParams, onRun, onPick, picked, disabled }: Props) {
  return (
    <div className="h-full overflow-auto p-3 space-y-3">
      <div className="flex items-center gap-4 flex-wrap">
        <span className="label">scan every lattice line in the box</span>
        <label className="flex items-center gap-1 text-[11px] text-muted">
          directions with ≤
          <select value={params.maxNonzero} onChange={(e) => onParams({ ...params, maxNonzero: +e.target.value })}>
            {Array.from({ length: d }, (_, i) => i + 1).map((k) => (
              <option key={k} value={k}>
                {k}
              </option>
            ))}
          </select>
          non-zero entries
        </label>
        <label className="flex items-center gap-1 text-[11px] text-muted">
          min length
          <input type="number" min={2} value={params.minLen} onChange={(e) => onParams({ ...params, minLen: Math.max(2, +e.target.value) })} style={{ width: 60 }} />
        </label>
        <label className="flex items-center gap-1 text-[11px] text-muted">
          top K
          <input type="number" min={5} max={200} value={params.topK} onChange={(e) => onParams({ ...params, topK: +e.target.value })} style={{ width: 60 }} />
        </label>
        <button className="btn primary" onClick={onRun} disabled={disabled || !!progress}>
          scan lines
        </button>
        {result && <span className="text-[11px] text-muted num">last scan: {(result.elapsedMs / 1000).toFixed(1)} s</span>}
      </div>
      {progress && (
        <div>
          <div className="text-[11px] text-muted mb-1">{progress.label}</div>
          <div className="progress">
            <div style={{ width: `${progress.frac * 100}%` }} />
          </div>
        </div>
      )}
      {result && (
        <>
          <div className="grid grid-cols-4 gap-2">
            <div className="tile">
              <div className="label">lines scanned</div>
              <div className="v num">{result.overall.lines.toLocaleString()}</div>
            </div>
            <div className="tile">
              <div className="label">dispersion index Φ</div>
              <div className="v num">{result.overall.dispersion.toFixed(3)}</div>
              <div className="text-[11px] text-muted">1 = Poisson (no pattern)</div>
            </div>
            <div className="tile">
              <div className="label">sd of z</div>
              <div className="v num">{result.overall.sdZ.toFixed(3)}</div>
              <div className="text-[11px] text-muted">1 under the random model</div>
            </div>
            <div className="tile">
              <div className="label">primes on lines / expected</div>
              <div className="v num">{(result.overall.actual / Math.max(1, result.overall.expected)).toFixed(4)}</div>
            </div>
          </div>
          <ClassTable classes={result.classes} overall={result.overall} />
          <div className="grid grid-cols-2 gap-3">
            {result.classes.map((c) => (
              <div key={c.nonzero} className="panel p-2">
                <Histogram bins={c.zHist} lo={-6} hi={6} normal title={`z-scores, ${c.nonzero === 1 ? "axis-parallel" : c.nonzero + " non-zero"} directions (dashed: standard normal)`} />
              </div>
            ))}
          </div>
          <p className="text-[11px] text-muted max-w-[90ch]">
            Φ = Σ(A−E)²/E divided by the degrees of freedom. (Φ−1)/Ē removes the dependence on the expected count per line and estimates the variance of the Hardy–Littlewood constants across lines, so it can be compared between boxes of different size and dimension. If the primes on lattice lines behaved like independent coin flips with probability 1/ln n, Φ would be close to 1 and z would be standard normal. Φ &gt; 1 measures
            how strongly lines differ systematically, which is exactly what the Hardy–Littlewood constants C(f) predict: they spread the true expectation across lines. The excess of empty lines over exp(−E) has the same
            origin (polynomials with a fixed prime divisor). Click a line to highlight it and to analyse its polynomial.
          </p>
          <h3 className="label">richest lines</h3>
          <LineTable rows={result.top} onPick={onPick} picked={picked} d={d} />
          <h3 className="label">poorest lines</h3>
          <LineTable rows={result.bottom} onPick={onPick} picked={picked} d={d} />
        </>
      )}
    </div>
  );
}
