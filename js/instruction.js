console.log("Loaded instruction.js");

document.querySelector("#Influenza").addEventListener("click", influenzaF);

function influenzaF() {
  console.log("influenza function triggered.");

  document.querySelector("#jylland").classList.add("my_scale");
}
