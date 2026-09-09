"use client";
import { useMemo, useState } from "react";

export interface Series {
  name: string;
  color: string;
  points: [number, number][];
  /** draw as a staircase (step-after) */
  step?: boolean;
  dashed?: boolean;
}

interface Props {
  series: Series[];
  height?: number;
  xLabel?: string;
  yLabel?: string;
  xLog?: boolean;
  /** shaded horizontal band, e.g. the RH bound */
  band?: [number, number];
  yDomain?: [number, number];
  /** vertical reference lines (e.g. zeros) */
  vlines?: number[];
  format?: (v: number) => string;
}

const fmt = (v: number) => {
  const a = Math.abs(v);
  if (a >= 1e6) return (v / 1e6).toFixed(2) + "M";
  if (a >= 1e4) return (v / 1e3).toFixed(1) + "K";
  if (a >= 100) return v.toFixed(0);
  if (a >= 1) return v.toFixed(2);
  return v.toPrecision(3);
};

function niceTicks(lo: number, hi: number, n = 5): number[] {
  const span = hi - lo || 1;
  const raw = span / n;
  const mag = Math.pow(10, Math.floor(Math.log10(raw)));
  const norm = raw / mag;
  const step = (norm < 1.5 ? 1 : norm < 3.5 ? 2 : norm < 7.5 ? 5 : 10) * mag;
  const out: number[] = [];
  for (let v = Math.ceil(lo / step) * step; v <= hi + 1e-9; v += step) out.push(+v.toFixed(10));
  return out;
}

