console.log("JS is connected");

const html = document.querySelector("html");
const btn = document.querySelector("#toggle");

function toggleTheme() {
  html.classList.toggle("dark");
}

btn.addEventListener("click", toggleTheme);

/********AppleKnapDarkMode********/

const toggleBtn = document.getElementById("toggle");

toggleBtn.addEventListener("click", () => {
  toggleBtn.classList.toggle("on");

  // Hvis du senere vil bruge tilstanden i din kode:
  const isOn = toggleBtn.classList.contains("on");
  console.log("Toggle er nu:", isOn ? "ON" : "OFF");
});
/**********************************/
