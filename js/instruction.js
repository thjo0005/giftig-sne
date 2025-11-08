console.log("Loaded instruction.js");

// Farver pr. knap
const COLORS = {
  Influenza: "#060a444d",
  Roskildesyge: "#060a444d",
  Borrelia: "#060a444d",
};

// Hvilken knap styrer hvilken region i SVG'en
const REGION = {
  Influenza: "#jylland",
  Roskildesyge: "#fyn",
  Borrelia: "#sjælland",
};

// Hjælper: vælg alle tegne-elementer i en region
const SHAPES = "path, polygon, rect, circle, ellipse, line, polyline";

function resetAll() {
  ["#jylland", "#fyn", "#sjælland"].forEach((sel) => {
    const region = document.querySelector(sel);
    if (!region) return;
    region.classList.remove("my_scale");
    region.querySelectorAll(SHAPES).forEach((el) => {
      el.style.fill = ""; // tilbage til styling fra CSS/SVG
    });
  });
  document
    .querySelectorAll(".virus-btn")
    .forEach((b) => b.classList.remove("is-active"));
}

function paint(which) {
  const color = COLORS[which];
  const regionSel = REGION[which];
  if (!color || !regionSel) return;

  resetAll();

  const region = document.querySelector(regionSel);
  if (!region) return;

  // mal hele regionen
  region.querySelectorAll(SHAPES).forEach((el) => {
    el.style.fill = color;
  });

  // zoom / fremhæv valgt region
  region.classList.add("my_scale");

  // aktiv-stil på knappen
  const btn = document.getElementById(which);
  if (btn) btn.classList.add("is-active");
}

// Event listeners
["Influenza", "Roskildesyge", "Borrelia"].forEach((id) => {
  const btn = document.getElementById(id);
  if (btn) btn.addEventListener("click", () => paint(id));
});

/*****************Tekstboks**************/
// Skift aktivt kort ved klik på knap
(function () {
  const buttons = document.querySelectorAll(".virus-btn");
  const cards = document.querySelectorAll(".info-card");

  function showCard(id) {
    // knapper
    buttons.forEach((b) => b.classList.toggle("is-active", b.id === id));
    // kort
    cards.forEach((card) => {
      card.classList.toggle("is-visible", card.dataset.virus === id);
    });
  }

  // klik-hændelser
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => showCard(btn.id));
  });

  // standard ved load (Influenza)
  showCard("Influenza");
})();
