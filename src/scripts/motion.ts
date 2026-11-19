// Shared helpers for the canvas effects: reduced motion, visibility-aware loops, DPR sizing, spectrum colors.

export const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const FALLBACK_SPECTRUM = ['#ff6b5e', '#ffc95c', '#8eeee6', '#6f8bff', '#a77bff'];

/** The five spectrum colors from tokens.css, so canvas and CSS never drift apart. */
export function spectrum(): string[] {
  const cs = getComputedStyle(document.documentElement);
  return FALLBACK_SPECTRUM.map((fb, i) => cs.getPropertyValue(`--spec-${i + 1}`).trim() || fb);
}

export function token(name: string, fallback: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;
}

/** Sizes a canvas to its CSS box at device pixel ratio (capped at 2). Returns CSS-pixel size. */
export function fitCanvas(canvas: HTMLCanvasElement) {
  const rect = canvas.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = Math.max(1, Math.round(rect.width));
  const h = Math.max(1, Math.round(rect.height));
  if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
  }
  const ctx = canvas.getContext('2d')!;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { ctx, w, h, dpr };
}

/**
 * Calls `frame(now)` every animation frame, but only while `el` is on screen and the tab is visible.
 * `frame` can return false to say "nothing is moving"; the loop then sleeps until `wake()` is called.
 */
export function visibleLoop(el: Element, frame: (now: number) => boolean | void) {
  let onScreen = false;
  let raf = 0;
  let sleeping = false;

  const tick = (now: number) => {
    raf = 0;
    if (!onScreen || document.hidden) return;
    const keepGoing = frame(now);
    if (keepGoing === false) { sleeping = true; return; }
    raf = requestAnimationFrame(tick);
  };
  const start = () => { if (!raf && onScreen && !document.hidden) raf = requestAnimationFrame(tick); };

  const io = new IntersectionObserver(([entry]) => {
    onScreen = entry.isIntersecting;
    if (onScreen) { sleeping = false; start(); }
  }, { rootMargin: '100px' });
  io.observe(el);
  document.addEventListener('visibilitychange', () => { if (!document.hidden && !sleeping) start(); });

  return {
    wake() { sleeping = false; start(); },
    stop() { io.disconnect(); cancelAnimationFrame(raf); raf = 0; },
  };
}

export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const smoothstep = (a: number, b: number, v: number) => {
  const t = clamp((v - a) / (b - a));
  return t * t * (3 - 2 * t);
};
export const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
export const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

/** Mixes two #rrggbb colors. */
export function mixHex(a: string, b: string, t: number) {
  const pa = parseInt(a.slice(1), 16);
  const pb = parseInt(b.slice(1), 16);
  const r = Math.round(lerp((pa >> 16) & 255, (pb >> 16) & 255, t));
  const g = Math.round(lerp((pa >> 8) & 255, (pb >> 8) & 255, t));
  const bl = Math.round(lerp(pa & 255, pb & 255, t));
  return `rgb(${r} ${g} ${bl})`;
}

/** Waits for the site fonts so canvas text matches the DOM. */
export async function fontsReady() {
  try {
    await Promise.all([
      document.fonts.load('600 100px "Geist Variable"'),
      document.fonts.load('600 100px "Geist Mono Variable"'),
    ]);
    await document.fonts.ready;
  } catch { /* draw with fallback fonts */ }
}
