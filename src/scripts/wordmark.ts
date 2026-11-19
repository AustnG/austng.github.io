// Kinetic wordmark (reference Vid02): the name decodes from scrambled glyphs while rising out of
// vertical bars, letter-spacing breathes, and every few seconds (or under the pointer) the letters
// collapse back into bars and rebuild. The real <h1> text stays in the DOM for screen readers,
// search and selection; the canvas only paints over it.
//
// Markup: see components/Wordmark.astro

import { fitCanvas, visibleLoop, reducedMotion, spectrum, clamp, lerp, easeOut, fontsReady } from './motion';

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/<>#%&';
const DECODE_MS = 1300;
const PULSE_EVERY_MS = 6500;
const PULSE_MS = 1300;

interface Char { ch: string; x: number; w: number; line: number }
interface Line { top: number; bottom: number; baseline: number; left: number; right: number; first: number; last: number }

const rand = (s: string) => s[Math.floor(Math.random() * s.length)];

export async function mountWordmark(root: HTMLElement) {
  if (reducedMotion()) return;
  const h1 = root.querySelector<HTMLElement>('[data-wordmark-text]');
  const canvas = root.querySelector<HTMLCanvasElement>('canvas');
  if (!h1 || !canvas) return;

  await fontsReady();

  const spec = spectrum();
  const off = document.createElement('canvas');
  const octx = off.getContext('2d')!;

  let chars: Char[] = [];
  let lines: Line[] = [];
  let font = '';
  let fontSize = 100;

  function measure() {
    const cr = canvas!.getBoundingClientRect();
    const cs = getComputedStyle(h1!);
    fontSize = parseFloat(cs.fontSize);
    font = `${cs.fontWeight} ${fontSize}px ${cs.fontFamily}`;
    octx.font = font;
    const fm = octx.measureText('AUSTIN');
    const asc = fm.fontBoundingBoxAscent ?? fontSize * 0.9;
    const desc = fm.fontBoundingBoxDescent ?? fontSize * 0.25;

    // Collect every character box, then group them into visual rows. On desktop the words share
    // one row (spectrum on the outer ends only); on phones each word is its own row.
    const boxes: { ch: string; x: number; w: number; top: number; bottom: number }[] = [];
    h1!.querySelectorAll<HTMLElement>('[data-line]').forEach((span) => {
      const node = span.firstChild;
      if (!node || node.nodeType !== Node.TEXT_NODE) return;
      const text = node.textContent || '';
      const range = document.createRange();
      for (let i = 0; i < text.length; i++) {
        range.setStart(node, i);
        range.setEnd(node, i + 1);
        const r = range.getBoundingClientRect();
        if (!r.width) continue;
        boxes.push({ ch: text[i], x: r.left - cr.left, w: r.width, top: r.top - cr.top, bottom: r.bottom - cr.top });
      }
    });

    chars = [];
    lines = [];
    for (const b of boxes) {
      let line = lines[lines.length - 1];
      if (!line || Math.abs(b.top - line.top) > fontSize * 0.4) {
        line = { top: b.top, bottom: b.bottom, baseline: 0, left: b.x, right: b.x + b.w, first: chars.length, last: chars.length };
        lines.push(line);
      }
      line.bottom = Math.max(line.bottom, b.bottom);
      line.left = Math.min(line.left, b.x);
      line.right = Math.max(line.right, b.x + b.w);
      line.last = chars.length;
      chars.push({ ch: b.ch, x: b.x, w: b.w, line: lines.length - 1 });
    }
    for (const line of lines) {
      const boxH = line.bottom - line.top;
      line.baseline = line.top + asc * (boxH / (asc + desc));
    }
  }

  // Per-character display state for the decode effect.
  let shown: string[] = [];
  let lastScramble = 0;
  const t0 = performance.now();
  let pulseStart = t0 + DECODE_MS + PULSE_EVERY_MS * 0.5;
  let gaps: number[] = [];
  const newGaps = () => {
    let acc = 0;
    gaps = chars.map(() => (acc += Math.random() < 0.3 ? Math.random() : 0));
  };

  let pointerX = -1;
  let hover = 0;
  let hoverTarget = 0;

  root.addEventListener('pointermove', (e) => {
    const r = canvas.getBoundingClientRect();
    pointerX = e.clientX - r.left;
    hoverTarget = e.pointerType === 'mouse' ? 1 : 0;
  });
  root.addEventListener('pointerleave', () => { hoverTarget = 0; });
  root.addEventListener('pointerdown', (e) => {
    if (e.pointerType !== 'mouse') { pulseStart = performance.now(); newGaps(); }
  });

  function frame(now: number) {
    const { ctx, w, h, dpr } = fitCanvas(canvas!);
    if (off.width !== canvas!.width || off.height !== canvas!.height) {
      off.width = canvas!.width;
      off.height = canvas!.height;
    }
    const t = now - t0;

    // Global collapse: starts as bars and resolves during the decode, then pulses on a timer.
    let collapse = 0;
    let spread = 0;
    if (t < DECODE_MS) {
      collapse = 1 - easeOut(clamp(t / (DECODE_MS * 0.8)));
    }
    if (now > pulseStart + PULSE_MS) {
      pulseStart = now + PULSE_EVERY_MS;
      newGaps();
    }
    if (now >= pulseStart) {
      const p = (now - pulseStart) / PULSE_MS;
      const env = Math.pow(Math.sin(Math.PI * clamp(p)), 0.8);
      collapse = Math.max(collapse, env);
      spread = env;
    }
    hover = lerp(hover, hoverTarget, 0.12);

    // Decode: unresolved characters flicker through random glyphs, resolving left to right.
    if (shown.length !== chars.length) { shown = chars.map((c) => c.ch); newGaps(); }
    if (now - lastScramble > 55) {
      lastScramble = now;
      chars.forEach((c, i) => {
        const settleAt = 250 + (i / Math.max(1, chars.length - 1)) * (DECODE_MS - 450);
        const scrambling = t < settleAt || (spread > 0.75 && Math.random() < 0.25);
        shown[i] = scrambling && c.ch !== ' ' ? rand(GLYPHS) : c.ch;
      });
    }

    // Paint letters to the offscreen canvas, with breathing letter-spacing.
    octx.setTransform(dpr, 0, 0, dpr, 0, 0);
    octx.clearRect(0, 0, w, h);
    octx.font = font;
    octx.textBaseline = 'alphabetic';
    const breathe = (Math.sin(now / 1000 * (Math.PI * 2) / 7) * 0.5 + 0.5) * fontSize * 0.018;
    for (const line of lines) {
      const lw = line.right - line.left;
      const grad = octx.createLinearGradient(line.left, 0, line.right, 0);
      grad.addColorStop(0, spec[0]);
      grad.addColorStop(Math.min(0.07, 30 / lw), spec[1]);
      grad.addColorStop(Math.min(0.14, 60 / lw), '#ececea');
      grad.addColorStop(Math.max(0.86, 1 - 60 / lw), '#ececea');
      grad.addColorStop(Math.max(0.93, 1 - 30 / lw), spec[2]);
      grad.addColorStop(1, spec[4]);
      octx.fillStyle = grad;
      // Spacing can only grow into the room left of the canvas edge, so letters never get clipped.
      const offset = (i: number) => breathe * (i - line.first) + spread * fontSize * 0.22 * (gaps[i] - gaps[line.first]);
      const room = Math.max(0, w - line.right - 2);
      const lastOffset = offset(line.last);
      const fit = lastOffset > room ? room / lastOffset : 1;
      for (let i = line.first; i <= line.last; i++) {
        octx.fillText(shown[i], chars[i].x + offset(i) * fit, line.baseline);
      }
    }

    // Composite: copy straight where nothing is collapsing, squeeze slices into bars where it is.
    ctx.clearRect(0, 0, w, h);
    if (collapse < 0.005 && hover < 0.01) {
      ctx.drawImage(off, 0, 0, off.width, off.height, 0, 0, w, h);
      return;
    }
    const sw = Math.max(3, fontSize * 0.055);
    const sigma = Math.max(60, w * 0.07);
    for (const line of lines) {
      const pad = fontSize * 0.08;
      const top = line.top - pad;
      const bh = line.bottom - line.top + pad * 2;
      const x0 = line.left - sw;
      const x1 = w;
      for (let x = x0; x < x1; x += sw) {
        const local = hover * Math.exp(-Math.pow((x - pointerX) / sigma, 2));
        const c = clamp(Math.max(collapse, local));
        const dw = lerp(sw, Math.max(1, sw * 0.18), c);
        const dh = bh * (1 + 0.55 * c);
        ctx.drawImage(off, x * dpr, top * dpr, sw * dpr, bh * dpr, x + (sw - dw) / 2, top - (dh - bh) / 2, dw, dh);
      }
    }
  }

  measure();
  root.classList.add('is-live');
  new ResizeObserver(() => measure()).observe(root);
  visibleLoop(root, (now) => { frame(now); return true; });
}

export function mountAllWordmarks() {
  document.querySelectorAll<HTMLElement>('[data-wordmark]').forEach((el) => {
    if (el.dataset.mounted) return;
    el.dataset.mounted = '1';
    mountWordmark(el);
  });
}
