// Tracks the most recently copied icon so a bare Ctrl/Cmd+C (no re-click) can
// copy it again, per the onboarding hint ("click an icon, or Ctrl+C after
// clicking"). A single document-level listener (see IconGrid.html) reads this
// instead of every card wiring its own keydown handler.
let lastSvg = null;

export const copyIconSvg = async (svg) => {
  await navigator.clipboard.writeText(svg);
  lastSvg = svg;
};

export const recopyLastIcon = () => {
  if (lastSvg) navigator.clipboard.writeText(lastSvg);
};
