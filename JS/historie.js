const historieFormulier = document.getElementById("historie-formulier");
const begindatumVeld = document.getElementById("begindatum");
const einddatumVeld = document.getElementById("einddatum");
const historieOverzicht = document.getElementById("historie-overzicht");
const historieMelding = document.getElementById("historie-melding");

historieFormulier.addEventListener("submit", function (event) {
    event.preventDefault();
    toonHistorie();
});

toonHistorie();

function fetchData() {
    const opgeslagenData = localStorage.getItem("werkdag-data");

    if (opgeslagenData === null) {
        return { werkdagen: [] };
    } else {
        return JSON.parse(opgeslagenData);
    }
}

function toonHistorie() {
    historieOverzicht.textContent = "";
    historieMelding.textContent = "";

    const begindatum = begindatumVeld.value;
    const einddatum = einddatumVeld.value;

    if (begindatum !== "" && einddatum !== "" && begindatum > einddatum) {
        historieMelding.textContent = "Kies een einddatum op of na de begindatum.";
        return;
    }

    const gegevens = fetchData();
    let aantal = 0;

    gegevens.werkdagen.sort(function (eerste, tweede) {
        if (eerste.datum > tweede.datum) {
            return -1;
        } else if (eerste.datum < tweede.datum) {
            return 1;
        } else {
            return 0;
        }
    });

    gegevens.werkdagen.forEach(function (werkdag) {
        const naBegindatum = begindatum === "" || werkdag.datum >= begindatum;
        const voorEinddatum = einddatum === "" || werkdag.datum <= einddatum;

        if (naBegindatum && voorEinddatum) {
            toonWerkdag(werkdag);
            aantal++;
        }
    });

    if (aantal === 0) {
        historieMelding.textContent = "Geen werkdagen gevonden. Voeg een werkdag toe of kies een andere periode.";
    } else {
        historieMelding.textContent = "Aantal gevonden werkdagen: " + aantal;
    }
}

function toonWerkdag(werkdag) {
    const blok = document.createElement("article");
    blok.classList.add("historie-werkdag");

    const titel = document.createElement("h2");
    titel.textContent = werkdag.datum;
    blok.appendChild(titel);

    let werklocatie = werkdag.werklocatie;

    if (werklocatie === "hoofdkantoor") {
        werklocatie = "Hoofdkantoor";
    } else if (werklocatie === "thuis") {
        werklocatie = "Thuis";
    } else if (werklocatie === "klantlocatie") {
        werklocatie = "Klantlocatie";
    }

    voegGegevenToe(blok, "Werklocatie", werklocatie);

    const details = document.createElement("div");
    details.classList.add("historie-details");
    voegGegevenToe(details, "Schermen", werkdag.schermen);
    voegGegevenToe(details, "Schermuren", werkdag.uren + " uur");
    voegGegevenToe(details, "AI-verzoeken", werkdag.ai);
    voegGegevenToe(details, "Blikjes op HQ", werkdag.blikjes);
    blok.appendChild(details);

    let ritTekst = "Geen rit toegevoegd";

    if (werkdag.rit) {
        if (werkdag.rit.vervoersmiddel === "auto") {
            ritTekst = "Auto";
        } else {
            ritTekst = "Openbaar vervoer";
        }

        if (werkdag.rit.retour) {
            ritTekst += " · retour";
        } else {
            ritTekst += " · enkele reis";
        }
    }

    voegGegevenToe(blok, "Rit", ritTekst);
    historieOverzicht.appendChild(blok);
}

function voegGegevenToe(blok, naam, waarde) {
    const regel = document.createElement("p");
    const label = document.createElement("strong");
    label.textContent = naam + ": ";
    regel.appendChild(label);

    const tekst = document.createElement("span");
    tekst.textContent = waarde;
    regel.appendChild(tekst);
    blok.appendChild(regel);
}
