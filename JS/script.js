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

// Toast
const toastDuur = 3000;
const doorstuurVertraging = 1000;
const toastStartKey = "toast-start";

function toonToast(duur, metAnimatie) {
    const toast = document.getElementById("succes-toast");
    if (!toast) return;

    if (!metAnimatie) {
        toast.style.transition = "none";
        toast.classList.add("toast-zichtbaar");
        toast.offsetHeight; // stijl direct toepassen, zonder fade-in
        toast.style.transition = "";
    } else {
        toast.classList.add("toast-zichtbaar");
    }

    setTimeout(function () {
        toast.classList.remove("toast-zichtbaar");
    }, duur);
}

// Aanroepen vanuit nieuwe-werkdag.js nadat de werkdag is opgeslagen
function meldWerkdagOpgeslagen() {
    const invoerKnop = document.getElementById("werkdag-invoeren-knop");
    if (invoerKnop) invoerKnop.disabled = true;

    sessionStorage.setItem(toastStartKey, Date.now());
    toonToast(toastDuur, true);

    setTimeout(function () {
        window.location.href = "historie.html";
    }, doorstuurVertraging);
}

// Na doorsturen: toast de resterende tijd laten zien
function controleerToastNaDoorsturen() {
    const toastStart = sessionStorage.getItem(toastStartKey);
    if (!toastStart) return;

    sessionStorage.removeItem(toastStartKey);

    const resterend = toastDuur - (Date.now() - Number(toastStart));
    if (resterend > 0) {
        toonToast(resterend, false);
    }
}

controleerToastNaDoorsturen();