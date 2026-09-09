"use client";
import { useEffect, useRef, useState } from "react";
import type { CloudData } from "@/lib/types";

interface Props {
  cloud: CloudData | null;
  R: number;
  N: number;
  /** value along the third cloud axis where the current 2D slice sits (highlighted in orange) */
  layer: number | null;
  axisLabels: [string, string, string];
}

const VS = `
attribute vec3 aPos;
attribute float aT;
attribute float aHi;
uniform mat4 uMVP;
uniform float uSize;
varying float vT;
varying float vHi;
varying float vDepth;
void main() {
  vec4 p = uMVP * vec4(aPos, 1.0);
  gl_Position = p;
  gl_PointSize = uSize * (aHi > 0.5 ? 1.6 : 1.0);
  vT = aT;
  vHi = aHi;
  vDepth = p.z;
}`;
const FS = `
precision mediump float;
varying float vT;
varying float vHi;
varying float vDepth;
void main() {
  vec2 c = gl_PointCoord - vec2(0.5);
  if (dot(c, c) > 0.25) discard;
  vec3 near = vec3(0.95, 0.94, 0.90);
  vec3 far = vec3(0.22, 0.53, 0.90);
  vec3 col = mix(far, near, vT);
  if (vHi > 0.5) col = vec3(0.85, 0.35, 0.15);
  float fade = clamp(0.35 + 0.65 * (0.5 - vDepth * 0.5), 0.25, 1.0);
  gl_FragColor = vec4(col * fade, 1.0);
}`;

function mat4Mul(a: Float32Array, b: Float32Array): Float32Array {
  const o = new Float32Array(16);
  for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) for (let k = 0; k < 4; k++) o[c * 4 + r] += a[k * 4 + r] * b[c * 4 + k];
  return o;
}
function rotX(a: number): Float32Array {
  const c = Math.cos(a),
    s = Math.sin(a);
  return new Float32Array([1, 0, 0, 0, 0, c, s, 0, 0, -s, c, 0, 0, 0, 0, 1]);
}
function rotY(a: number): Float32Array {
  const c = Math.cos(a),
    s = Math.sin(a);
  return new Float32Array([c, 0, -s, 0, 0, 1, 0, 0, s, 0, c, 0, 0, 0, 0, 1]);
}
function scale(sx: number, sy: number, sz: number): Float32Array {
  return new Float32Array([sx, 0, 0, 0, 0, sy, 0, 0, 0, 0, sz, 0, 0, 0, 0, 1]);
}
function translate(x: number, y: number, z: number): Float32Array {
  return new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, x, y, z, 1]);
}

