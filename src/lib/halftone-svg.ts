// Build-time halftone (no JavaScript in the browser), used where a page must stay tiny: /lost.
// Produces the same triangle-dot look as src/scripts/halftone.ts.

type Inside = (x: number, y: number) => boolean; // x, y in a 100×100 box centered on 0

export const SHAPES: Record<string, Inside> = {
  pin(x, y) {
    const dx = x, dy = y + 10;
    const d = Math.hypot(dx, dy);
    if (d <= 9.5) return false;
    if (d <= 25) return true;
    if (y > -10 && y <= 38) return Math.abs(x) <= (25 * (38 - y)) / 48;
    return false;
  },
};

function superellipse(cx: number, cy: number, r: number, n = 5, steps = 96) {
  const pts: string[] = [];
  for (let i = 0; i < steps; i++) {
    const t = (i / steps) * Math.PI * 2;
    const ct = Math.cos(t), st = Math.sin(t);
    const x = cx + Math.sign(ct) * Math.pow(Math.abs(ct), 2 / n) * r;
    const y = cy + Math.sign(st) * Math.pow(Math.abs(st), 2 / n) * r;
    pts.push(`${x.toFixed(2)} ${y.toFixed(2)}`);
  }
  return `M${pts.join('L')}Z`;
}

/** Returns an SVG string: a white squircle with the shape drawn as triangles. */
export function halftoneSvg(shape: keyof typeof SHAPES, { grid = 30, ink = '#111113', plate = '#ffffff' } = {}) {
  const inside = SHAPES[shape];
  const size = 200;
  const cell = size / grid;
  const sub = 4;
  const tris: string[] = [];
  for (let gy = 0; gy < grid; gy++) {
    for (let gx = 0; gx < grid; gx++) {
      // Coverage by supersampling gives graded dot sizes along the edges.
      let hit = 0;
      for (let sy = 0; sy < sub; sy++) {
        for (let sx = 0; sx < sub; sx++) {
          const px = ((gx + (sx + 0.5) / sub) / grid) * 100 - 50;
          const py = ((gy + (sy + 0.5) / sub) / grid) * 100 - 50;
          if (inside(px / 0.62, py / 0.62)) hit++;
        }
      }
      const v = hit / (sub * sub);
      if (v < 0.06) continue;
      const side = cell * 1.08 * Math.sqrt(v);
      const th = side * 0.866;
      const cx = (gx + 0.5) * cell;
      const cy = (gy + 0.5) * cell;
      tris.push(
        `M${(cx).toFixed(1)} ${(cy - th * 0.6).toFixed(1)}L${(cx - side / 2).toFixed(1)} ${(cy + th * 0.4).toFixed(1)}L${(cx + side / 2).toFixed(1)} ${(cy + th * 0.4).toFixed(1)}Z`,
      );
    }
  }
  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path fill="${plate}" d="${superellipse(100, 100, 94)}"/><path fill="${ink}" d="${tris.join('')}"/></svg>`;
}
