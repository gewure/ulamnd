"use client";
import { Fragment, useMemo, useState } from "react";
import type { LineAnalysis, PointAnalysis, RayAnalysis } from "@/lib/types";
import { dirLabel } from "@/lib/spiral";

interface Props {
  analysis: PointAnalysis | null;
  progress: { frac: number; label: string } | null;
  maxNonzero: number;
  extT: number;
  d: number;
  onParams: (maxNonzero: number, extT: number) => void;
  /** which directions lie in the current 2D slice plane (index into analysis.lines) */
  inPlane: (dir: number[]) => boolean;
  onShowLine: (line: LineAnalysis | null) => void;
  shownLine: LineAnalysis | null;
}

const f2 = (x: number) => (Math.abs(x) >= 100 ? x.toFixed(0) : x.toFixed(2));
const ratio = (a: number, e: number) => (e > 0 ? (a / e).toFixed(2) : "–");

function RayDetails({ r }: { r: RayAnalysis }) {
  return (
    <div className="tile text-[12px] space-y-1">
      <div>
        <span className="label">ray {r.sign > 0 ? "+v" : "−v"}</span> · polynomial from step t₀ = {r.t0}, degree {r.degree}
      </div>
      <div className="mono text-ink break-all">f(t) = {r.poly}</div>
      <div className="flex flex-wrap gap-x-4">
        <span>
          C(f) = <b className="text-ink num">{r.C.toFixed(4)}</b>
          {r.fixedDivisor && <span className="text-s2"> · fixed divisor {r.fixedDivisor}: at most one prime</span>}
          {!r.fixedDivisor && r.reducible === "yes" && <span className="text-s2"> · reducible over ℚ: finitely many primes</span>}
          {!r.fixedDivisor && r.reducible === "likely" && <span className="text-s4"> · no prime values found: probably reducible</span>}
        </span>
        <span>
          extrapolated t ∈ [{r.t0}, {r.t0 + r.extT}): primes <b className="text-ink num">{r.extActual}</b> · Bateman–Horn prediction <b className="text-ink num">{r.extPredicted.toFixed(1)}</b> · ratio{" "}
          <b className="text-ink num">{ratio(r.extActual, r.extPredicted)}</b>
          {!r.extDeterministic && <span className="text-muted"> (probable primes beyond 3·10²³)</span>}
        </span>
      </div>
      <div className="text-muted">
        local densities ω(p)/p:{" "}
        {r.localDensities.map((l) => (
          <span key={l.p} className="num mr-2">
            p={l.p}: {l.density.toFixed(3)}
          </span>
        ))}
      </div>
      <div className="text-muted mono">
        {r.samples.map((s) => (
          <span key={s.t} className={s.prime ? "text-ink mr-2" : "mr-2"}>
            {s.value}
            {s.prime ? "*" : ""}
          </span>
        ))}
        <span className="ml-1">(* prime)</span>
      </div>
    </div>
  );
}

