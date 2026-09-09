"use client";

interface Props {
  /** counts per bin */
  bins: number[];
  /** bin edges: lo, hi (bins are equal width) */
  lo: number;
  hi: number;
  color?: string;
  height?: number;
  /** overlay a standard normal density scaled to the histogram's total */
  normal?: boolean;
  title?: string;
}

/** Small histogram with an optional standard-normal reference curve. */
export default function Histogram({ bins, lo, hi, color = "var(--s1)", height = 120, normal, title }: Props) {
  const W = 320,
    H = height;
  const m = { l: 8, r: 8, t: 16, b: 18 };
  const total = bins.reduce((a, b) => a + b, 0) || 1;
  const width = (hi - lo) / bins.length;
  const maxC = Math.max(1, ...bins);
  const xs = (x: number) => m.l + ((x - lo) / (hi - lo)) * (W - m.l - m.r);
  const ys = (c: number) => m.t + (1 - c / maxC) * (H - m.t - m.b);
  let curve = "";
  if (normal) {
    for (let i = 0; i <= 100; i++) {
      const x = lo + ((hi - lo) * i) / 100;
      const dens = (Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI)) * total * width;
      curve += (i ? "L" : "M") + xs(x).toFixed(1) + "," + ys(dens).toFixed(1);
    }
  }
  const bw = (W - m.l - m.r) / bins.length;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height }}>
      {title && (
        <text x={m.l} y={10} fontSize={10} fill="var(--muted)">
          {title}
        </text>
      )}
      {bins.map((c, i) => (
        <rect key={i} x={m.l + i * bw + 0.5} y={ys(c)} width={Math.max(0.5, bw - 1)} height={H - m.b - ys(c)} fill={color} opacity={0.85} />
      ))}
      {normal && <path d={curve} fill="none" stroke="var(--ink-2)" strokeWidth={1.5} strokeDasharray="3 3" />}
      <line x1={m.l} x2={W - m.r} y1={H - m.b} y2={H - m.b} stroke="var(--axis)" />
      {[lo, (lo + hi) / 2, hi].map((v) => (
        <text key={v} x={xs(v)} y={H - 5} fontSize={9} fill="var(--muted)" textAnchor={v === lo ? "start" : v === hi ? "end" : "middle"} className="num">
          {v}
        </text>
      ))}
    </svg>
  );
}