export default function LineChart({ series, height = 220, xLabel, yLabel, xLog, band, yDomain, vlines, format = fmt }: Props) {
  const W = 720,
    H = height;
  const m = { l: 56, r: 16, t: 12, b: 34 };
  const [hover, setHover] = useState<number | null>(null);

  const { xs, ys, xmin, xmax, ymin, ymax } = useMemo(() => {
    let xmin = Infinity,
      xmax = -Infinity,
      ymin = Infinity,
      ymax = -Infinity;
    for (const s of series)
      for (const [x, y] of s.points) {
        if (!isFinite(x) || !isFinite(y)) continue;
        xmin = Math.min(xmin, x);
        xmax = Math.max(xmax, x);
        ymin = Math.min(ymin, y);
        ymax = Math.max(ymax, y);
      }
    if (band) {
      ymin = Math.min(ymin, band[0]);
      ymax = Math.max(ymax, band[1]);
    }
    if (yDomain) [ymin, ymax] = yDomain;
    if (!isFinite(xmin)) {
      xmin = 0;
      xmax = 1;
      ymin = 0;
      ymax = 1;
    }
    if (ymin === ymax) {
      ymin -= 1;
      ymax += 1;
    }
    const pad = (ymax - ymin) * 0.05;
    if (!yDomain) {
      ymin -= pad;
      ymax += pad;
    }
    const tx = (x: number) => (xLog ? Math.log(x) : x);
    const xs = (x: number) => m.l + ((tx(x) - tx(xmin)) / (tx(xmax) - tx(xmin) || 1)) * (W - m.l - m.r);
    const ys = (y: number) => m.t + (1 - (y - ymin) / (ymax - ymin)) * (H - m.t - m.b);
    return { xs, ys, xmin, xmax, ymin, ymax };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [series, band, yDomain, xLog, H]);

  const xTicks = useMemo(() => {
    if (!xLog) return niceTicks(xmin, xmax, 6);
    const out: number[] = [];
    for (let e = Math.ceil(Math.log10(xmin)); e <= Math.floor(Math.log10(xmax)); e++) out.push(Math.pow(10, e));
    if (out.length < 3) return niceTicks(xmin, xmax, 6).filter((v) => v > 0);
    return out;
  }, [xmin, xmax, xLog]);
  const yTicks = niceTicks(ymin, ymax, 5);

  const paths = series.map((s) => {
    let d = "";
    let prev: [number, number] | null = null;
    for (const p of s.points) {
      if (!isFinite(p[0]) || !isFinite(p[1])) continue;
      if (!prev) d += `M${xs(p[0]).toFixed(1)},${ys(p[1]).toFixed(1)}`;
      else if (s.step) d += `H${xs(p[0]).toFixed(1)}V${ys(p[1]).toFixed(1)}`;
      else d += `L${xs(p[0]).toFixed(1)},${ys(p[1]).toFixed(1)}`;
      prev = p;
    }
    return d;
  });

  // hover: nearest x in the first series
  const onMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * W;
    const s0 = series[0];
    if (!s0 || !s0.points.length) return;
    let best = 0,
      bd = Infinity;
    for (let i = 0; i < s0.points.length; i++) {
      const dd = Math.abs(xs(s0.points[i][0]) - px);
      if (dd < bd) {
        bd = dd;
        best = i;
      }
    }
    setHover(best);
  };

  const hx = hover !== null && series[0]?.points[hover] ? series[0].points[hover][0] : null;

  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height }} onMouseMove={onMove} onMouseLeave={() => setHover(null)}>
        {band && <rect x={m.l} y={ys(band[1])} width={W - m.l - m.r} height={Math.max(0, ys(band[0]) - ys(band[1]))} fill="var(--s1)" opacity={0.1} />}
        {yTicks.map((t) => (
          <g key={"y" + t}>
            <line x1={m.l} x2={W - m.r} y1={ys(t)} y2={ys(t)} stroke="var(--grid)" strokeWidth={1} />
            <text x={m.l - 6} y={ys(t) + 4} fontSize={10} fill="var(--muted)" textAnchor="end" className="num">
              {format(t)}
            </text>
          </g>
        ))}
        {xTicks.map((t) => (
          <g key={"x" + t}>
            <line x1={xs(t)} x2={xs(t)} y1={m.t} y2={H - m.b} stroke="var(--grid)" strokeWidth={1} />
            <text x={xs(t)} y={H - m.b + 14} fontSize={10} fill="var(--muted)" textAnchor="middle" className="num">
              {format(t)}
            </text>
          </g>
        ))}
        {vlines?.map((v, i) => <line key={"v" + i} x1={xs(v)} x2={xs(v)} y1={m.t} y2={H - m.b} stroke="var(--s2)" strokeWidth={1} opacity={0.6} />)}
        <line x1={m.l} x2={W - m.r} y1={H - m.b} y2={H - m.b} stroke="var(--axis)" />
        {ymin < 0 && ymax > 0 && <line x1={m.l} x2={W - m.r} y1={ys(0)} y2={ys(0)} stroke="var(--axis)" />}
        {series.map((s, i) => (
          <path key={s.name} d={paths[i]} fill="none" stroke={s.color} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" strokeDasharray={s.dashed ? "4 4" : undefined} />
        ))}
        {hx !== null && (
          <g>
            <line x1={xs(hx)} x2={xs(hx)} y1={m.t} y2={H - m.b} stroke="var(--ink-2)" strokeWidth={1} opacity={0.5} />
            {series.map((s) => {
              const p = s.points[hover!] ?? s.points.find((q) => q[0] >= hx);
              if (!p) return null;
              return <circle key={s.name} cx={xs(p[0])} cy={ys(p[1])} r={4} fill={s.color} stroke="var(--surface)" strokeWidth={2} />;
            })}
          </g>
        )}
        {xLabel && (
          <text x={W - m.r} y={H - 4} fontSize={10} fill="var(--muted)" textAnchor="end">
            {xLabel}
          </text>
        )}
        {yLabel && (
          <text x={4} y={m.t + 2} fontSize={10} fill="var(--muted)" transform={`rotate(-90 4 ${m.t + 2})`} textAnchor="end">
            {yLabel}
          </text>
        )}
      </svg>
      <div className="flex flex-wrap gap-x-4 gap-y-1 px-2 text-[11px]">
        {series.length > 1 &&
          series.map((s) => (
            <span key={s.name} className="inline-flex items-center gap-1.5">
              <span style={{ background: s.color, width: 12, height: 2, display: "inline-block", borderRadius: 1 }} />
              {s.name}
            </span>
          ))}
        {hx !== null && (
          <span className="ml-auto num text-ink-2">
            x = {format(hx)}
            {series.map((s) => {
              const p = s.points[hover!];
              return p ? ` · ${s.name}: ${format(p[1])}` : "";
            })}
          </span>
        )}
      </div>
    </div>
  );
}