export default function InfoPanel({ analysis, progress, maxNonzero, extT, d, onParams, inPlane, onShowLine, shownLine }: Props) {
  const [sort, setSort] = useState<"z" | "C" | "ext" | "dir">("z");
  const [open, setOpen] = useState<number | null>(null);

  const lines = useMemo(() => {
    if (!analysis) return [];
    const ls = analysis.lines.map((l, i) => ({ l, i }));
    const bestC = (l: LineAnalysis) => Math.max(0, ...l.rays.map((r) => r.C));
    const extRatio = (l: LineAnalysis) => {
      const a = l.rays.reduce((s, r) => s + r.extActual, 0),
        e = l.rays.reduce((s, r) => s + r.extPredicted, 0);
      return e > 0 ? a / e : 0;
    };
    switch (sort) {
      case "z":
        ls.sort((a, b) => Math.abs(b.l.z) - Math.abs(a.l.z));
        break;
      case "C":
        ls.sort((a, b) => bestC(b.l) - bestC(a.l));
        break;
      case "ext":
        ls.sort((a, b) => extRatio(b.l) - extRatio(a.l));
        break;
      default:
        break;
    }
    return ls;
  }, [analysis, sort]);

  return (
    <div className="flex flex-col h-full">
      <div className="px-3 py-2 border-b border-white/10 flex items-center gap-3 flex-wrap">
        <span className="label">point analysis</span>
        <label className="flex items-center gap-1 text-[11px] text-muted">
          directions with ≤
          <select value={maxNonzero} onChange={(e) => onParams(+e.target.value, extT)}>
            {Array.from({ length: d }, (_, i) => i + 1).map((k) => (
              <option key={k} value={k}>
                {k}
              </option>
            ))}
          </select>
          non-zero entries
        </label>
        <label className="flex items-center gap-1 text-[11px] text-muted">
          extrapolate
          <select value={extT} onChange={(e) => onParams(maxNonzero, +e.target.value)}>
            {[50, 100, 200, 500, 1000, 2000, 5000].map((k) => (
              <option key={k} value={k}>
                {k}
              </option>
            ))}
          </select>
          steps
        </label>
      </div>
      {progress && (
        <div className="px-3 py-2">
          <div className="text-[11px] text-muted mb-1">{progress.label}</div>
          <div className="progress">
            <div style={{ width: `${progress.frac * 100}%` }} />
          </div>
        </div>
      )}
      {!analysis && !progress && <div className="p-4 text-muted">Click a cell in the 2D view to analyse every lattice line through it: the exact polynomial of each ray, its Hardy–Littlewood constant, and the observed versus predicted prime counts.</div>}
      {analysis && (
        <div className="flex-1 min-h-0 overflow-auto">
          <div className="p-3 grid grid-cols-2 gap-2">
            <div className="tile">
              <div className="label">n</div>
              <div className="v num">{analysis.n.toLocaleString()}</div>
              <div className="text-[11px] text-muted mono">{analysis.isPrime ? "prime" : `= ${analysis.factorization}`}</div>
            </div>
            <div className="tile">
              <div className="label">coordinates · shell</div>
              <div className="v num" style={{ fontSize: 14 }}>
                ({analysis.coords.join(", ")})
              </div>
              <div className="text-[11px] text-muted">
                shell k = {analysis.shell} · Ω(n) = {analysis.omega}
              </div>
            </div>
          </div>
          <div className="px-3 pb-1 flex items-center gap-2 text-[11px] text-muted">
            <span>{lines.length} lines through this point · sort by</span>
            {(["z", "C", "ext", "dir"] as const).map((s) => (
              <button key={s} className={"tab " + (sort === s ? "active" : "")} style={{ padding: "2px 6px" }} onClick={() => setSort(s)}>
                {s === "z" ? "|z| in box" : s === "C" ? "C(f)" : s === "ext" ? "extrapolated ratio" : "direction"}
              </button>
            ))}
          </div>
          <table className="data">
            <thead>
              <tr>
                <th>direction</th>
                <th>pts</th>
                <th>primes</th>
                <th>expected</th>
                <th>z</th>
                <th>C(f) ±</th>
                <th>ext. act/pred</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {lines.map(({ l, i }) => {
                const extA = l.rays.reduce((s, r) => s + r.extActual, 0);
                const extE = l.rays.reduce((s, r) => s + r.extPredicted, 0);
                const isOpen = open === i;
                const shown = shownLine === l;
                return (
                  <Fragment key={i}>
                    <tr className={"clickable " + (shown ? "active" : "")} onClick={() => setOpen(isOpen ? null : i)}>
                      <td className="mono">{dirLabel(l.dir)}</td>
                      <td className="num">{l.points}</td>
                      <td className="num text-ink">{l.actual}</td>
                      <td className="num">{f2(l.expected)}</td>
                      <td className="num" style={{ color: Math.abs(l.z) > 2 ? (l.z > 0 ? "var(--s3)" : "var(--s2)") : undefined }}>
                        {l.z.toFixed(2)}
                      </td>
                      <td className="num">{l.rays.map((r) => (r.fixedDivisor ? "0" : r.reducible === "yes" ? "red." : r.C.toFixed(2))).join(" / ")}</td>
                      <td className="num">
                        {extA} / {extE.toFixed(1)} <span className="text-muted">({ratio(extA, extE)})</span>
                      </td>
                      <td>
                        {inPlane(l.dir) && (
                          <button
                            className="btn"
                            style={{ padding: "1px 6px" }}
                            onClick={(e) => {
                              e.stopPropagation();
                              onShowLine(shown ? null : l);
                            }}
                          >
                            {shown ? "hide" : "show"}
                          </button>
                        )}
                      </td>
                    </tr>
                    {isOpen && (
                      <tr>
                        <td colSpan={8} className="space-y-2" style={{ whiteSpace: "normal" }}>
                          {l.rays.map((r) => (
                            <RayDetails key={r.sign} r={r} />
                          ))}
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}
            </tbody>
          </table>
          <p className="p-3 text-[11px] text-muted">
            z = (primes − expected)/√expected, where expected = Σ 1/ln n over the line’s points inside the box (the “random” model). C(f) is the Bateman–Horn constant of the ray’s polynomial: the conjectured factor by
            which the line beats that model asymptotically. The extrapolation evaluates the polynomial far beyond the box and tests primality with Miller–Rabin.
          </p>
        </div>
      )}
    </div>
  );
}
