"use client";
import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { AnalysisWorker } from "@/lib/workerClient";
import { maxRadiusFor, oddPow, toN } from "@/lib/spiral";
import type { BuildResult, CloudData, DiffractionData, LeaderboardResult, LineAnalysis, LineRecord, PointAnalysis, RiemannSeries } from "@/lib/types";
import SpiralCanvas, { type ColorMode, type Overlay } from "./SpiralCanvas";
import PointCloud from "./PointCloud";
import InfoPanel from "./InfoPanel";
import LeaderboardPanel from "./LeaderboardPanel";
import DiffractionPanel from "./DiffractionPanel";
import RiemannPanel from "./RiemannPanel";
import ComparePanel from "./ComparePanel";
import TheoryPanel from "./TheoryPanel";

const DEFAULT_R: Record<number, number> = { 2: 1000, 3: 80, 4: 22, 5: 10, 6: 6, 7: 4, 8: 3 };
const SOFT_N = 16_000_000;
const HARD_N = 48_000_000;
type Tab = "view" | "cloud" | "lines" | "diffraction" | "riemann" | "compare" | "theory";
type Progress = { frac: number; label: string } | null;

const axisName = (i: number) => `x${"₁₂₃₄₅₆₇₈₉"[i] ?? i + 1}`;

const noop = () => () => {};

