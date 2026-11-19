// Halftone mark (reference Vid00): glyphs drawn as a matrix of tiny triangles inside a squircle,
// morphing from one glyph to the next with a wipe, a horizontal smear and an RGB fringe.
//
// Markup: <canvas data-halftone data-glyphs="AG,code,note,ball" data-mode="cycle|hover|static"
//                 data-grid="56" data-theme="light|dark"></canvas>
// Glyphs: any 1–4 characters, or a named shape: code, note, ball, pin.

import { fitCanvas, visibleLoop, reducedMotion, spectrum, easeInOut, smoothstep, clamp, fontsReady } from './motion';

type Mask = Float32Array;

const HOLD_MS = 2400;
const MORPH_MS = 1100;

function drawShape(g: CanvasRenderingContext2D, glyph: string, N: number) {
  const s = N / 100;
  g.save();
  g.translate(N / 2, N / 2);
  g.scale(s, s);
  g.fillStyle = '#fff';
  g.strokeStyle = '#fff';
  switch (glyph) {
    case 'note': {
      g.beginPath(); g.ellipse(-17, 24, 11, 8, -0.45, 0, Math.PI * 2); g.fill();
      g.beginPath(); g.ellipse(21, 16, 11, 8, -0.45, 0, Math.PI * 2); g.fill();
      g.fillRect(-8.5, -26, 6, 50);
      g.fillRect(29.5, -34, 6, 50);
      g.beginPath(); g.moveTo(-8.5, -26); g.lineTo(35.5, -34); g.lineTo(35.5, -22); g.lineTo(-8.5, -14); g.closePath(); g.fill();
      break;
    }
    case 'ball': {
      // A soccer ball: a disc with a center pentagon, five edge patches and the seams knocked out.
      const pent = (cx: number, cy: number, r: number, rot: number) => {
        g.beginPath();
        for (let i = 0; i < 5; i++) {
          const a = rot + (i * Math.PI * 2) / 5;
          const x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r;
          i ? g.lineTo(x, y) : g.moveTo(x, y);
        }
        g.closePath();
        g.fill();
      };
      g.beginPath(); g.arc(0, 0, 34, 0, Math.PI * 2); g.fill();
      g.save();
      g.beginPath(); g.arc(0, 0, 34, 0, Math.PI * 2); g.clip();
      g.globalCompositeOperation = 'destination-out';
      const up = -Math.PI / 2;
      pent(0, 0, 12.5, up);
      for (let k = 0; k < 5; k++) {
        const a = up + Math.PI / 5 + (k * Math.PI * 2) / 5;
        pent(Math.cos(a) * 33, Math.sin(a) * 33, 12, a + Math.PI);
      }
      g.lineWidth = 3.2;
      for (let k = 0; k < 5; k++) {
        const a = up + (k * Math.PI * 2) / 5;
        g.beginPath();
        g.moveTo(Math.cos(a) * 12, Math.sin(a) * 12);
        g.lineTo(Math.cos(a) * 30, Math.sin(a) * 30);
        g.stroke();
      }
      g.restore();
      g.globalCompositeOperation = 'source-over';
      break;
    }
    case 'pin': {
      g.beginPath();
      g.arc(0, -10, 25, Math.PI * 0.82, Math.PI * 2.18);
      g.lineTo(0, 38);
      g.closePath();
      g.fill();
      g.globalCompositeOperation = 'destination-out';
      g.beginPath(); g.arc(0, -10, 9.5, 0, Math.PI * 2); g.fill();
      g.globalCompositeOperation = 'source-over';
      break;
    }
    default: {
      const mono = glyph === 'code';
      const text = mono ? '</>' : glyph;
      const family = mono ? '"Geist Mono Variable", monospace' : '"Geist Variable", sans-serif';
      g.font = `650 100px ${family}`;
      const m = g.measureText(text);
      const fit = Math.min(64 / (m.width / 100), 50);
      g.font = `650 ${fit}px ${family}`;
      const mm = g.measureText(text);
      g.textAlign = 'center';
      g.textBaseline = 'alphabetic';
      const asc = mm.actualBoundingBoxAscent;
      const desc = mm.actualBoundingBoxDescent;
      g.fillText(text, 0, (asc - desc) / 2);
    }
  }
  g.restore();
}

function glyphMask(glyph: string, N: number): Mask {
  const c = document.createElement('canvas');
  c.width = N; c.height = N;
  const g = c.getContext('2d', { willReadFrequently: true })!;
  g.fillStyle = '#000';
  g.fillRect(0, 0, N, N);
  // A little blur gives graded dot sizes along edges, which is what makes it read as halftone.
  g.filter = `blur(${Math.max(0.4, N * 0.008)}px)`;
  drawShape(g, glyph, N);
  const data = g.getImageData(0, 0, N, N).data;
  const out = new Float32Array(N * N);
  for (let i = 0; i < N * N; i++) out[i] = data[i * 4] / 255;
  return out;
}

function squircleMask(N: number, n = 5): Mask {
  const out = new Float32Array(N * N);
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      const u = Math.abs(((x + 0.5) / N) * 2 - 1) / 0.94;
      const v = Math.abs(((y + 0.5) / N) * 2 - 1) / 0.94;
      out[y * N + x] = smoothstep(1.04, 0.96, Math.pow(u, n) + Math.pow(v, n));
    }
  }
  return out;
}

function squirclePath(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, wobble: number, phase: number, n = 5) {
  const steps = 96;
  ctx.beginPath();
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * Math.PI * 2;
    const ct = Math.cos(t), st = Math.sin(t);
    const rr = r * (1 + wobble * Math.sin(3 * t + phase) * 0.6 + wobble * Math.sin(5 * t - phase * 1.3) * 0.4);
    const x = cx + Math.sign(ct) * Math.pow(Math.abs(ct), 2 / n) * rr;
    const y = cy + Math.sign(st) * Math.pow(Math.abs(st), 2 / n) * rr;
    i ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
  }
  ctx.closePath();
}

