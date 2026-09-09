/**
 * Turn thesis/variance.json and thesis/results-full.json (or results.json) into LaTeX macros and
 * tabular bodies, so that every number in paper/main.tex is generated from data.
 *   npx tsx paper/gen-macros.ts
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { toCoords } from "../lib/spiral";
import { sieve, OMEGA_MASK } from "../lib/sieve";

const v = JSON.parse(readFileSync("research/experiments/variance.json", "utf8"));
const rPath = existsSync("research/experiments/results-full.json") ? "research/experiments/results-full.json" : "research/experiments/results.json";
const r = JSON.parse(readFileSync(rPath, "utf8"));
const f = (x: number, k = 2) => (Number.isFinite(x) ? x.toFixed(k) : "--");
const mean = (xs: number[]) => xs.reduce((a, b) => a + b, 0) / Math.max(1, xs.length);
const out: string[] = [];
const mac = (name: string, val: string) => out.push(`\\newcommand{\\${name}}{${val}}`);

type Cell = { family: string; d: number; T: number; n: number; rho: number; phi: number; se: number; phiRandom: number; phiHL: number; seHL: number; kappa: number; kappaC: number; kappaSD: number; obsOverPred: number; meanMu: number };
const cells: Cell[] = v.cells;

// ---- per family/degree summary table (weighted means)
const summaryRows: string[] = [];
const groups = new Map<string, Cell[]>();
for (const c of cells) {
  const key = `${c.family}:${c.d}`;
  if (!groups.has(key)) groups.set(key, []);
  groups.get(key)!.push(c);
}
const wmean = (cs: Cell[], get: (c: Cell) => number, se: (c: Cell) => number) => {
  let sw = 0,
    s = 0;
  for (const c of cs) {
    const w = 1 / Math.max(1e-6, se(c)) ** 2;
    sw += w;
    s += w * get(c);
  }
  return { m: s / sw, se: Math.sqrt(1 / sw) };
};
const order = ["linear:1", "spiral:2", "random:2", "spiral:3", "random:3", "spiral:4", "random:4", "spiral:5", "random:5", "spiral:6", "random:6"];
for (const key of order) {
  const cs = groups.get(key);
  if (!cs) continue;
  const [fam, d] = key.split(":");
  const phi = wmean(cs, (c) => c.phi, (c) => c.se);
  const hl = wmean(cs, (c) => c.phiHL, (c) => Math.max(c.seHL, 0.005));
  const rho = mean(cs.map((c) => c.rho));
  const kap = mean(cs.map((c) => c.kappa));
  const kapC = mean(cs.map((c) => c.kappaC));
  const ctrl = mean(cs.map((c) => c.phiRandom));
  const ratio = mean(cs.map((c) => c.obsOverPred));
  const name = fam === "linear" ? "arith.\\ progressions" : fam === "spiral" ? `spiral, $d=${d}$` : `random, $d=${d}$`;
  summaryRows.push(`${name} & ${cs.length} & ${f(rho, 3)} & ${f(1 - rho, 2)} & $${f(phi.m)} \\pm ${f(phi.se)}$ & $${f(hl.m)} \\pm ${f(hl.se)}$ & ${f(ctrl)} & ${f(kap)} & ${f(kapC)} & ${f(ratio, 3)} \\\\`);
}
writeFileSync("research/paper-I/data/summary-rows.tex", summaryRows.join("\n") + "\n\\bottomrule\n");

// ---- per-cell table for the appendix
const cellRows = cells.map((c) => `${c.family === "linear" ? "AP" : c.family} & ${c.d} & ${c.T} & ${f(c.rho, 3)} & ${f(c.meanMu, 1)} & $${f(c.phi)} \\pm ${f(c.se)}$ & $${f(c.phiHL)} \\pm ${f(c.seHL)}$ & ${f(c.phiRandom)} & ${f(c.kappa)} & ${f(c.obsOverPred, 3)} \\\\`);
writeFileSync("research/paper-I/data/cell-rows.tex", cellRows.join("\n") + "\n\\bottomrule\n");

// ---- scalar macros
const lin = cells.filter((c) => c.family === "linear");
mac("kappaLinMean", f(mean(lin.map((c) => c.kappa)), 3));
mac("kappaLinMin", f(Math.min(...lin.map((c) => c.kappa)), 2));
mac("kappaLinMax", f(Math.max(...lin.map((c) => c.kappa)), 2));
const poly = cells.filter((c) => c.family !== "linear");
mac("kappaPolyMin", f(Math.min(...poly.map((c) => c.kappa)), 2));
mac("kappaPolyMax", f(Math.max(...poly.map((c) => c.kappa)), 2));
mac("kappaSDmax", f(Math.max(...poly.map((c) => c.kappaSD)), 2));
mac("kappaSDmin", f(Math.min(...poly.map((c) => c.kappaSD)), 2));
mac("kappaLinFirst", f(lin[0].kappa, 2));
mac("kappaLinLast", f(lin[lin.length - 1].kappa, 2));
mac("kappaLinTfirst", String(lin[0].T));
mac("kappaLinTlast", String(lin[lin.length - 1].T));
// family means of kappa (C^2 normalisation) over polynomial cells
mac("kappaFamMin", f(Math.min(...order.filter((k) => k !== "linear:1").map((k) => mean((groups.get(k) ?? []).map((c) => c.kappa)))), 2));
mac("kappaFamMax", f(Math.max(...order.filter((k) => k !== "linear:1").map((k) => mean((groups.get(k) ?? []).map((c) => c.kappa)))), 2));
mac("chiHLall", f(v.fit.chi2_vs_HL, 1));
mac("kappaCLinMean", f(mean(lin.map((c) => c.kappaC)), 2));
mac("kappaCFamMin", f(Math.min(...order.filter((k) => k !== "linear:1").map((k) => mean((groups.get(k) ?? []).map((c) => c.kappaC)))), 2));
mac("kappaCFamMax", f(Math.max(...order.filter((k) => k !== "linear:1").map((k) => mean((groups.get(k) ?? []).map((c) => c.kappaC)))), 2));
mac("kappaCPolyMin", f(Math.min(...poly.map((c) => c.kappaC)), 2));
mac("kappaCPolyMax", f(Math.max(...poly.map((c) => c.kappaC)), 2));
mac("nCells", String(cells.length));
mac("nPolyCells", String(poly.length));
mac("ctrlMin", f(Math.min(...cells.map((c) => c.phiRandom))));
mac("ctrlMax", f(Math.max(...cells.map((c) => c.phiRandom))));
mac("ctrlMean", f(mean(cells.map((c) => c.phiRandom)), 3));
mac("obsPredMin", f(Math.min(...cells.map((c) => c.obsOverPred)), 3));
mac("obsPredMax", f(Math.max(...cells.map((c) => c.obsOverPred)), 3));
mac("phiMax", f(Math.max(...poly.map((c) => c.phi))));
mac("phiMin", f(Math.min(...poly.map((c) => c.phi))));
// cells where HL prediction and observation differ by more than 2 sigma
let bad = 0;
const badList: string[] = [];
for (const c of poly) {
  const z = (c.phi - c.phiHL) / Math.sqrt(c.se ** 2 + c.seHL ** 2);
  if (Math.abs(z) > 2) {
    bad++;
    badList.push(`${c.family} $d=${c.d}$, $T=${c.T}$ ($${f(z, 1)}\\sigma$)`);
  }
}
mac("nBadHL", String(bad));
mac("badHLList", badList.join("; "));
// d=2 large T cells where HL prediction is unphysical (< 0.05)
mac("nUnphysical", String(poly.filter((c) => c.phiHL < 0.05).length));
const d2 = poly.filter((c) => c.d === 2);
mac("phiTwoMin", f(Math.min(...d2.map((c) => c.phi))));
mac("phiTwoMax", f(Math.max(...d2.map((c) => c.phi))));
mac("rhoTwo", f(mean(d2.map((c) => c.rho)), 2));
const dge3 = poly.filter((c) => c.d >= 3);
let chiHL3 = 0;
for (const c of dge3) chiHL3 += ((c.phi - c.phiHL) / Math.sqrt(c.se ** 2 + c.seHL ** 2)) ** 2;
mac("chiHLdge", f(chiHL3, 1));
mac("nDge", String(dge3.length));
let chiHLlin = 0;
for (const c of lin) chiHLlin += ((c.phi - c.phiHL) / Math.sqrt(c.se ** 2 + c.seHL ** 2)) ** 2;
mac("chiHLlin", f(chiHLlin, 1));
mac("nLin", String(lin.length));
let chiOneRho3 = 0;
for (const c of dge3) chiOneRho3 += ((c.phi - (1 - c.rho)) / c.se) ** 2;
mac("chiOneRhoDge", f(chiOneRho3, 1));

// ---- thesis suite numbers (T1..T3)
const t1 = r.t1 as Record<string, { rays: number; found: number; degreeOk: number; leadOk: number; verifiedOk: number }>;
let rays = 0,
  ok = 0;
for (const d of Object.keys(t1)) {
  rays += t1[d].rays;
  ok += Math.min(t1[d].degreeOk, t1[d].leadOk, t1[d].verifiedOk);
}
mac("tOneRays", rays.toLocaleString("en"));
mac("tOneOk", ok.toLocaleString("en"));
const t2 = r.t2 as Record<string, { rays: number; T: number; sumA: number; sumP: number; ratioBH: number; ratioNaive: number; phiBH: number; phiNaive: number; phiRandom: number }>;
const t2rows = Object.keys(t2).map((d) => {
  const c = t2[d];
  return `${d} & ${c.rays} & ${c.T} & ${c.sumA.toLocaleString("en")} & $${f(c.ratioBH, 3)} \\pm ${f(1 / Math.sqrt(c.sumP), 3)}$ & ${f(c.ratioNaive, 2)} & ${f(c.phiBH)} & ${f(c.phiNaive, 1)} & ${f(c.phiRandom)} \\\\`;
});
writeFileSync("research/paper-I/data/t2-rows.tex", t2rows.join("\n") + "\n\\bottomrule\n");
const t3 = r.t3 as Record<string, { R: number; N: number; rays: number; meanL: number; Ebar: number; phiNaive: number; phiPred: number; phiBH: number; sePhi: number; varC: number; ratioBH: number; fixedRays: number; fixedWithPrimes: number }>;
const t3rows = Object.keys(t3).map((d) => {
  const c = t3[d];
  return `${d} & ${c.R} & ${c.N.toLocaleString("en")} & ${c.rays} & ${f(c.meanL, 1)} & ${f(c.Ebar)} & ${f(c.phiNaive)} & ${f(c.phiPred)} & $${f(c.phiBH)} \\pm ${f(c.sePhi)}$ & ${f(c.ratioBH, 3)} & ${c.fixedRays} (${c.fixedWithPrimes}) \\\\`;
});
writeFileSync("research/paper-I/data/t3-rows.tex", t3rows.join("\n") + "\n\\bottomrule\n");
// combined spiral table: main term beyond the box (t2) and inside the box (t3)
const spiralRows = Object.keys(t2).map((d) => {
  const a = t2[d];
  const b = t3[d];
  return `${d} & ${a.rays} & ${a.T} & $${f(a.ratioBH, 3)} \\pm ${f(1 / Math.sqrt(a.sumP), 3)}$ & ${f(a.ratioNaive, 2)} & ${b ? b.rays : "--"} & ${b ? f(b.phiNaive) : "--"} & ${b ? f(b.phiPred) : "--"} & ${b ? `$${f(b.phiBH)} \\pm ${f(b.sePhi)}$` : "--"} \\\\`;
});
writeFileSync("research/paper-I/data/spiral-rows.tex", spiralRows.join("\n") + "\n\\bottomrule\n");
mac("targetN", Number(r.targetN).toLocaleString("en"));
mac("tThreeTwoNaive", f(t3["2"].phiNaive, 1));
mac("tThreeTwoPred", f(t3["2"].phiPred, 1));
mac("tThreeTwoBH", f(t3["2"].phiBH));
mac("tThreeFixed", String(Object.values(t3).reduce((a, c) => a + c.fixedRays, 0)));
const t4 = r.t4 as Record<string, { fixedFrac: number; meanC: number; varC: number; cv: number }>;
const t4rows = Object.keys(t4).map((d) => `${d} & ${f(t4[d].fixedFrac)} & ${f(t4[d].meanC)} & ${f(t4[d].varC)} & ${f(t4[d].cv)} \\\\`);
writeFileSync("research/paper-I/data/t4-rows.tex", t4rows.join("\n") + "\n\\bottomrule\n");
const t7 = r.t7 as Record<string, { peaks: { rx: string; ry: string }[]; peakPower: number; maxErr: number }>;
const t7rows = Object.keys(t7).map((k) => `${k.replace(/x₃/g, "$x_3$").replace(/=/g, " = ")} & ${f(t7[k].peakPower * 100, 1)}\\% & ${f(t7[k].maxErr)} & ${t7[k].peaks.slice(0, 4).map((p) => `$(${p.rx}, ${p.ry})$`).join(", ").replace(/\//g, "/")} \\\\`);
writeFileSync("research/paper-I/data/t7-rows.tex", t7rows.join("\n") + "\n\\bottomrule\n");
const t8 = r.t8 as { N: number; maxPi: number; maxPsi: number; maxM: number; slope: number };
mac("tEightN", t8.N.toLocaleString("en"));
mac("tEightPi", f(t8.maxPi, 3));
mac("tEightPsi", f(t8.maxPsi, 3));
mac("tEightM", f(t8.maxM, 3));
mac("tEightSlope", f(t8.slope, 3));

// ---- Ulam spiral picture data (101x101) and a 3D slice
{
  const R = 50,
    N = (2 * R + 1) ** 2;
  const sv = sieve(N);
  const c = [0, 0];
  const rows: string[] = ["x y"];
  for (let n = 2; n <= N; n++) {
    if ((sv.data[n] & OMEGA_MASK) !== 1) continue;
    toCoords(n, 2, c);
    rows.push(`${c[0]} ${c[1]}`);
  }
  writeFileSync("research/paper-I/data/ulam101.dat", rows.join("\n") + "\n");
}

writeFileSync("research/paper-I/data/macros.tex", out.join("\n") + "\n");
console.log(`wrote macros (${out.length}), ${summaryRows.length} summary rows, ${cellRows.length} cell rows, thesis rows from ${rPath}`);

// ---- growth of the pair-correlation sum (thesis/sumS.json)
if (existsSync("research/experiments/sumS.json")) {
  const S = JSON.parse(readFileSync("research/experiments/sumS.json", "utf8")) as { H: number; P: number; CHECK: number[]; recs: { family: string; d: number; poly: string; C: number; full: number[]; diag: number[]; slope: number; slopePrev: number; slopeDiag: number }[] };
  const recs = S.recs;
  const sdv = (xs: number[]) => Math.sqrt(mean(xs.map((x) => (x - mean(xs)) ** 2)));
  const rows: string[] = [];
  const groups: [string, string, (r: (typeof recs)[0]) => boolean][] = [
    ["arith.\\ progressions", "1", (r) => r.family === "linear"],
    ["quadratics (spiral)", "2", (r) => r.family === "spiral" && r.d === 2],
    ["quadratics (random)", "2", (r) => r.family === "random" && r.d === 2],
    ["cubics (spiral)", "3", (r) => r.family === "spiral" && r.d === 3],
    ["cubics (random)", "3", (r) => r.family === "random" && r.d === 3],
    ["quartics (spiral)", "4", (r) => r.family === "spiral" && r.d === 4],
    ["quartics (random)", "4", (r) => r.family === "random" && r.d === 4],
  ];
  const allPoly = recs.filter((r) => r.family !== "linear");
  for (const [name, d, sel] of groups) {
    const rs = recs.filter(sel);
    if (!rs.length) continue;
    const sC = rs.map((r) => r.slope / r.C),
      sC2 = rs.map((r) => r.slope / (r.C * r.C)),
      sPrev = rs.map((r) => r.slopePrev / r.C),
      A = rs.map((r) => (r.full[6] + 0.5 * r.C * Math.log(1e5)) / r.C);
    rows.push(`${name} & ${d} & ${rs.length} & ${f(mean(rs.map((r) => r.C)))} & $${f(mean(sPrev))} \\pm ${f(sdv(sPrev))}$ & $${f(mean(sC))} \\pm ${f(sdv(sC))}$ & $${f(mean(sC2))} \\pm ${f(sdv(sC2))}$ & $${f(mean(A))} \\pm ${f(sdv(A))}$ \\\\`);
  }
  writeFileSync("research/paper-I/data/sums-rows.tex", rows.join("\n") + "\n\\bottomrule\n");
  const lin = recs.filter((r) => r.family === "linear");
  mac("sumsLinSlopeC", f(mean(lin.map((r) => r.slope / r.C))));
  mac("sumsLinSlopeCsd", f(sdv(lin.map((r) => r.slope / r.C))));
  mac("sumsLinSlopeCC", f(mean(lin.map((r) => r.slope / (r.C * r.C)))));
  mac("sumsLinSlopeCCsd", f(sdv(lin.map((r) => r.slope / (r.C * r.C)))));
  mac("sumsPolySlopeC", f(mean(allPoly.map((r) => r.slope / r.C))));
  mac("sumsPolySlopeCsd", f(sdv(allPoly.map((r) => r.slope / r.C))));
  mac("sumsPolySlopeCse", f(sdv(allPoly.map((r) => r.slope / r.C)) / Math.sqrt(allPoly.length)));
  mac("sumsPolySlopeCC", f(mean(allPoly.map((r) => r.slope / (r.C * r.C)))));
  mac("sumsPolySlopeCCsd", f(sdv(allPoly.map((r) => r.slope / (r.C * r.C)))));
  mac("sumsPolyN", String(allPoly.length));
  mac("sumsLinN", String(lin.length));
  mac("sumsN", String(recs.length));
  mac("sumsP", S.P.toLocaleString("en"));
  // correlation of slope/C and slope/C^2 with C over polynomials
  const corr = (xs: number[], ys: number[]) => {
    const mx = mean(xs),
      my = mean(ys);
    return mean(xs.map((x, i) => (x - mx) * (ys[i] - my))) / (sdv(xs) * sdv(ys));
  };
  mac("sumsCorrC", f(corr(allPoly.map((r) => r.C), allPoly.map((r) => r.slope / r.C))));
  mac("sumsCorrCC", f(corr(allPoly.map((r) => r.C), allPoly.map((r) => r.slope / (r.C * r.C)))));
  // A_f/C over polynomials
  const Af = allPoly.map((r) => (r.full[6] + 0.5 * r.C * Math.log(1e5)) / r.C);
  mac("sumsAmean", f(mean(Af)));
  mac("sumsAsd", f(sdv(Af)));
  // curves for the named polynomials: Σ(H)/C against H
  const named = recs.filter((r) => r.family === "named");
  const lines = ["H " + named.map((_, i) => `p${i}`).join(" ") + " ref"];
  S.CHECK.forEach((Hc, j) => {
    lines.push(`${Hc} ${named.map((r) => f(r.full[j] / r.C, 4)).join(" ")} ${f(-0.5 * Math.log(Hc), 4)}`);
  });
  writeFileSync("research/paper-I/data/sums-curves.dat", lines.join("\n") + "\n");
  writeFileSync("research/paper-I/data/sums-named.tex", named.map((r) => `$${r.poly.replace(/\^(\d)/g, "^{$1}")}$ ($C=${f(r.C)}$)`).join("; ") + "\n");
  mac("sumsNamedLegend", named.map((r) => `$${r.poly.replace(/\^(\d)/g, "^{$1}")}$`).join(", "));
  writeFileSync("research/paper-I/data/macros.tex", out.join("\n") + "\n");
  console.log(`sumS: ${recs.length} polynomials`);
}

// ---- off-diagonal isolation for quadratics (thesis/offdiag.json)
if (existsSync("research/experiments/offdiag.json")) {
  const O = JSON.parse(readFileSync("research/experiments/offdiag.json", "utf8")) as { CHECK: number[]; DMAX: number; P_S: number; recs: { poly: string; C: number; sums: number[]; diag: number[]; off: number[]; ref: number[] }[] };
  const n = O.CHECK.length;
  const offLast = O.recs.map((r) => r.off[n - 1]);
  const offMid = O.recs.map((r) => r.off[2]);
  const sdv = (xs: number[]) => Math.sqrt(mean(xs.map((x) => (x - mean(xs)) ** 2)));
  mac("offN", String(O.recs.length));
  mac("offDmax", O.DMAX.toLocaleString("en"));
  mac("offMeanLow", f(mean(offMid)));
  mac("offMeanHigh", f(mean(offLast)));
  mac("offSdHigh", f(sdv(offLast)));
  mac("offMaxAbsHigh", f(Math.max(...offLast.map(Math.abs))));
  // growth of the diagonal part between 1e3 and 1e5 in units of (1/2C) log H, and of the full sum
  mac("offDiagGrowth", f(mean(O.recs.map((r) => (r.diag[n - 1] - r.diag[2]) / (r.ref[n - 1] - r.ref[2])))));
  mac("offSumGrowth", f(mean(O.recs.map((r) => -(r.sums[n - 1] - r.sums[2]) / (r.ref[n - 1] - r.ref[2])))));
  mac("offOffGrowth", f(mean(O.recs.map((r) => (r.off[n - 1] - r.off[2]) / (r.ref[n - 1] - r.ref[2])))));
  // table rows for the named quadratics (first 7 records)
  const rows = O.recs.slice(0, 7).map((r) => `$${r.poly.replace(/\^(\d)/g, "^{$1}")}$ & ${f(r.C)} & ${f(r.sums[2])} & ${f(r.sums[n - 1])} & ${f(-r.diag[2])} & ${f(-r.diag[n - 1])} & ${f(r.off[2])} & ${f(r.off[n - 1])} \\\\`);
  writeFileSync("research/paper-I/data/off-rows.tex", rows.join("\n") + "\n\\bottomrule\n");
  writeFileSync("research/paper-I/data/macros.tex", out.join("\n") + "\n");
  console.log(`offdiag: ${O.recs.length} quadratics`);
}

// ---- Riesz-mean spectrum for t^2+1 (thesis/riesz.json) and Galois test (thesis/galois.json)
if (existsSync("research/experiments/riesz.json")) {
  const Rz = JSON.parse(readFileSync("research/experiments/riesz.json", "utf8")) as { X: number; C: number; Lzeros: number[]; Zzeros: number[]; resolution: number; matches2: { om: number; power: number; src: string; v: number; dist: number }[]; peaks1: { om: number; p: number }[] };
  mac("rieszX", Rz.X.toLocaleString("en"));
  mac("rieszRes", f(Rz.resolution));
  mac("rieszLone", f(Rz.Lzeros[0], 4));
  mac("rieszLtwo", f(Rz.Lzeros[1], 4));
  mac("rieszLthree", f(Rz.Lzeros[2], 4));
  const top = Rz.matches2.slice(0, 10);
  const rows = top.map((m, i) => `${i + 1} & ${f(m.om)} & ${m.power.toExponential(2).replace("e", "\\cdot10^{").replace(/\+?(-?\d+)\}$/, "$1}")} & $${m.src === "L" ? "L(s,\\chi_{-4})" : "\\zeta"}$ & ${f(m.v)} & ${f(m.dist)} \\\\`);
  writeFileSync("research/paper-I/data/riesz-rows.tex", rows.join("\n") + "\n\\bottomrule\n");
  // vertical marker files for the spectrum figure
  const sp = readFileSync("research/paper-I/data/riesz-spectrum.dat", "utf8").trim().split("\n").slice(1).map((l) => l.split(" ").map(Number));
  const pmax = Math.max(...sp.map((r) => r[2]));
  writeFileSync("research/paper-I/data/riesz-lines-L.dat", "om h\n" + Rz.Lzeros.filter((g) => g / 2 <= 25).map((g) => `${(g / 2).toFixed(4)} ${pmax.toExponential(4)}`).join("\n") + "\n");
  writeFileSync("research/paper-I/data/riesz-lines-Z.dat", "om h\n" + Rz.Zzeros.filter((g) => g / 2 <= 25).map((g) => `${(g / 2).toFixed(4)} ${pmax.toExponential(4)}`).join("\n") + "\n");
  // how many of the top-10 peaks lie within 0.25 of a predicted frequency, and the chance level
  const within = top.filter((m) => m.dist <= 0.25).length;
  mac("rieszWithin", String(within));
  const nPred = Rz.Lzeros.filter((g) => g / 2 <= 25).length + Rz.Zzeros.filter((g) => g / 2 <= 25).length;
  mac("rieszChance", f((nPred * 0.5) / 24.5, 2));
  mac("rieszNpred", String(nPred));
  console.log(`riesz: ${top.length} peaks, ${within} within 0.25`);
}
writeFileSync("research/paper-I/data/macros.tex", out.join("\n") + "\n");

// ---- diagonal-only spectrum (thesis/rieszd.json), matched filter (thesis/riesz-fit.json), Galois test (thesis/galois.json)
if (existsSync("research/experiments/rieszd.json")) {
  const D = JSON.parse(readFileSync("research/experiments/rieszd.json", "utf8")) as { X: number; resolution: number; an2: { meanZL: number; meanZZ: number; meanZR: number; sdZR: number; seL: number; seZ: number; nL: number; nZ: number }; matches: { om: number; power: number; src: string; v: number; dist: number }[] };
  mac("rdX", D.X.toLocaleString("en"));
  mac("rdRes", f(D.resolution));
  mac("rdZL", f(D.an2.meanZL));
  mac("rdZZ", f(D.an2.meanZZ));
  mac("rdZR", f(D.an2.meanZR));
  mac("rdZRsd", f(D.an2.sdZR));
  mac("rdSeL", f(D.an2.seL));
  const rows = D.matches.slice(0, 8).map((m, i) => `${i + 1} & ${f(m.om)} & $${m.src === "L" ? "L(s,\\chi_{-4})" : "\\zeta"}$ & ${f(m.v)} & ${f(m.dist)} \\\\`);
  writeFileSync("research/paper-I/data/rieszd-rows.tex", rows.join("\n") + "\n\\bottomrule\n");
  mac("rdTopWithin", String(D.matches.slice(0, 5).filter((m) => m.dist <= 0.15).length));
}
if (existsSync("research/experiments/riesz-fit.json")) {
  const Fj = JSON.parse(readFileSync("research/experiments/riesz-fit.json", "utf8")) as { nL: number; nZ: number; r2pred: number; r2L: number; r2Z: number; controls: { delta: number; r2: number }[]; randomMean: number; randomP95: number; randomMax: number; pValue: number };
  mac("mfNL", String(Fj.nL));
  mac("mfNZ", String(Fj.nZ));
  mac("mfRpred", f(100 * Fj.r2pred, 1));
  mac("mfRL", f(100 * Fj.r2L, 1));
  mac("mfRZ", f(100 * Fj.r2Z, 1));
  mac("mfRctrlMean", f(100 * mean(Fj.controls.map((c) => c.r2)), 1));
  mac("mfRctrlMax", f(100 * Math.max(...Fj.controls.map((c) => c.r2)), 1));
  mac("mfRrandMean", f(100 * Fj.randomMean, 1));
  mac("mfRrandNinetyFive", f(100 * Fj.randomP95, 1));
  mac("mfPvalue", f(Fj.pValue, 3));
}
if (existsSync("research/experiments/galois.json")) {
  const G = JSON.parse(readFileSync("research/experiments/galois.json", "utf8")) as { group: string; r: number; C: number; slopeC: number }[];
  const sdv = (xs: number[]) => Math.sqrt(mean(xs.map((x) => (x - mean(xs)) ** 2)));
  const two = G.filter((g) => g.r === 2).map((g) => g.slopeC), non = G.filter((g) => g.r >= 3).map((g) => g.slopeC);
  mac("galTwoMean", f(mean(two))); mac("galTwoSd", f(sdv(two))); mac("galTwoN", String(two.length));
  mac("galNonMean", f(mean(non))); mac("galNonSd", f(sdv(non))); mac("galNonN", String(non.length));
}
// ---- exact C-versus-C² test for quadratics via the closed formula (thesis/exact.json)
if (existsSync("research/experiments/exact.json")) {
  const X = JSON.parse(readFileSync("research/experiments/exact.json", "utf8")) as {
    H: number;
    validation: { maxDev: number; C: number; Ctrunc: number }[];
    fit: { n: number; Cmin: number; Cmax: number; alpha: number; seAlpha: number; k: number; seK: number; alphaLog: number; seAlphaLog: number; kLog: number; sigmaFrom1: number; sigmaFrom2: number; corrC: number; corrC2: number; meanSlopeC: number; sdSlopeC: number; meanSlopeC2: number; sdSlopeC2: number; decade: { mean: number; sd: number }[] };
    recs: { name: string; C: number; sums: number[]; slope: number }[];
  };
  const F = X.fit;
  mac("exN", String(F.n));
  mac("exCmin", f(F.Cmin));
  mac("exCmax", f(F.Cmax));
  // headline: least squares on log(−slope) against log C (equal relative weights); the unweighted fit is reported alongside
  mac("exAlpha", f(F.alphaLog));
  mac("exAlphaSe", f(F.seAlphaLog));
  mac("exK", f(F.kLog));
  mac("exSigmaOne", f(Math.abs(F.alphaLog - 1) / F.seAlphaLog, 1));
  mac("exSigmaTwo", f(Math.abs(F.alphaLog - 2) / F.seAlphaLog, 1));
  mac("exAlphaLin", f(F.alpha));
  mac("exAlphaLinSe", f(F.seAlpha));
  mac("exKLin", f(F.k));
  mac("exKLinSe", f(F.seK));
  mac("exSigmaOneLin", f(Math.abs(F.sigmaFrom1), 1));
  mac("exSigmaTwoLin", f(Math.abs(F.sigmaFrom2), 1));
  mac("exSigmaTwoMin", f(Math.min(Math.abs(F.sigmaFrom2), Math.abs(F.alphaLog - 2) / F.seAlphaLog), 0));
  mac("exCorrC", f(F.corrC));
  mac("exCorrCC", f(F.corrC2));
  mac("exSlopeC", f(F.meanSlopeC));
  mac("exSlopeCsd", f(F.sdSlopeC));
  mac("exSlopeCse", f(F.sdSlopeC / Math.sqrt(F.n)));
  mac("exSlopeCC", f(F.meanSlopeC2));
  mac("exSlopeCCsd", f(F.sdSlopeC2));
  mac("exDecA", f(F.decade[0].mean));
  mac("exDecB", f(F.decade[1].mean));
  mac("exDecC", f(F.decade[2].mean));
  mac("exDecAsd", f(F.decade[0].sd));
  mac("exDecBsd", f(F.decade[1].sd));
  mac("exDecCsd", f(F.decade[2].sd));
  mac("exRatioSpread", Math.max(...X.validation.map((v) => v.maxDev)).toExponential(0).replace("e-", "\\cdot10^{-").replace(/(\d)$/, "$1}"));
  mac("exFracHalf", f(-F.meanSlopeC / 0.5, 2));
  mac("exKone", f(-F.meanSlopeC));
  mac("exKtwo", f(-F.meanSlopeC2));
  console.log(`exact: ${F.n} quadratics, alpha = ${f(F.alpha)} ± ${f(F.seAlpha)}`);
}
// ---- function-field computation (thesis/ff.json): identity with full weights and the off-diagonal remainder Off_f(N)
const Dname = (D: string) =>
  D.split(",")
    .map((c, i) => (c === "0" ? "" : i === 0 ? c : i === 1 ? (c === "1" ? "u" : c + "u") : (c === "1" ? "" : c) + `u^${i}`))
    .filter(Boolean)
    .reverse()
    .join("+");
if (existsSync("research/experiments/ff.json")) {
  const FF = JSON.parse(readFileSync("research/experiments/ff.json", "utf8")) as { q: number; D: string; C: number; P1: number; rows: { N: number; count: number; lhs: number; diag: number; diagTail: number; constTerm: number; off: number }[] }[];
  const rows: string[] = [];
  let offMax = 0,
    swing = 0;
  for (const r of FF) {
    if (r.rows.some((row) => row.off === undefined)) continue;
    r.rows.forEach((row, i) => {
      const inc = i === 0 ? "--" : f(row.diag - r.rows[i - 1].diag, 3);
      rows.push(`${i === 0 ? `${r.q} & $${Dname(r.D)}$ & ${f(r.C, 3)} & ${f(1 - r.P1, 3)}` : " & & &"} & ${row.N} & ${row.count} & ${f(row.lhs, 3)} & ${f(row.diag, 3)} & ${inc} & ${f(row.diagTail, 3)} & ${f(row.off, 3)} \\\\`);
      offMax = Math.max(offMax, Math.abs(row.off));
    });
    const offs = r.rows.map((x) => x.off);
    swing = Math.max(swing, Math.max(...offs) - Math.min(...offs));
    rows.push("\\addlinespace");
  }
  rows.pop();
  writeFileSync("research/paper-I/data/ff-rows.tex", rows.join("\n") + "\n\\bottomrule\n");
  mac("ffCases", String(FF.length));
  mac("ffNmax", String(Math.max(...FF.map((r) => r.rows.length))));
  mac("ffOffMax", f(offMax, 2));
  mac("ffOffSwing", f(swing, 2));
  console.log(`ff: ${FF.length} cases, max |Off| = ${f(offMax, 3)}`);
}
// ---- finite-support decomposition of Off_f(N) (thesis/ff-tail.json)
if (existsSync("research/experiments/ff-tail.json")) {
  const FT = JSON.parse(readFileSync("research/experiments/ff-tail.json", "utf8")) as { q: number; D: string; rows: { N: number; M: number; nD: number; Tact: number; TactBrute: number; Texp: number; offDirect: number; offLHS: number }[] }[];
  const rows: string[] = [];
  let maxDev = 0,
    maxBrute = 0,
    nBrute = 0;
  for (const r of FT) {
    r.rows.forEach((row, i) => {
      rows.push(`${i === 0 ? `${r.q} & $${Dname(r.D)}$` : " &"} & ${row.N} & ${row.M} & ${row.nD} & ${f(row.Tact, 4)} & ${f(row.Texp, 4)} & ${f(row.offDirect, 4)} & ${f(row.offLHS, 4)} \\\\`);
      maxDev = Math.max(maxDev, Math.abs(row.offDirect - row.offLHS));
      if (Number.isFinite(row.TactBrute)) {
        nBrute++;
        maxBrute = Math.max(maxBrute, Math.abs(row.TactBrute - row.Tact));
      }
    });
    rows.push("\\addlinespace");
  }
  rows.pop();
  writeFileSync("research/paper-I/data/fftail-rows.tex", rows.join("\n") + "\n\\bottomrule\n");
  const sci = (x: number) => (x === 0 ? "0" : x.toExponential(0).replace("e-", "\\cdot10^{-").replace(/(\d)$/, "$1}"));
  mac("fftailMaxDev", sci(maxDev));
  mac("fftailBruteN", String(nBrute));
  mac("fftailBruteDev", sci(maxBrute));
  console.log(`ff-tail: ${FT.length} cases, max |Off(direct) − Off(LHS)| = ${maxDev.toExponential(2)}, brute-force checks ${nBrute}, max dev ${maxBrute.toExponential(2)}`);
}
writeFileSync("research/paper-I/data/macros.tex", out.join("\n") + "\n");
