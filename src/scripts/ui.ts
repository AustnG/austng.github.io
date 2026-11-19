// Small page behaviors: text decode on labels, reveal on scroll, poster parallax.
// Everything here is decoration; the page works the same without it.

import { reducedMotion } from './motion';

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/<>#%&';

const runs = new WeakMap<HTMLElement, number>();

/**
 * Scrambles an element's text and resolves it left to right. Only the latest run on an element
 * writes, and a timer guarantees the real text comes back even if animation frames are paused.
 */
export function decode(el: HTMLElement, duration = 650) {
  const original = el.dataset.decodeText ?? el.textContent ?? '';
  el.dataset.decodeText = original;
  const id = (runs.get(el) ?? 0) + 1;
  runs.set(el, id);
  setTimeout(() => { if (runs.get(el) === id) el.textContent = original; }, duration + 120);
  const start = performance.now();
  const step = (now: number) => {
    if (runs.get(el) !== id) return;
    const p = Math.min(1, (now - start) / duration);
    const settled = Math.floor(p * original.length);
    let out = '';
    for (let i = 0; i < original.length; i++) {
      const ch = original[i];
      out += i < settled || ch === ' ' ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
    }
    el.textContent = out;
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

export function mountUi() {
  if (reducedMotion()) return;

  // Decode once when scrolled into view, and again on hover for interactive labels.
  const decodeIo = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) { decode(e.target as HTMLElement); decodeIo.unobserve(e.target); }
    }
  }, { threshold: 0.6 });
  document.querySelectorAll<HTMLElement>('[data-decode]').forEach((el) => {
    decodeIo.observe(el);
    const host = el.closest('a, button, [data-decode-host]');
    host?.addEventListener('pointerenter', () => decode(el, 420));
  });

  // Reveal on scroll.
  const revealIo = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) { e.target.classList.add('is-in'); revealIo.unobserve(e.target); }
    }
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('[data-reveal]').forEach((el) => revealIo.observe(el));

  // Parallax: elements drift at different speeds, like the posters in Vid01.
  const items = [...document.querySelectorAll<HTMLElement>('[data-parallax]')];
  if (items.length) {
    let ticking = false;
    const update = () => {
      ticking = false;
      const vh = window.innerHeight;
      for (const el of items) {
        const r = el.parentElement!.getBoundingClientRect();
        const center = r.top + r.height / 2 - vh / 2;
        const speed = Number(el.dataset.parallax || 0.1);
        el.style.transform = `translate3d(0, ${(-center * speed).toFixed(1)}px, 0)`;
      }
    };
    window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    update();
  }
}
