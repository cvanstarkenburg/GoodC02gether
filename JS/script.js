// Knoppen in de navigatiebalk
document.getElementById("home-button")
    .addEventListener("click", function () {
        window.location.href = "index.html";
    });
document.getElementById("werkdag-button")
    .addEventListener("click", function () {
        window.location.href = "nieuwe-werkdag.html";
    });
document.getElementById("historie-button")
    .addEventListener("click", function () {
        window.location.href = "historie.html";
    });
document.getElementById("footprint-button")
    .addEventListener("click", function () {
        window.location.href = "voetafdruk.html";
    });
document.getElementById("gegevens-button")
    .addEventListener("click", function () {
        window.location.href = "gegevens.html";
    });
// Header inklappen en uitklappen
const header = document.getElementById("site-header");
const headerToggle = document.getElementById("header-toggle");
headerToggle.addEventListener("click", function () {
    const isIngeklapt = header.classList.toggle("collapsed");
    headerToggle.setAttribute("aria-expanded", String(!isIngeklapt));
});
// Kleurenblind-modus
const kleurenblindKey = "kleurenblind";
const kleurenblindKnop = document.getElementById("kleurenblind-knop");
let kleurenblindAan = localStorage.getItem(kleurenblindKey) === "true";
function pasKleurenblindModusToe(aan) {
    if (aan) {
        document.documentElement.dataset.theme = "kleurenblind";
    } else {
        delete document.documentElement.dataset.theme;
    }
    kleurenblindKnop.setAttribute("aria-pressed", String(aan));
}
pasKleurenblindModusToe(kleurenblindAan);
kleurenblindKnop.addEventListener("click", function () {
    kleurenblindAan = !kleurenblindAan;
    localStorage.setItem(kleurenblindKey, String(kleurenblindAan));
    pasKleurenblindModusToe(kleurenblindAan);
});
function meldWerkdagOpgeslagen() {
    const invoerKnop = document.getElementById("werkdag-invoeren-knop");
    const toast = document.getElementById("succes-toast");

    invoerKnop.disabled = true;
    toast.classList.add("toast-zichtbaar");

    setTimeout(function () {
        window.location.href = "historie.html";
    }, 3000);
}
