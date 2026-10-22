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