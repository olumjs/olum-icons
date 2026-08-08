let uid = 0;

export function nextChartId() {
  return `chart-${uid++}`;
}
