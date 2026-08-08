import { store } from "olum";

// Assigns a stable, unique id per <Carousel> instance so multiple carousels
// on the same page don't share (and fight over) the same offset below.
let uid = 0;
export function nextCarouselId() {
  return `carousel-${uid++}`;
}

// CarouselContent/Next/Previous are separate sibling components with no
// context API to share state directly. Keeping the scroll offset here instead
// means writing it from any one of them (a drag, or either button) reactively
// re-renders whichever of the others reads it -- olum-store's normal
// subscribe-by-read behavior -- with no manual change-notification needed.
export const carouselStore = store({
  offsets: {},
  setOffset(id, value) {
    this.offsets[id] = value;
  },
  getOffset(id) {
    return this.offsets[id] || 0;
  },
});

// The track's transform is applied through a stylesheet rule rather than an
// inline style. The offset is maintained imperatively (rewritten every frame
// while dragging, which is far too hot to drive through a re-render), but
// vdom rewrites an element's style attribute from its template on every patch
// -- so any re-render of an ancestor would snap a scrolled carousel back to 0.
// A rule in <head> lives outside the component tree, so patches never see it.
// Mutating the CSSOM rule's style is about as cheap as touching an inline one.
let sheet = null;
const rules = {};

export function applyOffset(id, value) {
  carouselStore.setOffset(id, value);
  if (!sheet) {
    const tag = document.createElement("style");
    tag.setAttribute("data-olum-carousel", "");
    document.head.appendChild(tag);
    sheet = tag.sheet;
  }
  if (!rules[id]) {
    const index = sheet.insertRule(
      `[data-carousel-id="${id}"] [data-slot="carousel-track"]{transform:translateX(0px)}`,
      sheet.cssRules.length,
    );
    rules[id] = sheet.cssRules[index];
  }
  rules[id].style.transform = `translateX(-${value}px)`;
}
