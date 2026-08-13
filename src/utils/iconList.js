import icons from "../data/icons.js";
import { SOURCES } from "../data/sources.js";

const getMap = (id) => {
  const [a, b] = id.split(".");
  return b ? icons[a][b] : icons[a];
};

export const ALL_ICONS = SOURCES.flatMap((source) => {
  const map = getMap(source.id);
  return Object.keys(map).map((name) => ({
    id: `${source.id}:${name}`,
    name,
    svg: map[name],
    source: source.id,
    sourceLabel: source.label,
    license: source.license,
    modulePath: source.modulePath,
  }));
});

export const filterIcons = (list, { query = "", source = "", license = "all" } = {}) => {
  const q = query.trim().toLowerCase();

  return list.filter((icon) => {
    if (q && !icon.name.toLowerCase().includes(q)) return false;
    if (source && icon.source !== source) return false;
    if (license !== "all" && icon.license !== license) return false;
    return true;
  });
};

// Keeps at most `limit` icons per source, preserving each source's original
// (already filtered) order -- called before sortIcons so "first N" means the
// same N regardless of which sort the user picks.
export const capPerSource = (list, limit) => {
  const seen = {};
  return list.filter((icon) => {
    seen[icon.source] = (seen[icon.source] || 0) + 1;
    return seen[icon.source] <= limit;
  });
};

export const sortIcons = (list, sortKey = "name-asc") => {
  const sorted = [...list];
  if (sortKey === "name-desc") sorted.sort((a, b) => b.name.localeCompare(a.name));
  else if (sortKey === "source") sorted.sort((a, b) => a.sourceLabel.localeCompare(b.sourceLabel) || a.name.localeCompare(b.name));
  else sorted.sort((a, b) => a.name.localeCompare(b.name));
  return sorted;
};
