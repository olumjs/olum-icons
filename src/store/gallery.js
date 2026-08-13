import { store } from "olum";

// Rendering every matching icon at once (thousands of inline SVGs) is what
// crashed the browser -- so each source is capped to this many icons until
// "Load more" raises the cap. See utils/iconList.js's capPerSource().
export const PER_SOURCE_BATCH = 50;

// Shared filter/UI state for the icon gallery. `source` is a single source id
// (e.g. "lucide") or "" for no filter -- the sidebar's Style list is
// single-select, so only one source can be active at a time.
export const galleryStore = store({
  query: "",
  source: "",
  license: "all",
  sort: "name-asc",
  view: "grid",
  perSourceLimit: PER_SOURCE_BATCH,

  setQuery(v) {
    this.query = v;
    this.perSourceLimit = PER_SOURCE_BATCH;
  },

  setLicense(v) {
    this.license = v;
    this.perSourceLimit = PER_SOURCE_BATCH;
  },

  setSort(v) {
    this.sort = v;
  },

  // Clicking the already-active source clears the filter back to "All Icons".
  selectSource(id) {
    this.source = this.source === id ? "" : id;
    this.perSourceLimit = PER_SOURCE_BATCH;
  },

  loadMore() {
    this.perSourceLimit += PER_SOURCE_BATCH;
  },

  hasActiveFilters() {
    return !!this.query || !!this.source;
  },

  reset() {
    this.query = "";
    this.source = "";
    this.perSourceLimit = PER_SOURCE_BATCH;
  },
});
