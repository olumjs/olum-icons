// Uses the same curve as Tailwind's --default-transition-timing-function
// (cubic-bezier(.4, 0, .2, 1), the "ease" behind every transition-* utility
// in this project) via the standard Newton-Raphson bezier solver used by
// libraries like bezier-easing.
function cubicBezier(x1, y1, x2, y2) {
  const a = (v1, v2) => 1 - 3 * v2 + 3 * v1;
  const b = (v1, v2) => 3 * v2 - 6 * v1;
  const c = (v1) => 3 * v1;

  const calc = (t, v1, v2) => ((a(v1, v2) * t + b(v1, v2)) * t + c(v1)) * t;
  const slope = (t, v1, v2) => 3 * a(v1, v2) * t * t + 2 * b(v1, v2) * t + c(v1);

  const solveT = (x) => {
    let t = x;
    for (let i = 0; i < 8; i++) {
      const s = slope(t, x1, x2);
      if (s === 0) return t;
      t -= (calc(t, x1, x2) - x) / s;
    }
    return t;
  };

  return (x) => calc(solveT(x), y1, y2);
}

const ease = cubicBezier(0.4, 0, 0.2, 1);

// Animates a plain numeric value over time via rAF, calling `onUpdate` with
// each intermediate value -- used to ease the carousel's offset toward a
// target when Next/Previous is clicked.
export function animateValue(from, to, duration, onUpdate) {
  if (from === to) return;
  const startTime = performance.now();

  const step = (now) => {
    const t = Math.min((now - startTime) / duration, 1);
    onUpdate(from + (to - from) * ease(t));
    if (t < 1) requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
}
