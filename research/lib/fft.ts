/** In-place iterative radix-2 complex FFT on separate re/im arrays. */
export function fft1d(re: Float64Array, im: Float64Array, inverse = false): void {
  const n = re.length;
  for (let i = 1, j = 0; i < n; i++) {
    let bit = n >> 1;
    for (; j & bit; bit >>= 1) j ^= bit;
    j ^= bit;
    if (i < j) {
      let t = re[i];
      re[i] = re[j];
      re[j] = t;
      t = im[i];
      im[i] = im[j];
      im[j] = t;
    }
  }
  for (let len = 2; len <= n; len <<= 1) {
    const ang = ((inverse ? 2 : -2) * Math.PI) / len;
    const wr = Math.cos(ang),
      wi = Math.sin(ang);
    for (let i = 0; i < n; i += len) {
      let cr = 1,
        ci = 0;
      for (let j = 0; j < len / 2; j++) {
        const a = i + j,
          b = i + j + len / 2;
        const tr = re[b] * cr - im[b] * ci;
        const ti = re[b] * ci + im[b] * cr;
        re[b] = re[a] - tr;
        im[b] = im[a] - ti;
        re[a] += tr;
        im[a] += ti;
        const ncr = cr * wr - ci * wi;
        ci = cr * wi + ci * wr;
        cr = ncr;
      }
    }
  }
  if (inverse) {
    for (let i = 0; i < n; i++) {
      re[i] /= n;
      im[i] /= n;
    }
  }
}

/** In-place 2D FFT of an s×s array (s a power of two). */
export function fft2d(re: Float64Array, im: Float64Array, s: number, inverse = false): void {
  const rowR = new Float64Array(s),
    rowI = new Float64Array(s);
  for (let y = 0; y < s; y++) {
    rowR.set(re.subarray(y * s, (y + 1) * s));
    rowI.set(im.subarray(y * s, (y + 1) * s));
    fft1d(rowR, rowI, inverse);
    re.set(rowR, y * s);
    im.set(rowI, y * s);
  }
  for (let x = 0; x < s; x++) {
    for (let y = 0; y < s; y++) {
      rowR[y] = re[y * s + x];
      rowI[y] = im[y * s + x];
    }
    fft1d(rowR, rowI, inverse);
    for (let y = 0; y < s; y++) {
      re[y * s + x] = rowR[y];
      im[y * s + x] = rowI[y];
    }
  }
}

export interface Diffraction {
  size: number;
  /** log10(1 + |F|^2), origin shifted to the centre */
  logPower: Float32Array;
  /** normalised autocorrelation, origin shifted to centre, in [-1, 1] */
  autocorr: Float32Array;
  maxLogPower: number;
  /** strongest peaks (excluding the origin): frequency in cycles per cell */
  peaks: { fx: number; fy: number; power: number }[];
}

/** Diffraction (power spectrum) and autocorrelation of a binary s×s field. */
export function diffraction(field: Uint8Array, s: number): Diffraction {
  const n = s * s;
  const re = new Float64Array(n),
    im = new Float64Array(n);
  let mean = 0;
  for (let i = 0; i < n; i++) mean += field[i];
  mean /= n;
  for (let i = 0; i < n; i++) re[i] = field[i] - mean;
  fft2d(re, im, s);
  const power = new Float64Array(n);
  for (let i = 0; i < n; i++) power[i] = re[i] * re[i] + im[i] * im[i];
  // autocorrelation = IFFT(power)
  const ar = Float64Array.from(power),
    ai = new Float64Array(n);
  fft2d(ar, ai, s, true);
  const norm = ar[0] || 1;
  const logPower = new Float32Array(n);
  const autocorr = new Float32Array(n);
  let maxLogPower = 0;
  const h = s >> 1;
  const peaks: { fx: number; fy: number; power: number }[] = [];
  for (let y = 0; y < s; y++) {
    for (let x = 0; x < s; x++) {
      const sx = (x + h) % s,
        sy = (y + h) % s; // shift origin to centre
      const lp = Math.log10(1 + power[y * s + x]);
      logPower[sy * s + sx] = lp;
      if (lp > maxLogPower) maxLogPower = lp;
      autocorr[sy * s + sx] = ar[y * s + x] / norm;
    }
  }
  // peaks: local maxima of power away from the origin
  for (let y = 0; y < s; y++) {
    for (let x = 0; x < s; x++) {
      if (x === h && y === h) continue;
      const v = logPower[y * s + x];
      if (v < 0.5 * maxLogPower) continue;
      let isMax = true;
      for (let dy = -1; dy <= 1 && isMax; dy++)
        for (let dx = -1; dx <= 1; dx++) {
          if (!dx && !dy) continue;
          if (logPower[((y + dy + s) % s) * s + ((x + dx + s) % s)] > v) {
            isMax = false;
            break;
          }
        }
      if (isMax) peaks.push({ fx: (x - h) / s, fy: (y - h) / s, power: v });
    }
  }
  peaks.sort((a, b) => b.power - a.power);
  return { size: s, logPower, autocorr, maxLogPower, peaks: peaks.slice(0, 24) };
}
