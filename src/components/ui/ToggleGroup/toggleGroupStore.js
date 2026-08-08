import { store } from "olum";

let uid = 0;

export function nextToggleGroupId() {
  return `toggle-group-${uid++}`;
}

export const toggleGroupStore = store({
  active: {},

  init(groupId, initialValues) {
    if (!this.active[groupId]) {
      this.active = { ...this.active, [groupId]: new Set(initialValues) };
    }
  },

  isActive(groupId, value) {
    const set = this.active[groupId];
    return !!set && set.has(value);
  },

  // Single mode always keeps exactly one value active (clicking the active
  // item re-selects it rather than clearing the group), matching a radio
  // group -- multiple mode independently toggles membership.
  toggle(groupId, value, multiple) {
    const current = this.active[groupId] || new Set();
    const next = multiple ? new Set(current) : new Set();
    if (multiple && next.has(value)) next.delete(value);
    else next.add(value);
    this.active = { ...this.active, [groupId]: next };
  },
});