export default function Workbench() {
  // the workbench is client-only (workers, canvas, locale-formatted numbers)
  const mounted = useSyncExternalStore(noop, () => true, () => false);
  const workerRef = useRef<AnalysisWorker | null>(null);
  const [d, setD] = useState(2);
  const [R, setR] = useState(DEFAULT_R[2]);
  const [build, setBuild] = useState<BuildResult | null>(null);
  const [buildProgress, setBuildProgress] = useState<Progress>(null);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<Tab>("view");

  const [axes, setAxes] = useState<[number, number]>([0, 1]);
  const [fixed, setFixed] = useState<number[]>([0, 0]);
  const [cloudAxes, setCloudAxes] = useState<[number, number, number]>([0, 1, 2]);
  const [slice, setSlice] = useState<Uint8Array | null>(null);
  const [cloud, setCloud] = useState<CloudData | null>(null);
  const [colorMode, setColorMode] = useState<ColorMode>("prime");
  const [residueMod, setResidueMod] = useState(6);

  const [selected, setSelected] = useState<number[] | null>(null);
  const [analysis, setAnalysis] = useState<PointAnalysis | null>(null);
  const [analysisProgress, setAnalysisProgress] = useState<Progress>(null);
  const [pointParams, setPointParams] = useState({ maxNonzero: 2, extT: 500 });
  const [shownLine, setShownLine] = useState<LineAnalysis | null>(null);

  const [lb, setLb] = useState<LeaderboardResult | null>(null);
  const [lbProgress, setLbProgress] = useState<Progress>(null);
  const [lbParams, setLbParams] = useState({ maxNonzero: 2, minLen: 20, topK: 40 });
  const [picked, setPicked] = useState<LineRecord | null>(null);
  const [showTop, setShowTop] = useState(true);

  const [diff, setDiff] = useState<DiffractionData | null>(null);
  const [diffSize, setDiffSize] = useState(512);
  const [diffBusy, setDiffBusy] = useState(false);

  const [riemann, setRiemann] = useState<RiemannSeries | null>(null);
  const [riemannProgress, setRiemannProgress] = useState<Progress>(null);

  const N = oddPow(R, d);
  const side = 2 * R + 1;
  const built = build && build.d === d && build.R === R;

  const worker = () => (workerRef.current ??= new AnalysisWorker());

  const doBuild = useCallback(
    async (dd: number, RR: number) => {
      setError(null);
      setBuildProgress({ frac: 0, label: "starting" });
      setSlice(null);
      setCloud(null);
      setAnalysis(null);
      setSelected(null);
      setShownLine(null);
      setLb(null);
      setPicked(null);
      setDiff(null);
      setRiemann(null);
      try {
        const res = await worker().call<BuildResult>({ type: "build", d: dd, R: RR }, (frac, label) => setBuildProgress({ frac, label }));
        setBuild(res);
      } catch (e) {
        setError(e instanceof Error ? e.message : String(e));
      } finally {
        setBuildProgress(null);
      }
    },
    [],
  );

  // initial build
  useEffect(() => {
    const t = setTimeout(() => doBuild(2, DEFAULT_R[2]), 0);
    return () => {
      clearTimeout(t);
      workerRef.current?.terminate();
      workerRef.current = null;
    };
  }, [doBuild]);

  // fetch slice whenever the box, axes or fixed coords change
  useEffect(() => {
    if (!built) return;
    let cancelled = false;
    worker()
      .call<Uint8Array>({ type: "slice", axes, fixed })
      .then((s) => !cancelled && setSlice(s))
      .catch((e) => setError(String(e)));
    return () => {
      cancelled = true;
    };
  }, [built, axes, fixed, build]);

  // fetch cloud when on the cloud tab
  useEffect(() => {
    if (!built || d < 3 || tab !== "cloud") return;
    let cancelled = false;
    worker()
      .call<CloudData>({ type: "cloud", axes: cloudAxes, fixed })
      .then((c) => !cancelled && setCloud(c))
      .catch((e) => setError(String(e)));
    return () => {
      cancelled = true;
    };
  }, [built, d, tab, cloudAxes, fixed, build]);

  const analyse = useCallback(
    async (coords: number[], params = pointParams) => {
      setSelected(coords);
      setShownLine(null);
      setAnalysisProgress({ frac: 0, label: "analysing lines" });
      try {
        const res = await worker().call<PointAnalysis>({ type: "point", coords, maxNonzero: params.maxNonzero, extT: params.extT }, (frac, label) => setAnalysisProgress({ frac, label }));
        setAnalysis(res);
      } catch (e) {
        setError(e instanceof Error ? e.message : String(e));
      } finally {
        setAnalysisProgress(null);
      }
    },
    [pointParams],
  );

  const changeDim = (nd: number) => {
    setD(nd);
    const nr = DEFAULT_R[nd];
    setR(nr);
    setAxes([0, 1]);
    setCloudAxes([0, 1, Math.min(2, nd - 1)]);
    setFixed(new Array(nd).fill(0));
    setPointParams({ maxNonzero: nd <= 3 ? nd : 2, extT: nd <= 2 ? 500 : nd <= 4 ? 200 : 100 });
    setLbParams({ maxNonzero: nd <= 3 ? nd : 2, minLen: nd === 2 ? 20 : Math.max(3, Math.floor((2 * nr + 1) / 3)), topK: 40 });
    setTab((t) => (t === "cloud" && nd < 3 ? "view" : t));
    doBuild(nd, nr);
  };

  const runLeaderboard = async () => {
    setLbProgress({ frac: 0, label: "scanning" });
    try {
      const res = await worker().call<LeaderboardResult>({ type: "leaderboard", ...lbParams }, (frac, label) => setLbProgress({ frac, label }));
      setLb(res);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLbProgress(null);
    }
  };

  const runDiffraction = async () => {
    setDiffBusy(true);
    try {
      const res = await worker().call<DiffractionData>({ type: "diffraction", axes, fixed, size: diffSize });
      setDiff(res);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setDiffBusy(false);
    }
  };

  const runRiemann = async () => {
    setRiemannProgress({ frac: 0, label: "accumulating" });
    try {
      const res = await worker().call<RiemannSeries>({ type: "riemann" }, (frac, label) => setRiemannProgress({ frac, label }));
      setRiemann(res);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setRiemannProgress(null);
    }
  };

  const nOf = useCallback(
    (x: number, y: number) => {
      const c = fixed.slice();
      c[axes[0]] = x;
      c[axes[1]] = y;
      return toN(c, d);
    },
    [fixed, axes, d],
  );

  const inPlane = useCallback((dir: number[]) => dir.every((v, i) => v === 0 || i === axes[0] || i === axes[1]), [axes]);
  const lineInPlane = useCallback(
    (start: number[], dir: number[]) => inPlane(dir) && start.every((s, i) => i === axes[0] || i === axes[1] || s === fixed[i]),
    [inPlane, axes, fixed],
  );

  const overlays = useMemo<Overlay[]>(() => {
    const out: Overlay[] = [];
    const [a, b] = axes;
    if (lb && showTop) {
      for (const r of lb.top) if (lineInPlane(r.start, r.dir)) out.push({ x0: r.start[a], y0: r.start[b], dx: r.dir[a], dy: r.dir[b], len: r.length, color: "rgba(25,158,112,0.55)", width: 1 });
      for (const r of lb.bottom) if (lineInPlane(r.start, r.dir)) out.push({ x0: r.start[a], y0: r.start[b], dx: r.dir[a], dy: r.dir[b], len: r.length, color: "rgba(217,89,38,0.45)", width: 1 });
    }
    if (picked && lineInPlane(picked.start, picked.dir)) out.push({ x0: picked.start[a], y0: picked.start[b], dx: picked.dir[a], dy: picked.dir[b], len: picked.length, color: "#c98500", width: 2 });
    if (shownLine && selected && inPlane(shownLine.dir)) {
      let lo = -Infinity,
        hi = Infinity;
      for (let i = 0; i < d; i++) {
        const v = shownLine.dir[i];
        if (!v) continue;
        const t1 = (-R - selected[i]) / v,
          t2 = (R - selected[i]) / v;
        lo = Math.max(lo, Math.min(t1, t2));
        hi = Math.min(hi, Math.max(t1, t2));
      }
      lo = Math.ceil(lo);
      hi = Math.floor(hi);
      out.push({ x0: selected[a] + lo * shownLine.dir[a], y0: selected[b] + lo * shownLine.dir[b], dx: shownLine.dir[a], dy: shownLine.dir[b], len: hi - lo + 1, color: "#d55181", width: 2 });
    }
    return out;
  }, [lb, showTop, picked, shownLine, selected, axes, d, R, lineInPlane, inPlane]);

  const pickLine = (r: LineRecord) => {
    setPicked(r);
    const nf = fixed.slice();
    for (let i = 0; i < d; i++) if (i !== axes[0] && i !== axes[1]) nf[i] = r.start[i];
    setFixed(nf);
    setTab("view");
    analyse(r.start);
  };

  const selectedInPlane = selected && selected.every((s, i) => i === axes[0] || i === axes[1] || s === fixed[i]) ? ([selected[axes[0]], selected[axes[1]]] as [number, number]) : null;

  const memMB = ((N * 5) / 1e6).toFixed(0);
  const maxR = maxRadiusFor(HARD_N, d);

  if (!mounted) return <div className="h-screen flex items-center justify-center text-muted">loading workbench…</div>;

  return (
    <div className="h-screen flex flex-col">
      <header className="flex items-center gap-4 px-4 py-2 border-b border-white/10">
        <div>
          <span className="text-ink font-semibold">Ulam-nD</span>
          <span className="text-muted ml-2">prime spiral research workbench</span>
        </div>
        <nav className="flex items-center ml-6">
          {(
            [
              ["view", "2D slice"],
              ["cloud", "3D cloud"],
              ["lines", "line scan"],
              ["diffraction", "diffraction"],
              ["riemann", "Riemann"],
              ["compare", "dimensions"],
              ["theory", "theory"],
            ] as [Tab, string][]
          ).map(([t, label]) => (
            <button key={t} className={"tab " + (tab === t ? "active" : "")} onClick={() => setTab(t)} disabled={t === "cloud" && d < 3} style={t === "cloud" && d < 3 ? { opacity: 0.4 } : undefined}>
              {label}
            </button>
          ))}
        </nav>
        <div className="ml-auto text-[11px] text-muted num">
          {buildProgress ? (
            <span className="flex items-center gap-2">
              {buildProgress.label}
              <span className="progress" style={{ width: 120, display: "inline-block" }}>
                <div style={{ width: `${buildProgress.frac * 100}%` }} />
              </span>
            </span>
          ) : build ? (
            <>
              d = {build.d}, R = {build.R}: {build.N.toLocaleString()} numbers, {build.primeCount.toLocaleString()} primes, built in {(build.elapsedMs / 1000).toFixed(1)} s
            </>
          ) : null}
        </div>
      </header>
      {error && (
        <div className="px-4 py-1 text-crit text-[12px] border-b border-white/10 flex items-center gap-3">
          {error}
          <button className="btn" onClick={() => setError(null)}>
            dismiss
          </button>
        </div>
      )}
      <div className="flex-1 min-h-0 flex">
        <aside className="w-[260px] shrink-0 border-r border-white/10 overflow-auto p-3 space-y-4">
          <section className="space-y-2">
            <div className="label">spiral</div>
            <label className="flex items-center justify-between gap-2">
              <span>dimension d</span>
              <select value={d} onChange={(e) => changeDim(+e.target.value)}>
                {[2, 3, 4, 5, 6, 7, 8].map((k) => (
                  <option key={k} value={k}>
                    {k}
                    {[2, 3, 5, 8].includes(k) ? " ★" : ""}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <div className="flex justify-between">
                <span>radius R</span>
                <span className="num text-ink">{R}</span>
              </div>
              <input type="range" min={1} max={maxR} value={R} onChange={(e) => setR(+e.target.value)} />
            </label>
            <div className="text-[11px] text-muted num">
              box (2R+1)ᵈ = {N.toLocaleString()} numbers · ≈ {memMB} MB
              {N > SOFT_N && <div className="text-warn">large box: building takes several seconds</div>}
            </div>
            <button className="btn primary w-full" disabled={!!buildProgress || (built ?? false)} onClick={() => doBuild(d, R)}>
              {built ? "built" : "build"}
            </button>
          </section>

          <section className="space-y-2">
            <div className="label">2D slice</div>
            {d > 2 && (
              <div className="flex gap-2 items-center">
                <span>axes</span>
                <select value={axes[0]} onChange={(e) => setAxes([+e.target.value, axes[1] === +e.target.value ? axes[0] : axes[1]])}>
                  {Array.from({ length: d }, (_, i) => (
                    <option key={i} value={i}>
                      {axisName(i)} →
                    </option>
                  ))}
                </select>
                <select value={axes[1]} onChange={(e) => setAxes([axes[0] === +e.target.value ? axes[1] : axes[0], +e.target.value])}>
                  {Array.from({ length: d }, (_, i) => (
                    <option key={i} value={i}>
                      {axisName(i)} ↑
                    </option>
                  ))}
                </select>
              </div>
            )}
            {Array.from({ length: d }, (_, i) => i)
              .filter((i) => i !== axes[0] && i !== axes[1])
              .map((i) => (
                <label key={i} className="block">
                  <div className="flex justify-between">
                    <span>{axisName(i)} =</span>
                    <span className="num text-ink">{fixed[i]}</span>
                  </div>
                  <input
                    type="range"
                    min={-R}
                    max={R}
                    value={fixed[i]}
                    onChange={(e) => {
                      const nf = fixed.slice();
                      nf[i] = +e.target.value;
                      setFixed(nf);
                    }}
                  />
                </label>
              ))}
            <label className="flex items-center justify-between gap-2">
              <span>colour</span>
              <select value={colorMode} onChange={(e) => setColorMode(e.target.value as ColorMode)}>
                <option value="prime">primes</option>
                <option value="twin">twin primes</option>
                <option value="omega">Ω(n) prime factors</option>
                <option value="mobius">Möbius μ(n)</option>
                <option value="residue">residue n mod m</option>
              </select>
            </label>
            {colorMode === "residue" && (
              <label className="flex items-center justify-between gap-2">
                <span>modulus m</span>
                <input type="number" min={2} max={64} value={residueMod} onChange={(e) => setResidueMod(Math.max(2, +e.target.value))} style={{ width: 64 }} />
              </label>
            )}
            {lb && (
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={showTop} onChange={(e) => setShowTop(e.target.checked)} />
                overlay richest (green) / poorest (orange) lines
              </label>
            )}
          </section>

          {d >= 3 && (
            <section className="space-y-2">
              <div className="label">3D cloud axes</div>
              <div className="flex gap-1">
                {[0, 1, 2].map((k) => (
                  <select
                    key={k}
                    value={cloudAxes[k]}
                    onChange={(e) => {
                      const v = +e.target.value;
                      const na = cloudAxes.slice() as [number, number, number];
                      const j = na.indexOf(v);
                      if (j >= 0) na[j] = na[k];
                      na[k] = v;
                      setCloudAxes(na);
                    }}
                  >
                    {Array.from({ length: d }, (_, i) => (
                      <option key={i} value={i}>
                        {axisName(i)}
                      </option>
                    ))}
                  </select>
                ))}
              </div>
              <div className="text-[11px] text-muted">other coordinates are taken from the slice sliders</div>
            </section>
          )}

          <section className="text-[11px] text-muted space-y-1">
            <div className="label">legend</div>
            <div>★ Fibonacci dimension</div>
            <div>white = prime · dark = composite</div>
            <div>zoomed out: brightness = prime density</div>
            <div>orange square = selected point</div>
          </section>
        </aside>

        <main className="flex-1 min-w-0 flex">
          <div className="flex-1 min-w-0 panel m-2 overflow-hidden" style={{ borderRadius: 8 }}>
            {tab === "view" && (
              <SpiralCanvas
                slice={slice}
                side={side}
                R={R}
                N={N}
                colorMode={colorMode}
                residueMod={residueMod}
                nOf={nOf}
                selected={selectedInPlane}
                onSelect={(x, y) => {
                  const c = fixed.slice();
                  c[axes[0]] = x;
                  c[axes[1]] = y;
                  setPicked(null);
                  analyse(c);
                }}
                overlays={overlays}
                axisLabels={[axisName(axes[0]), axisName(axes[1])]}
              />
            )}
            {tab === "cloud" && <PointCloud cloud={cloud} R={R} N={N} layer={cloudAxes[2] !== axes[0] && cloudAxes[2] !== axes[1] ? fixed[cloudAxes[2]] : null} axisLabels={[axisName(cloudAxes[0]), axisName(cloudAxes[1]), axisName(cloudAxes[2])]} />}
            {tab === "lines" && <LeaderboardPanel d={d} result={lb} progress={lbProgress} params={lbParams} onParams={setLbParams} onRun={runLeaderboard} onPick={pickLine} picked={picked} disabled={!built} />}
            {tab === "diffraction" && <DiffractionPanel data={diff} side={side} size={diffSize} onSize={setDiffSize} onRun={runDiffraction} busy={diffBusy} disabled={!built} />}
            {tab === "riemann" && <RiemannPanel series={riemann} progress={riemannProgress} onRun={runRiemann} disabled={!built} />}
            {tab === "compare" && <ComparePanel />}
            {tab === "theory" && <TheoryPanel />}
          </div>
          {(tab === "view" || tab === "cloud") && (
            <div className="w-[520px] shrink-0 panel m-2 ml-0 overflow-hidden flex flex-col">
              <InfoPanel
                analysis={analysis}
                progress={analysisProgress}
                maxNonzero={pointParams.maxNonzero}
                extT={pointParams.extT}
                d={d}
                onParams={(maxNonzero, extT) => {
                  const p = { maxNonzero, extT };
                  setPointParams(p);
                  if (selected) analyse(selected, p);
                }}
                inPlane={inPlane}
                onShowLine={setShownLine}
                shownLine={shownLine}
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
