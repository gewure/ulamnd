"use client";
import { useEffect, useRef } from "react";
import type { DiffractionData } from "@/lib/types";

interface Props {
  data: DiffractionData | null;
  side: number;
  size: number;
  onSize: (s: number) => void;
  onRun: () => void;
  busy: boolean;
  disabled: boolean;
}

function FieldCanvas({ values, size, mode }: { values: Float32Array; size: number; mode: "power" | "corr" }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!;
    c.width = size;
    c.height = size;
    const ctx = c.getContext("2d")!;
    const img = ctx.createImageData(size, size);
    let max = 0;
    for (let i = 0; i < values.length; i++) max = Math.max(max, Math.abs(values[i]));
    const h = size >> 1;
    for (let i = 0; i < values.length; i++) {
      const o = i * 4;
      const v = values[i];
      if (mode === "power") {
        // sequential single hue: black -> blue -> white
        const t = Math.pow(Math.max(0, v) / (max || 1), 0.6);
        const r = t < 0.5 ? 13 + (57 - 13) * (t * 2) : 57 + (255 - 57) * ((t - 0.5) * 2);
        const g = t < 0.5 ? 13 + (135 - 13) * (t * 2) : 135 + (255 - 135) * ((t - 0.5) * 2);
        const b = t < 0.5 ? 13 + (229 - 13) * (t * 2) : 229 + (255 - 229) * ((t - 0.5) * 2);
        img.data[o] = r;
        img.data[o + 1] = g;
        img.data[o + 2] = b;
      } else {
        // diverging: blue (negative) - gray - red (positive), origin peak suppressed
        const x = i % size,
          y = (i / size) | 0;
        const vv = x === h && y === h ? 0 : v;
        const t = Math.max(-1, Math.min(1, vv / (0.35 * (max || 1))));
        const g0 = [56, 56, 53];
        const pos = [230, 103, 103],
          neg = [57, 135, 229];
        const tgt = t >= 0 ? pos : neg;
        const a = Math.abs(t);
        img.data[o] = g0[0] + (tgt[0] - g0[0]) * a;
        img.data[o + 1] = g0[1] + (tgt[1] - g0[1]) * a;
        img.data[o + 2] = g0[2] + (tgt[2] - g0[2]) * a;
      }
      img.data[o + 3] = 255;
    }
    ctx.putImageData(img, 0, 0);
  }, [values, size, mode]);
  return <canvas ref={ref} className="w-full" style={{ imageRendering: "pixelated", aspectRatio: "1 / 1" }} />;
}

export default function DiffractionPanel({ data, side, size, onSize, onRun, busy, disabled }: Props) {
  const maxSize = 1 << Math.floor(Math.log2(side));
  const sizes = [64, 128, 256, 512, 1024].filter((s) => s <= maxSize);
  return (
    <div className="h-full overflow-auto p-3 space-y-3">
      <div className="flex items-center gap-3 flex-wrap">
        <span className="label">diffraction (structure factor) of the prime field in the current 2D slice</span>
        <label className="text-[11px] text-muted flex items-center gap-1">
          window
          <select value={Math.min(size, maxSize)} onChange={(e) => onSize(+e.target.value)}>
            {sizes.map((s) => (
              <option key={s} value={s}>
                {s}×{s}
              </option>
            ))}
          </select>
        </label>
        <button className="btn primary" onClick={onRun} disabled={busy || disabled}>
          compute
        </button>
        {data && <span className="text-[11px] text-muted num">{data.primesInWindow.toLocaleString()} primes in the window</span>}
      </div>
      {data && (
        <div className="grid grid-cols-2 gap-3">
          <div className="panel p-2">
            <div className="label mb-1">power spectrum |F(k)|², log scale, origin at centre</div>
            <FieldCanvas values={data.logPower} size={data.size} mode="power" />
          </div>
          <div className="panel p-2">
            <div className="label mb-1">autocorrelation (pair correlation of primes), origin at centre</div>
            <FieldCanvas values={data.autocorr} size={data.size} mode="corr" />
          </div>
          <div className="panel p-2 col-span-2">
            <div className="label mb-1">strongest Bragg-like peaks (frequency in cycles per cell)</div>
            <table className="data">
              <thead>
                <tr>
                  <th>fₓ</th>
                  <th>f_y</th>
                  <th>log₁₀ power</th>
                  <th>reading</th>
                </tr>
              </thead>
              <tbody>
                {data.peaks.slice(0, 12).map((p, i) => (
                  <tr key={i}>
                    <td className="num">{p.fx.toFixed(4)}</td>
                    <td className="num">{p.fy.toFixed(4)}</td>
                    <td className="num">{p.power.toFixed(2)}</td>
                    <td className="text-muted">{interpret(p.fx, p.fy)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <div className="prose text-[12px]">
        <p>
          A crystal has a pure point spectrum on a lattice. A quasicrystal (Penrose tiling) also has sharp Bragg peaks, but arranged with a symmetry that no lattice allows (5- or 10-fold), on a dense set of positions. A
          random field has a flat, diffuse spectrum. The prime field on the spiral is dominated by residue classes modulo small primes: parity gives a checkerboard (peak at (½, ½)), divisibility by 3 and 5 gives further
          rational peaks, while everything else is diffuse. If a 5-fold or 8-fold arrangement of sharp peaks ever appeared here, that would be the quasicrystal signature you are looking for.
        </p>
      </div>
    </div>
  );
}

function interpret(fx: number, fy: number): string {
  const near = (a: number, b: number) => Math.abs(Math.abs(a) - b) < 0.004;
  if (near(fx, 0.5) && near(fy, 0.5)) return "parity checkerboard: n ≡ x + y + 1 (mod 2), all primes > 2 are odd";
  if ((near(fx, 0.5) && near(fy, 0)) || (near(fx, 0) && near(fy, 0.5))) return "period-2 stripes along an axis";
  if (near(fx, 1 / 3) || near(fy, 1 / 3)) return "period-3 structure: residues mod 3";
  if (near(fx, 0.2) || near(fy, 0.2) || near(fx, 0.4) || near(fy, 0.4)) return "period-5 structure: residues mod 5";
  if (near(fx, 0.25) || near(fy, 0.25)) return "period-4 structure";
  return "";
}
