import { store } from "olum";

const EXIT_MS = 300;

export const toast = store({
  items: [],
  // autoClose: false skips the timer entirely -- the toast then only goes
  // away via the X button (or a manual toast.requestDismiss(id) call).
  add({ title, description, type = "default", duration = 4000, autoClose = true } = {}) {
    const id = Date.now() + Math.random();
    this.items = [...this.items, { id, title, description, type, entering: true, leaving: false }];
    // Flips off one tick after mount so the browser has an initial ("entering")
    // frame to transition away from -- toggling it in the same update as the
    // push would give the enter and rest styles no separation to animate between.
    setTimeout(() => {
      this.items = this.items.map((t) => (t.id === id ? { ...t, entering: false } : t));
    }, 20);
    if (autoClose) setTimeout(() => this.requestDismiss(id), duration);
    return id;
  },
  // Marks the toast as leaving (triggering its exit transition) instead of
  // removing it immediately, then removes it for real once that transition
  // has had time to finish.
  requestDismiss(id) {
    this.items = this.items.map((t) => (t.id === id ? { ...t, leaving: true } : t));
    setTimeout(() => this.dismiss(id), EXIT_MS);
  },
  dismiss(id) {
    this.items = this.items.filter((t) => t.id !== id);
  },
});
