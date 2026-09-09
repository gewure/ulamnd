"use client";
import { useMemo, useState } from "react";
import type { RiemannSeries } from "@/lib/types";
import { findZeros, hardyZ, psiExplicit, schoenfeldPi, schoenfeldPsi, zetaCritical } from "@/lib/riemann";
import { smallPrimes } from "@/lib/sieve";
import LineChart from "./charts/LineChart";

interface Props {
  series: RiemannSeries | null;
  progress: { frac: number; label: string } | null;
  onRun: () => void;
  disabled: boolean;
}

export default function RiemannPanel({ series, progress, onRun, disabled }: Props) {
  const [tMax, setTMax] = useState(120);
  const [X, setX] = useState(150);
  const [K, setK] = useState(20);

  const zeta = useMemo(() => {
    const pts: [number, number][] = [];
    const zpts: [number, number][] = [];
    const step = tMax / 1500;
    for (let t = 0.5; t <= tMax; t += step) {
      const [re, im] = zetaCritical(t);
      pts.push([t, Math.hypot(re, im)]);
      zpts.push([t, t > 3 ? hardyZ(t) : NaN]);
    }
    const zeros = findZeros(3, tMax, Math.min(0.05, step));
    return { pts, zpts, zeros };
  }, [tMax]);

  const explicit = useMemo(() => {
    const primes = smallPrimes(X + 1);
    const stair: [number, number][] = [[1, 0]];
    let psi = 0;
    // prime powers
    const pp: { v: number; lp: number }[] = [];
    for (const p of primes) for (let q = p; q <= X; q *= p) pp.push({ v: q, lp: Math.log(p) });
    pp.sort((a, b) => a.v - b.v);
    for (const q of pp) {
      stair.push([q.v, psi]);
      psi += q.lp;
      stair.push([q.v, psi]);
    }
    stair.push([X, psi]);
    const zeros = zeta.zeros.length >= K ? zeta.zeros : findZeros(3, 260, 0.05);
    const approx: [number, number][] = [];
    for (let x = 2; x <= X; x += X / 1500) approx.push([x, psiExplicit(x, zeros, K)]);
    return { stair, approx, available: zeros.length };
  }, [X, K, zeta.zeros]);

  const rh = useMemo(() => {
    if (!series) return null;
    const piDev: [number, number][] = [],
      piR: [number, number][] = [],
      psiDev: [number, number][] = [],
      mert: [number, number][] = [];
    let maxPi = 0,
      maxPsi = 0,
      maxM = 0;
    for (let i = 0; i < series.x.length; i++) {
      const x = series.x[i];
      if (x < 100) continue;
      const a = (series.pi[i] - series.li[i]) / schoenfeldPi(x);
      const b = (series.pi[i] - series.R[i]) / schoenfeldPi(x);
      const c = (series.psi[i] - x) / schoenfeldPsi(x);
      const m = series.M[i] / Math.sqrt(x);
      piDev.push([x, a]);
      piR.push([x, b]);
      psiDev.push([x, c]);
      mert.push([x, m]);
      if (x >= 2657) maxPi = Math.max(maxPi, Math.abs(a));
      if (x >= 74) maxPsi = Math.max(maxPsi, Math.abs(c));
      maxM = Math.max(maxM, Math.abs(m));
    }
    return { piDev, piR, psiDev, mert, maxPi, maxPsi, maxM };
  }, [series]);

  return (
    <div className="h-full overflow-auto p-3 space-y-4">
      <section className="panel p-3 space-y-2">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="label">RH-equivalent error terms, computed from the sieve of the current box</span>
          <button className="btn primary" onClick={onRun} disabled={disabled || !!progress}>
            compute π(x), ψ(x), M(x)
          </button>
          {series && <span className="text-[11px] text-muted num">N = {series.N.toLocaleString()}, π(N) = {series.primeCount.toLocaleString()}</span>}
        </div>
        {progress && (
          <div className="progress">
            <div style={{ width: `${progress.frac * 100}%` }} />
          </div>
        )}
        {rh && (
          <>
            <div className="grid grid-cols-3 gap-2">
              <div className="tile">
                <div className="label">max |π(x) − li(x)| / bound, x ≥ 2657</div>
                <div className="v num">{rh.maxPi.toFixed(3)}</div>
                <div className="text-[11px] text-muted">RH ⟺ &lt; 1 for all x ≥ 2657 (Schoenfeld)</div>
              </div>
              <div className="tile">
                <div className="label">max |ψ(x) − x| / bound, x ≥ 74</div>
                <div className="v num">{rh.maxPsi.toFixed(3)}</div>
                <div className="text-[11px] text-muted">RH ⟺ &lt; 1 for all x ≥ 73.2 (Schoenfeld)</div>
              </div>
              <div className="tile">
                <div className="label">max |M(x)| / √x</div>
                <div className="v num">{rh.maxM.toFixed(3)}</div>
                <div className="text-[11px] text-muted">RH ⟺ M(x) = O(x^(1/2+ε)); the bound 1 fails eventually</div>
              </div>
            </div>
            <LineChart
              series={[
                { name: "(π(x) − li(x)) / (√x ln x / 8π)", color: "var(--s1)", points: rh.piDev },
                { name: "(π(x) − R(x)) / (√x ln x / 8π)", color: "var(--s2)", points: rh.piR },
              ]}
              xLog
              band={[-1, 1]}
              xLabel="x (log)"
              height={200}
            />
            <LineChart series={[{ name: "(ψ(x) − x) / (√x ln²x / 8π)", color: "var(--s1)", points: rh.psiDev }]} xLog band={[-1, 1]} xLabel="x (log)" height={160} />
            <LineChart series={[{ name: "M(x) / √x", color: "var(--s1)", points: rh.mert }]} xLog band={[-1, 1]} xLabel="x (log)" height={160} />
            <p className="text-[11px] text-muted max-w-[90ch]">
              The shaded band is the bound whose validity for every x is equivalent to the Riemann Hypothesis (von Koch 1901, made explicit by Schoenfeld 1976). Within any finite range the curves stay far inside the band;
              RH is the claim that they never leave it. π(x) − li(x) is negative throughout this range: the first sign change (Skewes) lies beyond 10^19.
            </p>
          </>
        )}
      </section>

      <section className="panel p-3 space-y-2">
        <div className="flex items-center gap-3">
          <span className="label">ζ on the critical line</span>
          <label className="text-[11px] text-muted flex items-center gap-1">
            t up to
            <input type="range" min={30} max={300} step={10} value={tMax} onChange={(e) => setTMax(+e.target.value)} style={{ width: 160 }} />
            <span className="num">{tMax}</span>
          </label>
          <span className="text-[11px] text-muted num">{zeta.zeros.length} zeros found by sign changes of Z(t)</span>
        </div>
        <LineChart series={[{ name: "Z(t) = e^{iθ(t)} ζ(½ + it)", color: "var(--s1)", points: zeta.zpts }]} vlines={zeta.zeros} xLabel="t" height={180} />
        <LineChart series={[{ name: "|ζ(½ + it)|", color: "var(--s3)", points: zeta.pts }]} xLabel="t" height={140} />
        <div className="text-[11px] text-muted mono" style={{ whiteSpace: "normal" }}>
          γ = {zeta.zeros.map((z) => z.toFixed(4)).join(", ")}
        </div>
      </section>

      <section className="panel p-3 space-y-2">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="label">explicit formula: the zeros rebuild the prime staircase</span>
          <label className="text-[11px] text-muted flex items-center gap-1">
            x up to
            <input type="range" min={30} max={600} step={10} value={X} onChange={(e) => setX(+e.target.value)} style={{ width: 120 }} />
            <span className="num">{X}</span>
          </label>
          <label className="text-[11px] text-muted flex items-center gap-1">
            zero pairs K
            <input type="range" min={0} max={Math.max(1, explicit.available)} step={1} value={Math.min(K, explicit.available)} onChange={(e) => setK(+e.target.value)} style={{ width: 160 }} />
            <span className="num">{Math.min(K, explicit.available)}</span>
          </label>
        </div>
        <LineChart
          series={[
            { name: "ψ(x) = Σ_{pᵏ ≤ x} ln p", color: "var(--s1)", points: explicit.stair },
            { name: `x − Σ_ρ x^ρ/ρ − ln 2π − ½ ln(1 − x⁻²), ${Math.min(K, explicit.available)} zero pairs`, color: "var(--s2)", points: explicit.approx },
          ]}
          xLabel="x"
          height={260}
        />
        <p className="text-[11px] text-muted max-w-[90ch]">
          Chebyshev’s ψ(x) jumps by ln p at every prime power. The right-hand side uses only the zeros ρ = ½ ± iγ computed above. Increase K and watch the smooth curve sharpen into the staircase: this is the sense in
          which the zeros “know” the primes, and the reason the real parts of the zeros control the error term in the prime number theorem.
        </p>
      </section>
    </div>
  );
}
