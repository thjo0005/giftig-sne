// js/summary.js
document.addEventListener("DOMContentLoaded", () => {
  const $ = (sel) => document.querySelector(sel);

  // Kilder (formfelter)
  const nameI = $("#name");
  const emailI = $("#email");
  const phoneI = $("#phone");
  const virusRadios = document.querySelectorAll('input[name="virus"]');
  const symChecks = document.querySelectorAll('input[name="symptoms"]');
  const descI = $("#sym-desc");
  const intensityI = $("#intensity");
  const dateI = $("#date");
  const timeI = $("#time");
  const placeI = $("#place");
  const zipI = $("#zipcity");

  // Mål (summary felter)
  const out = {
    name: $("#sum-name"),
    email: $("#sum-email"),
    phone: $("#sum-phone"),
    virus: $("#sum-virus"),
    symptoms: $("#sum-symptoms"),
    desc: $("#sum-desc"),
    intensity: $("#sum-intensity"),
    date: $("#sum-date"),
    time: $("#sum-time"),
    place: $("#sum-place"),
    zip: $("#sum-zipcity"),
  };

  const dashIfEmpty = (v) => (v && v.trim() ? v : "—");

  function selectedVirus() {
    const v = [...virusRadios].find((r) => r.checked);
    return v ? v.value : "";
  }

  function selectedSymptoms() {
    return [...symChecks].filter((c) => c.checked).map((c) => c.value);
  }

  function renderSymptoms(list) {
    if (!list.length) {
      out.symptoms.textContent = "—";
      return;
    }
    out.symptoms.innerHTML = list
      .map((s) => `<span class="sum-chip">${s}</span>`)
      .join("");
  }

  function fmtDate(val) {
    if (!val) return "";
    const d = new Date(val);
    if (isNaN(d)) return val;
    return d.toLocaleDateString("da-DK", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }

  function fmtTime(val) {
    if (!val) return "";
    try {
      const [h, m] = val.split(":").map(Number);
      const d = new Date();
      d.setHours(h || 0, m || 0, 0, 0);
      return d.toLocaleTimeString("da-DK", {
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return val;
    }
  }

  function updateSummary() {
    out.name.textContent = dashIfEmpty(nameI?.value ?? "");
    out.email.textContent = dashIfEmpty(emailI?.value ?? "");
    out.phone.textContent = dashIfEmpty(phoneI?.value ?? "");
    out.virus.textContent = dashIfEmpty(selectedVirus());
    renderSymptoms(selectedSymptoms());
    out.desc.textContent = dashIfEmpty(descI?.value ?? "");
    out.intensity.textContent = intensityI?.value || "1";
    out.date.textContent = dashIfEmpty(fmtDate(dateI?.value ?? ""));
    out.time.textContent = dashIfEmpty(fmtTime(timeI?.value ?? ""));
    out.place.textContent = dashIfEmpty(placeI?.value ?? "");
    out.zip.textContent = dashIfEmpty(zipI?.value ?? "");
  }

  // Lyttere (live opdatering)
  [nameI, emailI, phoneI, descI, intensityI, dateI, timeI, placeI, zipI]
    .filter(Boolean)
    .forEach((el) => el.addEventListener("input", updateSummary));

  virusRadios.forEach((r) => r.addEventListener("change", updateSummary));
  symChecks.forEach((c) => c.addEventListener("change", updateSummary));

  // Init
  updateSummary();
});