export default function PointCloud({ cloud, R, N, layer, axisLabels }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const glRef = useRef<{ gl: WebGLRenderingContext; prog: WebGLProgram; bufPos: WebGLBuffer; bufT: WebGLBuffer; bufHi: WebGLBuffer; count: number } | null>(null);
  const view = useRef({ yaw: 0.6, pitch: 0.4, zoom: 1, panX: 0, panY: 0 });
  const [pointSize, setPointSize] = useState(3);
  const [, force] = useState(0);
  const [slab, setSlab] = useState(1); // fraction of the depth range shown
  const renderRef = useRef<() => void>(() => {});

  useEffect(() => {
    const canvas = canvasRef.current!;
    const gl = canvas.getContext("webgl", { antialias: false, preserveDrawingBuffer: false });
    if (!gl) return;
    const mk = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, mk(gl.VERTEX_SHADER, VS));
    gl.attachShader(prog, mk(gl.FRAGMENT_SHADER, FS));
    gl.linkProgram(prog);
    glRef.current = { gl, prog, bufPos: gl.createBuffer()!, bufT: gl.createBuffer()!, bufHi: gl.createBuffer()!, count: 0 };
    return () => {
      // do not lose the context here: React (dev) re-runs effects on the same canvas
      glRef.current = null;
    };
  }, []);

  // upload data
  useEffect(() => {
    const g = glRef.current;
    if (!g) return;
    const { gl } = g;
    if (!cloud) {
      g.count = 0;
      return;
    }
    const count = cloud.count;
    const pos = new Float32Array(count * 3);
    const t = new Float32Array(count);
    const hi = new Float32Array(count);
    let kept = 0;
    const zLimit = slab * (R + 0.5);
    for (let i = 0; i < count; i++) {
      const z = cloud.pos[i * 3 + 2];
      if (Math.abs(z) > zLimit) continue;
      pos[kept * 3] = cloud.pos[i * 3];
      pos[kept * 3 + 1] = cloud.pos[i * 3 + 1];
      pos[kept * 3 + 2] = z;
      t[kept] = Math.log(cloud.n[i]) / Math.log(N);
      hi[kept] = layer !== null && z === layer ? 1 : 0;
      kept++;
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, g.bufPos);
    gl.bufferData(gl.ARRAY_BUFFER, pos.subarray(0, kept * 3), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, g.bufT);
    gl.bufferData(gl.ARRAY_BUFFER, t.subarray(0, kept), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, g.bufHi);
    gl.bufferData(gl.ARRAY_BUFFER, hi.subarray(0, kept), gl.STATIC_DRAW);
    g.count = kept;
    requestAnimationFrame(() => renderRef.current());
  }, [cloud, layer, N, R, slab]);

  const render = () => {
    const g = glRef.current;
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!g || !canvas || !wrap) return;
    const { gl, prog } = g;
    const W = Math.floor(wrap.clientWidth),
      H = Math.floor(wrap.clientHeight);
    if (canvas.width !== W || canvas.height !== H) {
      canvas.width = W;
      canvas.height = H;
    }
    gl.viewport(0, 0, W, H);
    gl.clearColor(0.05, 0.05, 0.05, 1);
    gl.enable(gl.DEPTH_TEST);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    if (!g.count) return;
    gl.useProgram(prog);
    const v = view.current;
    const s = (0.8 * v.zoom) / (R + 1);
    const aspect = W / H;
    let M = scale(s / (aspect > 1 ? aspect : 1), s * (aspect < 1 ? aspect : 1), s * 0.5);
    M = mat4Mul(M, rotX(v.pitch));
    M = mat4Mul(M, rotY(v.yaw));
    M = mat4Mul(translate(v.panX, v.panY, 0), M);
    gl.uniformMatrix4fv(gl.getUniformLocation(prog, "uMVP"), false, M);
    gl.uniform1f(gl.getUniformLocation(prog, "uSize"), pointSize * Math.max(0.5, Math.min(3, v.zoom)));
    const bind = (buf: WebGLBuffer, name: string, size: number) => {
      const loc = gl.getAttribLocation(prog, name);
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, size, gl.FLOAT, false, 0, 0);
    };
    bind(g.bufPos, "aPos", 3);
    bind(g.bufT, "aT", 1);
    bind(g.bufHi, "aHi", 1);
    gl.drawArrays(gl.POINTS, 0, g.count);
  };

  useEffect(() => {
    renderRef.current = render;
    const id = requestAnimationFrame(render);
    return () => cancelAnimationFrame(id);
  });

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => force((x) => x + 1));
    ro.observe(el);
    const prevent = (e: WheelEvent) => e.preventDefault();
    el.addEventListener("wheel", prevent, { passive: false });
    return () => {
      ro.disconnect();
      el.removeEventListener("wheel", prevent);
    };
  }, []);

  const drag = useRef<{ x: number; y: number; shift: boolean } | null>(null);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 px-2 py-1 text-[11px] text-muted border-b border-white/10">
        <span>
          axes {axisLabels[0]} →, {axisLabels[1]} ↑, {axisLabels[2]} depth
        </span>
        <span className="num">{cloud ? `${cloud.count.toLocaleString()} primes` : "no data"}</span>
        <label className="flex items-center gap-1">
          point size
          <input type="range" min={1} max={8} step={0.5} value={pointSize} onChange={(e) => setPointSize(+e.target.value)} style={{ width: 80 }} />
        </label>
        <label className="flex items-center gap-1">
          depth slab
          <input type="range" min={0.02} max={1} step={0.02} value={slab} onChange={(e) => setSlab(+e.target.value)} style={{ width: 80 }} />
        </label>
        <button
          className="btn"
          onClick={() => {
            view.current = { yaw: 0.6, pitch: 0.4, zoom: 1, panX: 0, panY: 0 };
            force((x) => x + 1);
          }}
        >
          reset
        </button>
        <span className="ml-auto">drag to rotate · shift-drag to pan · scroll to zoom · orange = the 2D slice layer</span>
      </div>
      <div ref={wrapRef} className="flex-1 min-h-0 relative select-none" style={{ cursor: "grab" }}>
        <canvas
          ref={canvasRef}
          className="absolute inset-0"
          onPointerDown={(e) => {
            (e.target as Element).setPointerCapture(e.pointerId);
            drag.current = { x: e.clientX, y: e.clientY, shift: e.shiftKey };
          }}
          onPointerMove={(e) => {
            const d = drag.current;
            if (!d || !e.buttons) return;
            const dx = e.clientX - d.x,
              dy = e.clientY - d.y;
            d.x = e.clientX;
            d.y = e.clientY;
            const v = view.current;
            if (d.shift) {
              v.panX += (dx / (wrapRef.current?.clientWidth ?? 800)) * 2;
              v.panY -= (dy / (wrapRef.current?.clientHeight ?? 600)) * 2;
            } else {
              v.yaw += dx * 0.008;
              v.pitch = Math.max(-1.55, Math.min(1.55, v.pitch + dy * 0.008));
            }
            force((x) => x + 1);
          }}
          onPointerUp={() => (drag.current = null)}
          onWheel={(e) => {
            view.current.zoom = Math.max(0.2, Math.min(40, view.current.zoom * Math.pow(1.0015, -e.deltaY)));
            force((x) => x + 1);
          }}
        />
      </div>
    </div>
  );
}
