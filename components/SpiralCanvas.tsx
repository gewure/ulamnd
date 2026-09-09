"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { NOT_SQUAREFREE, OMEGA_MASK, TWIN } from "@/lib/sieve";

export type ColorMode = "prime" | "twin" | "omega" | "mobius" | "residue";

export interface Overlay {
  x0: number;
  y0: number;
  dx: number;
  dy: number;
  len: number;
  color: string;
  width?: number;
}

interface Props {
  slice: Uint8Array | null;
  side: number;
  R: number;
  N: number;
  colorMode: ColorMode;
  residueMod: number;
  nOf: (x: number, y: number) => number;
  selected: [number, number] | null;
  onSelect: (x: number, y: number) => void;
  overlays: Overlay[];
  axisLabels: [string, string];
}

const PALETTE = ["#3987e5", "#d95926", "#199e70", "#c98500", "#d55181", "#008300", "#9085e9", "#e66767"];
function hex(c: string): [number, number, number] {
  return [parseInt(c.slice(1, 3), 16), parseInt(c.slice(3, 5), 16), parseInt(c.slice(5, 7), 16)];
}
const PAL = PALETTE.map(hex);
const BG: [number, number, number] = [13, 13, 13];
const CELL: [number, number, number] = [22, 22, 21];
const PRIME: [number, number, number] = [242, 240, 232];
const GRAY: [number, number, number] = [110, 110, 105];
const S2 = hex("#d95926");

interface View {
  cx: number;
  cy: number;
  scale: number;
}

