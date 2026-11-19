// Stripe art (reference Vid01): shapes drawn only from vertical stripes. Outer columns carry the
// spectrum, inner columns stay white, and horizontal slices drift slightly out of register.
//
// Markup: <canvas data-stripes="sphere|crescent|wave|pulse" data-cols="34"></canvas>

import { fitCanvas, visibleLoop, reducedMotion, spectrum, mixHex, clamp } from './motion';

type Seg = [number, number];
type ShapeFn = (u: number, t: number) => Seg[];

// u and returned y values are in a square space from -1 to 1, centered on the canvas.
const SHAPES: Record<string, ShapeFn> = {
  sphere(u) {
    const R = 0.78;
    if (Math.abs(u) >= R) return [];
    const h = Math.sqrt(R * R - u * u);
    return [[-h, h]];
  },
  crescent(u, t) {
    const R = 0.78;
    if (Math.abs(u) >= R) return [];
    const h = Math.sqrt(R * R - u * u);
    const cx = 0.42 + Math.sin(t * 0.6) * 0.08;
    const du = u - cx;
    const R2 = 0.7;
    if (Math.abs(du) >= R2) return [[-h, h]];
    const h2 = Math.sqrt(R2 * R2 - du * du);
    const out: Seg[] = [];
    if (-h < -h2) out.push([-h, Math.min(h, -h2)]);
    if (h > h2) out.push([Math.max(-h, h2), h]);
    return out;
  },
  wave(u, t) {
    const center = Math.sin(u * 2.6 + t * 0.9) * 0.34;
    const half = 0.05 + ((u + 1) / 2) * 0.32;
    return [[center - half, center + half]];
  },
  pulse(u, t) {
    const env = Math.pow(Math.cos((u * Math.PI) / 2.1), 1.6);
    const n = Math.abs(Math.sin(u * 9.3 + t * 2.1) * 0.6 + Math.sin(u * 23.7 - t * 3.3) * 0.4);
    const h = 0.06 + env * (0.2 + n * 0.62);
    return [[-h, h]];
  },
};

function extent(shape: string) {
  return shape === 'wave' || shape === 'pulse' ? 1 : 0.78;
}

export function mountStripes(canvas: HTMLCanvasElement) {
  const shapeName = canvas.dataset.stripes || 'sphere';
  const shape = SHAPES[shapeName] || SHAPES.sphere;
  const cols = Number(canvas.dataset.cols || 34);
  const still = reducedMotion();
  const spec = spectrum();
  const white = '#ececea';
  const E = extent(shapeName);
  const t0 = performance.now();

  // Edge color: left edge runs coral → yellow, right edge cyan → blue → violet, middle is white.
  function colorAt(f: number) {
    if (f < 0.1) return mixHex(spec[0], spec[1], f / 0.1);
    if (f < 0.2) return mixHex(spec[1], white, (f - 0.1) / 0.1);
    if (f > 0.9) return mixHex(spec[3], spec[4], (f - 0.9) / 0.1);
    if (f > 0.8) return mixHex(white, spec[2], (f - 0.8) / 0.1);
    return white;
  }

  function draw(now: number) {
    const { ctx, w, h } = fitCanvas(canvas);
    ctx.clearRect(0, 0, w, h);
    const t = still ? 0.6 : (now - t0) / 1000;
    const S = Math.min(w, h) * 0.5;
    const cx = w / 2;
    const cy = h / 2;
    const span = shapeName === 'wave' || shapeName === 'pulse' ? w / 2 / S : 1;
    const slices = 9;
    const glitch = still ? 0 : Math.pow(Math.max(0, Math.sin(t * 0.7)), 12);

    for (let i = 0; i < cols; i++) {
      const f = (i + 0.5) / cols;
      const u = (f * 2 - 1) * span;
      const segs = shape(u, t);
      if (!segs.length) continue;
      const x = cx + u * S;
      const edgeF = clamp((u / (E * span) + 1) / 2);
      ctx.fillStyle = colorAt(shapeName === 'sphere' || shapeName === 'crescent' ? edgeF : f);
      // Stripes are thicker toward the middle, like light falling across a form.
      const base = (w / cols) * 0.32;
      const lw = Math.max(1, base * (0.55 + 0.75 * Math.sqrt(Math.max(0, 1 - Math.pow(u / (E * span), 2)))));
      for (const [y0, y1] of segs) {
        const top = cy + y0 * S;
        const bot = cy + y1 * S;
        const len = bot - top;
        const sh = len / slices;
        for (let s = 0; s < slices; s++) {
          const jitter =
            Math.sin(t * 1.4 + s * 1.9 + i * 0.35) * 1.2 +
            glitch * Math.sin(s * 7.1 + i * 3.3 + t * 30) * 7;
          ctx.fillRect(x - lw / 2 + jitter, top + s * sh, lw, sh + 0.5);
        }
      }
    }
  }

  if (still) {
    draw(t0);
    new ResizeObserver(() => draw(t0)).observe(canvas);
    return;
  }
  visibleLoop(canvas, (now) => { draw(now); return true; });
}

export function mountAllStripes() {
  document.querySelectorAll<HTMLCanvasElement>('canvas[data-stripes]').forEach((c) => {
    if (c.dataset.mounted) return;
    c.dataset.mounted = '1';
    mountStripes(c);
  });
}
