// Knoppen in de navigatiebalk
document.getElementById("home-button").addEventListener("click", function () {
    window.location.href = "index.html";
});

document.getElementById("werkdag-button").addEventListener("click", function () {
    window.location.href = "nieuwe-werkdag.html";
});

document.getElementById("historie-button").addEventListener("click", function () {
    window.location.href = "historie.html";
});

document.getElementById("footprint-button").addEventListener("click", function () {
    window.location.href = "voetafdruk.html";
});

document.getElementById("gegevens-button").addEventListener("click", function () {
    window.location.href = "gegevens.html";
});

// Header inklappen en uitklappen
const header = document.querySelector("header");
const headerToggle = document.getElementById("header-toggle");

headerToggle.addEventListener("click", function () {
    header.classList.toggle("collapsed");

    if (header.classList.contains("collapsed")) {
        headerToggle.textContent = "⌄";
        headerToggle.setAttribute("aria-label", "Header uitklappen");
        headerToggle.setAttribute("aria-expanded", "false");
    } else {
        headerToggle.textContent = "⌃";
        headerToggle.setAttribute("aria-label", "Header inklappen");
        headerToggle.setAttribute("aria-expanded", "true");
    }
});