export default function SpiralCanvas({ slice, side, R, N, colorMode, residueMod, nOf, selected, onSelect, overlays, axisLabels }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<View>({ cx: 0, cy: 0, scale: 1 });
  const [viewState, setViewState] = useState<View>(viewRef.current);
  const [hover, setHover] = useState<[number, number] | null>(null);
  const [size, setSize] = useState<[number, number]>([800, 600]);
  const imgRef = useRef<ImageData | null>(null);

  // prime-count mip levels for zoomed-out density rendering
  const mips = useMemo(() => {
    if (!slice) return [];
    const out: { B: number; w: number; data: Uint16Array }[] = [];
    let prevW = side;
    let prev: Uint8Array | Uint16Array = slice;
    for (let L = 1; L <= 7; L++) {
      const w = Math.ceil(prevW / 2);
      const data = new Uint16Array(w * w);
      for (let y = 0; y < prevW; y++) {
        const ty = y >> 1;
        for (let x = 0; x < prevW; x++) {
          const v = L === 1 ? ((prev[y * prevW + x] & OMEGA_MASK) === 1 ? 1 : 0) : prev[y * prevW + x];
          data[ty * w + (x >> 1)] += v;
        }
      }
      out.push({ B: 1 << L, w, data });
      prev = data;
      prevW = w;
      if (w <= 2) break;
    }
    return out;
  }, [slice, side]);

  // fit on new slice
  useEffect(() => {
    const [W, H] = size;
    const s = Math.min(W, H) / side;
    viewRef.current = { cx: 0, cy: 0, scale: s };
    setViewState({ ...viewRef.current });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slice, side]);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const r = el.getBoundingClientRect();
      setSize([Math.max(100, Math.floor(r.width)), Math.max(100, Math.floor(r.height))]);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const [W, H] = size;
    if (canvas.width !== W || canvas.height !== H) {
      canvas.width = W;
      canvas.height = H;
      imgRef.current = null;
    }
    const ctx = canvas.getContext("2d")!;
    if (!slice) {
      ctx.fillStyle = "#0d0d0d";
      ctx.fillRect(0, 0, W, H);
      return;
    }
    const { cx, cy, scale } = viewRef.current;
    if (!imgRef.current) imgRef.current = ctx.createImageData(W, H);
    const img = imgRef.current;
    const px = img.data;
    const lnN = Math.log(N);
    const densScale = lnN / 1.6;
    const useDensity = scale < 1;
    let level = 0;
    if (useDensity) level = Math.min(mips.length, Math.max(1, Math.floor(Math.log2(1 / scale))));
    const mip = level > 0 ? mips[level - 1] : null;
    const B = mip ? mip.B : 1;
    const invB2 = 1 / (B * B);
    const colX = new Int32Array(W);
    for (let i = 0; i < W; i++) colX[i] = Math.round(cx + (i - W / 2) / scale);
    const showResidue = colorMode === "residue" && !useDensity;
    for (let j = 0; j < H; j++) {
      const y = Math.round(cy - (j - H / 2) / scale);
      const rowOk = y >= -R && y <= R;
      const rowBase = (y + R) * side;
      let o = j * W * 4;
      for (let i = 0; i < W; i++, o += 4) {
        const x = colX[i];
        let r = BG[0],
          g = BG[1],
          b = BG[2];
        if (rowOk && x >= -R && x <= R) {
          if (mip) {
            const c = mip.data[((y + R) >> level) * mip.w + ((x + R) >> level)];
            let t = c * invB2 * densScale;
            if (t > 1) t = 1;
            t = Math.sqrt(t);
            const base = colorMode === "twin" || colorMode === "residue" ? PRIME : colorMode === "mobius" ? PAL[0] : PRIME;
            r = CELL[0] + (base[0] - CELL[0]) * t;
            g = CELL[1] + (base[1] - CELL[1]) * t;
            b = CELL[2] + (base[2] - CELL[2]) * t;
          } else {
            const v = slice[rowBase + x + R];
            const om = v & OMEGA_MASK;
            const isP = om === 1;
            let col: [number, number, number] = CELL;
            switch (colorMode) {
              case "prime":
                col = isP ? PRIME : CELL;
                break;
              case "twin":
                col = isP ? (v & TWIN ? S2 : GRAY) : CELL;
                break;
              case "omega":
                col = om === 0 ? CELL : om === 1 ? PRIME : PAL[Math.min(om - 2, 7)];
                break;
              case "mobius":
                col = v & NOT_SQUAREFREE ? CELL : om % 2 === 0 ? PAL[0] : PAL[1];
                break;
              case "residue": {
                if (showResidue) {
                  const n = nOf(x, y);
                  const rr = n % residueMod;
                  const p = PAL[rr % 8];
                  col = isP ? p : [CELL[0] + (p[0] - CELL[0]) * 0.22, CELL[1] + (p[1] - CELL[1]) * 0.22, CELL[2] + (p[2] - CELL[2]) * 0.22];
                } else col = isP ? PRIME : CELL;
                break;
              }
            }
            r = col[0];
            g = col[1];
            b = col[2];
          }
        }
        px[o] = r;
        px[o + 1] = g;
        px[o + 2] = b;
        px[o + 3] = 255;
      }
    }
    ctx.putImageData(img, 0, 0);

    const sx = (x: number) => W / 2 + (x - cx) * scale;
    const sy = (y: number) => H / 2 - (y - cy) * scale;

    // grid lines when zoomed in
    if (scale >= 12) {
      ctx.strokeStyle = "rgba(255,255,255,0.06)";
      ctx.lineWidth = 1;
      const x0 = Math.floor(cx - W / 2 / scale),
        x1 = Math.ceil(cx + W / 2 / scale);
      const y0 = Math.floor(cy - H / 2 / scale),
        y1 = Math.ceil(cy + H / 2 / scale);
      ctx.beginPath();
      for (let x = x0; x <= x1; x++) {
        const X = Math.round(sx(x - 0.5)) + 0.5;
        ctx.moveTo(X, 0);
        ctx.lineTo(X, H);
      }
      for (let y = y0; y <= y1; y++) {
        const Y = Math.round(sy(y - 0.5)) + 0.5;
        ctx.moveTo(0, Y);
        ctx.lineTo(W, Y);
      }
      ctx.stroke();
      if (scale >= 30) {
        ctx.font = `${Math.min(13, scale / 3.2)}px ui-monospace, monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        for (let y = Math.max(y0, -R); y <= Math.min(y1, R); y++)
          for (let x = Math.max(x0, -R); x <= Math.min(x1, R); x++) {
            const v = slice[(y + R) * side + x + R];
            ctx.fillStyle = (v & OMEGA_MASK) === 1 ? "#111" : "#8a8a85";
            ctx.fillText(String(nOf(x, y)), sx(x), sy(y));
          }
      }
    }
    // axes through origin
    ctx.strokeStyle = "rgba(57,135,229,0.25)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(sx(-R - 0.5), sy(0));
    ctx.lineTo(sx(R + 0.5), sy(0));
    ctx.moveTo(sx(0), sy(-R - 0.5));
    ctx.lineTo(sx(0), sy(R + 0.5));
    ctx.stroke();
    // box boundary
    ctx.strokeStyle = "rgba(255,255,255,0.18)";
    ctx.strokeRect(sx(-R - 0.5), sy(R + 0.5), (2 * R + 1) * scale, (2 * R + 1) * scale);

    for (const ov of overlays) {
      ctx.strokeStyle = ov.color;
      ctx.lineWidth = ov.width ?? 1.5;
      ctx.beginPath();
      ctx.moveTo(sx(ov.x0), sy(ov.y0));
      ctx.lineTo(sx(ov.x0 + ov.dx * (ov.len - 1)), sy(ov.y0 + ov.dy * (ov.len - 1)));
      ctx.stroke();
    }
    if (selected) {
      const s = Math.max(scale, 6);
      ctx.strokeStyle = "#d95926";
      ctx.lineWidth = 2;
      ctx.strokeRect(sx(selected[0]) - s / 2, sy(selected[1]) - s / 2, s, s);
    }
    if (hover) {
      const s = Math.max(scale, 4);
      ctx.strokeStyle = "rgba(255,255,255,0.6)";
      ctx.lineWidth = 1;
      ctx.strokeRect(sx(hover[0]) - s / 2, sy(hover[1]) - s / 2, s, s);
    }
  }, [slice, side, R, N, colorMode, residueMod, nOf, selected, overlays, mips, size, hover]);

  useEffect(() => {
    const id = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(id);
  }, [draw, viewState]);

  const toCell = (e: React.PointerEvent | React.WheelEvent): [number, number] => {
    const rect = canvasRef.current!.getBoundingClientRect();
    const { cx, cy, scale } = viewRef.current;
    const [W, H] = size;
    const px = e.clientX - rect.left,
      py = e.clientY - rect.top;
    return [Math.round(cx + (px - W / 2) / scale), Math.round(cy - (py - H / 2) / scale)];
  };

  const drag = useRef<{ x: number; y: number; cx: number; cy: number; moved: boolean } | null>(null);

  const onPointerDown = (e: React.PointerEvent) => {
    (e.target as Element).setPointerCapture(e.pointerId);
    drag.current = { x: e.clientX, y: e.clientY, cx: viewRef.current.cx, cy: viewRef.current.cy, moved: false };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (drag.current && e.buttons) {
      const d = drag.current;
      const dx = e.clientX - d.x,
        dy = e.clientY - d.y;
      if (Math.abs(dx) + Math.abs(dy) > 3) d.moved = true;
      const s = viewRef.current.scale;
      viewRef.current = { ...viewRef.current, cx: d.cx - dx / s, cy: d.cy + dy / s };
      setViewState({ ...viewRef.current });
    } else {
      const c = toCell(e);
      if (!hover || hover[0] !== c[0] || hover[1] !== c[1]) setHover(c);
    }
  };
  const onPointerUp = (e: React.PointerEvent) => {
    const d = drag.current;
    drag.current = null;
    if (d && !d.moved) {
      const [x, y] = toCell(e);
      if (Math.abs(x) <= R && Math.abs(y) <= R) onSelect(x, y);
    }
  };
  const onWheel = (e: React.WheelEvent) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    const [W, H] = size;
    const v = viewRef.current;
    const px = e.clientX - rect.left - W / 2,
      py = e.clientY - rect.top - H / 2;
    const factor = Math.pow(1.0015, -e.deltaY);
    const ns = Math.min(80, Math.max(0.02, v.scale * factor));
    // keep the cell under the cursor fixed
    const wx = v.cx + px / v.scale,
      wy = v.cy - py / v.scale;
    viewRef.current = { cx: wx - px / ns, cy: wy + py / ns, scale: ns };
    setViewState({ ...viewRef.current });
  };

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const prevent = (e: WheelEvent) => e.preventDefault();
    el.addEventListener("wheel", prevent, { passive: false });
    return () => el.removeEventListener("wheel", prevent);
  }, []);

  const setView = (v: Partial<View>) => {
    viewRef.current = { ...viewRef.current, ...v };
    setViewState({ ...viewRef.current });
  };
  const fit = () => {
    const [W, H] = size;
    setView({ cx: 0, cy: 0, scale: Math.min(W, H) / side });
  };

  const hoverN = hover && Math.abs(hover[0]) <= R && Math.abs(hover[1]) <= R ? nOf(hover[0], hover[1]) : null;
  const hoverByte = hoverN !== null && slice ? slice[(hover![1] + R) * side + hover![0] + R] : 0;

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 px-2 py-1 text-[11px] text-muted border-b border-white/10">
        <span>
          axes {axisLabels[0]} → , {axisLabels[1]} ↑
        </span>
        <span className="num">zoom {viewState.scale >= 1 ? viewState.scale.toFixed(1) + " px/cell" : (1 / viewState.scale).toFixed(1) + " cells/px"}</span>
        <button className="btn" onClick={fit}>
          fit
        </button>
        <button className="btn" onClick={() => setView({ cx: 0, cy: 0, scale: 40 })}>
          centre
        </button>
        {selected && (
          <button className="btn" onClick={() => setView({ cx: selected[0], cy: selected[1], scale: Math.max(viewState.scale, 12) })}>
            go to selected
          </button>
        )}
        <span className="ml-auto num">
          {hoverN !== null && hover ? (
            <>
              ({hover[0]}, {hover[1]}) n = {hoverN.toLocaleString()} {(hoverByte & OMEGA_MASK) === 1 ? "· prime" : hoverN > 1 ? `· Ω=${hoverByte & OMEGA_MASK}` : ""}
            </>
          ) : (
            "scroll to zoom · drag to pan · click a cell to analyse its lines"
          )}
        </span>
      </div>
      <div ref={wrapRef} className="flex-1 min-h-0 relative select-none" style={{ cursor: "crosshair" }}>
        <canvas
          ref={canvasRef}
          className="absolute inset-0"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={() => setHover(null)}
          onWheel={onWheel}
        />
      </div>
    </div>
  );
}