interface State { mask: Mask; invert: boolean }

export async function mountHalftone(canvas: HTMLCanvasElement) {
  const glyphs = (canvas.dataset.glyphs || 'AG').split(',').map((s) => s.trim()).filter(Boolean);
  const N = Number(canvas.dataset.grid || 56);
  const dark = canvas.dataset.theme === 'dark';
  const still = reducedMotion();
  const mode = still ? 'static' : (canvas.dataset.mode || 'cycle');

  await fontsReady();

  const sq = squircleMask(N);
  // Alternate solid-glyph and inverted (glyph knocked out of a dotted squircle), as in Vid00.
  const states: State[] =
    mode === 'hover'
      ? [{ mask: glyphMask(glyphs[0], N), invert: false }, { mask: glyphMask(glyphs[0], N), invert: true }]
      : glyphs.map((g, i) => ({ mask: glyphMask(g, N), invert: i % 2 === 1 }));

  const value = (s: State, i: number) => (s.invert ? sq[i] * (1 - s.mask[i]) * 0.92 : s.mask[i] * sq[i]);

  const [coral, , cyan] = spectrum();
  const ink = dark ? '#ececea' : '#111113';
  const plate = dark ? '#18191d' : '#ffffff';

  let from = 0;
  let to = 0;
  let phaseStart = performance.now();
  let morphing = false;
  let dirty = true;
  let wakeTimer = 0;

  function draw(p: number) {
    const { ctx, w, h } = fitCanvas(canvas);
    ctx.clearRect(0, 0, w, h);
    const size = Math.min(w, h);
    const bump = morphing ? Math.sin(Math.PI * p) : 0;
    const k = 1 - 0.035 * bump;
    const S = size * k;
    const ox = (w - S) / 2;
    const oy = (h - S) / 2;
    const cs = S / N;

    ctx.fillStyle = plate;
    squirclePath(ctx, w / 2, h / 2, (S / 2) * 0.94, 0.018 * bump, p * 7);
    ctx.fill();

    const A = states[from];
    const B = states[to];
    const band = N * 0.16;
    const wipe = (-0.2 + p * 1.4) * N;

    const black = new Path2D();
    const red = new Path2D();
    const blue = new Path2D();

    for (let y = 0; y < N; y++) {
      for (let x = 0; x < N; x++) {
        let i = y * N + x;
        let v: number;
        let fringe = 0;
        if (!morphing) {
          v = value(A, i);
        } else {
          const d = (x - wipe) / band;
          const ad = Math.abs(d);
          if (ad < 1) {
            const xs = clamp(Math.round(x + Math.sin(y * 0.9 + p * 22) * band * 0.45 * (1 - ad)), 0, N - 1);
            i = y * N + xs;
            fringe = 1 - ad;
          }
          const m = smoothstep(0.6, -0.6, d);
          v = value(A, i) * (1 - m) + value(B, i) * m;
        }
        if (v < 0.05) continue;
        const side = cs * 1.08 * Math.sqrt(v);
        const th = side * 0.866;
        const cx = ox + (x + 0.5) * cs;
        const cy = oy + (y + 0.5) * cs;
        const tri = (path: Path2D, dx: number) => {
          path.moveTo(cx + dx, cy - th * 0.6);
          path.lineTo(cx + dx - side / 2, cy + th * 0.4);
          path.lineTo(cx + dx + side / 2, cy + th * 0.4);
          path.closePath();
        };
        tri(black, 0);
        if (fringe > 0.12) {
          tri(red, -cs * 0.45 * fringe);
          tri(blue, cs * 0.45 * fringe);
        }
      }
    }
    if (morphing) {
      ctx.globalAlpha = 0.9;
      ctx.fillStyle = coral; ctx.fill(red);
      ctx.fillStyle = cyan; ctx.fill(blue);
      ctx.globalAlpha = 1;
    }
    ctx.fillStyle = ink;
    ctx.fill(black);
  }

  function startMorph(next: number) {
    if (next === to && morphing) return;
    from = morphing ? to : from;
    to = next;
    morphing = true;
    phaseStart = performance.now();
    loop.wake();
  }

  const loop = visibleLoop(canvas, (now) => {
    if (morphing) {
      const p = clamp((now - phaseStart) / MORPH_MS);
      draw(easeInOut(p));
      if (p >= 1) {
        morphing = false;
        from = to;
        phaseStart = now;
        dirty = true;
      }
      return true;
    }
    if (dirty) { draw(0); dirty = false; }
    if (mode === 'cycle' && states.length > 1) {
      const wait = HOLD_MS - (now - phaseStart);
      if (wait <= 0) { startMorph((from + 1) % states.length); return true; }
      clearTimeout(wakeTimer);
      wakeTimer = window.setTimeout(() => loop.wake(), wait);
    }
    return false;
  });

  if (mode === 'hover') {
    const host = canvas.closest('[data-halftone-host]') || canvas;
    host.addEventListener('pointerenter', () => startMorph(1));
    host.addEventListener('pointerleave', () => startMorph(0));
    host.addEventListener('focusin', () => startMorph(1));
    host.addEventListener('focusout', () => startMorph(0));
  }

  new ResizeObserver(() => { dirty = true; loop.wake(); }).observe(canvas);
}

export function mountAllHalftones() {
  document.querySelectorAll<HTMLCanvasElement>('canvas[data-halftone]').forEach((c) => {
    if (c.dataset.mounted) return;
    c.dataset.mounted = '1';
    mountHalftone(c);
  });
}
