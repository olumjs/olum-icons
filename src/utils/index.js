// A decorative QR block: a fixed seed keeps the pattern stable between renders
// so the card doesn't flicker into a different code on every navigation.
export const qr = (() => {
  const n = 21;
  const cell = 8;
  const size = n * cell;
  let seed = 1987;
  const rand = () => (seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648;
  // The three finder squares are drawn last, so the noise never overlaps them.
  const inFinder = (c, r) => (c < 8 && r < 8) || (c > n - 9 && r < 8) || (c < 8 && r > n - 9);
  const box = (c, r, w, h, fill) => `<rect x="${c * cell}" y="${r * cell}" width="${w * cell}" height="${h * cell}" fill="${fill}" />`;
  const finder = (c, r) =>
    box(c, r, 7, 7, "currentColor") + box(c + 1, r + 1, 5, 5, "var(--olum-background)") + box(c + 2, r + 2, 3, 3, "currentColor");

  let noise = "";
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (!inFinder(c, r) && rand() > 0.48) noise += box(c, r, 1, 1, "currentColor");
    }
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" class="size-36">${noise}${finder(0, 0)}${finder(n - 7, 0)}${finder(
    0,
    n - 7
  )}</svg>`;
})();
