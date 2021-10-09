const container = document.querySelector("main");
if (container) {
  container.addEventListener("click", e => {
    if (e.target.classList.contains("svgBtn")) {
      const btn = e.target;
      const card = btn.parentElement.parentElement.parentElement.parentElement;
      const layer = card.querySelector(".layer");
      const svg = card.querySelector("svg");
      if (card && svg) {
        const html = svg.outerHTML;
        navigator.clipboard.writeText(html);
        layer.style.display = "block";
        setTimeout(() => (layer.style.display = "none"), 2000);
      }
    } else if (e.target.classList.contains("nameBtn")) {
      const btn = e.target;
      const card = btn.parentElement.parentElement.parentElement.parentElement;
      const layer = card.querySelector(".layer");
      const name = btn.getAttribute("data-name");
      if (name) {
        navigator.clipboard.writeText(name);
        layer.style.display = "block";
        setTimeout(() => (layer.style.display = "none"), 500);
      }
    }
  });
}

// engine
const input = document.querySelector("nav input");
if (input) {
  input.addEventListener("keyup", e => {
    const value = e.target.value.trim();
    console.warn(value);
    const cards = document.querySelectorAll(".card");
    if (cards.length) {
      cards.forEach(card => {
        const name = card.getAttribute("data-name");
        if (name.includes(value)) {
          card.style.display = "inline-block";
        } else {
          card.style.display = "none";
        }
      });
    }
  });
}
