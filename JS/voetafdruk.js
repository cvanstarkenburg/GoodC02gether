const footprintFormulier = document.getElementById("footprint-formulier");
const begindatumVeld = document.getElementById("begindatum");
const einddatumVeld = document.getElementById("einddatum");
const footprintMelding = document.getElementById("footprint-melding");
const footprintResultaat = document.getElementById("footprint-resultaat");
const footprintBoom = document.getElementById("footprint-boom");
const boomAfbeelding = document.getElementById("boom-afbeelding");
const boomStatus = document.getElementById("boom-status");

const uitstootAuto = 0.2;
const uitstootOv = 0.05;
const uitstootSchermuur = 0.01;
const uitstootAi = 0.001;
const uitstootBlikje = 0.1;

footprintFormulier.addEventListener("submit", function (event) {
    event.preventDefault();
    toonFootprint();
});

function fetchData() {
    const opgeslagenData = localStorage.getItem("werkdag-data");

    if (opgeslagenData === null) {
        return { werkdagen: [] };
    } else {
        return JSON.parse(opgeslagenData);
    }
}

function toonFootprint() {
    footprintResultaat.classList.add("footprint-verborgen");
    footprintBoom.classList.add("footprint-verborgen");
    footprintMelding.textContent = "";
    document.getElementById("footprint-waarschuwing").textContent = "";

    const begindatum = begindatumVeld.value;
    const einddatum = einddatumVeld.value;

    if (begindatum !== "" && einddatum !== "" && begindatum > einddatum) {
        footprintMelding.textContent = "Kies een einddatum op of na de begindatum.";
        return;
    }

    const gegevens = fetchData();
    let aantal = 0;
    let ontbrekendeRitten = 0;
    let aantalVoorbeelden = 0;
    let ritten = 0;
    let schermen = 0;
    let ai = 0;
    let blikjes = 0;

    gegevens.werkdagen.forEach(function (werkdag) {
        const naBegindatum = begindatum === "" || werkdag.datum >= begindatum;
        const voorEinddatum = einddatum === "" || werkdag.datum <= einddatum;

        if (naBegindatum && voorEinddatum) {
            aantal++;

            if (werkdag.voorbeeld) {
                aantalVoorbeelden++;
            }
            schermen += Number(werkdag.schermen) * Number(werkdag.uren) * uitstootSchermuur;
            ai += Number(werkdag.ai) * uitstootAi;
            blikjes += Number(werkdag.blikjes) * uitstootBlikje;

            if (werkdag.rit) {
                const afstand = Number(werkdag.rit.kilometers);
                let factor = 0;

                if (werkdag.rit.vervoersmiddel === "auto") {
                    factor = uitstootAuto;
                } else if (werkdag.rit.vervoersmiddel === "openbaar-vervoer") {
                    factor = uitstootOv;
                }

                if (afstand > 0 && factor > 0) {
                    let reisuitstoot = afstand * factor;

                    if (werkdag.rit.retour) {
                        reisuitstoot = reisuitstoot * 2;
                    }

                    ritten += reisuitstoot;
                } else {
                    ontbrekendeRitten++;
                }
            }
        }
    });

    if (aantal === 0) {
        footprintMelding.textContent = "Geen werkdagen gevonden. Voeg een werkdag toe of kies een andere periode.";
        return;
    }

    const totaal = ritten + schermen + ai + blikjes;
    document.getElementById("footprint-totaal").textContent = totaal.toFixed(3).replace(".", ",") + " kg CO₂";
    document.getElementById("footprint-aantal").textContent = "Aantal werkdagen: " + aantal;
    document.getElementById("uitstoot-ritten").textContent = ritten.toFixed(3).replace(".", ",") + " kg CO₂";
    document.getElementById("uitstoot-schermen").textContent = schermen.toFixed(3).replace(".", ",") + " kg CO₂";
    document.getElementById("uitstoot-ai").textContent = ai.toFixed(3).replace(".", ",") + " kg CO₂";
    document.getElementById("uitstoot-blikjes").textContent = blikjes.toFixed(3).replace(".", ",") + " kg CO₂";

    if (ontbrekendeRitten === 0) {
        const gemiddelde = totaal / aantal;
        document.getElementById("footprint-gemiddelde").textContent =
            gemiddelde.toFixed(3).replace(".", ",") + " kg CO₂";

        if (gemiddelde < 2) {
            boomAfbeelding.src = "../images/boom-vol.svg";
            boomStatus.textContent = "Lage gemiddelde uitstoot";
        } else if (gemiddelde < 5) {
            boomAfbeelding.src = "../images/boom-halfvol.svg";
            boomStatus.textContent = "Gemiddelde uitstoot";
        } else {
            boomAfbeelding.src = "../images/boom-kaal.svg";
            boomStatus.textContent = "Hoge gemiddelde uitstoot";
        }

        boomAfbeelding.alt = boomStatus.textContent;
        footprintBoom.classList.remove("footprint-verborgen");
    }

    if (ontbrekendeRitten > 0) {
        document.getElementById("footprint-totaal").textContent = "Bekend subtotaal: " + totaal.toFixed(3).replace(".", ",") + " kg CO₂";
        document.getElementById("footprint-waarschuwing").textContent =
            "Onvolledige berekening: bij " + ontbrekendeRitten +
            " rit(ten) ontbreken kilometers of een bekend vervoersmiddel. Die ritten zijn niet meegerekend.";
    }

    footprintResultaat.classList.remove("footprint-verborgen");
}

toonFootprint();


