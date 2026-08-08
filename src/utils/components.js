// Descriptions are authored in registry.json and mirrored into descriptions.js
// by scripts/gen-snippets.mjs.
import { descriptions } from "./descriptions.js";

// Every component page lives under src/elements/, so its route is prefixed.
// Kept here so the rail, pager, palette, and index grid all build links from one
// place -- they were hardcoding "/" + id, which broke when the pages moved.
export const BASE = "/elements";

// Single source of truth for the component gallery: the ordered id list drives
// both the index grid and the prev/next pager at the bottom of every example.
export const components = [
  "accordion", "alert", "alert-dialog", "aspect-ratio", "attachment", "avatar", "badge",
  "breadcrumb", "bubble", "button", "anchor", "button-group", "calendar", "card", "carousel", "chart",
  "checkbox", "collapsible", "combobox", "command", "context-menu", "data-table", "date-picker",
  "dialog", "direction", "drawer", "dropdown-menu", "empty", "field", "hover-card", "icon", "input",
  "input-group", "input-otp", "item", "kbd", "label", "marker", "menubar", "message",
  "message-scroller", "native-select", "navigation-menu", "pagination", "popover", "progress",
  "radio-group", "resizable", "scroll-area", "select", "separator", "sheet", "sidebar", "skeleton",
  "slider", "spinner", "switch", "table", "tabs", "textarea", "toast", "toggle", "toggle-group",
  "tooltip",
];

// `capitalize` handles every name except the ones with non-title-case letters.
const labels = { "input-otp": "Input OTP" };

export const label = id => labels[id] || id.replaceAll("-", " ");

// PageHeader omits the paragraph when a route has no description.
export const describe = id => descriptions[id] || "";


export const prevOf = id => {
  const i = components.indexOf(id);
  return i > 0 ? components[i - 1] : null;
};

// An id that isn't in the list means we're on the gallery index, so "next" is
// the first component -- that page gets a next link and no previous one.
export const nextOf = id => {
  const i = components.indexOf(id);
  if (i < 0) return components[0];
  return i < components.length - 1 ? components[i + 1] : null;
};
