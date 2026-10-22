const formulier = document.getElementById("werkdag-formulier");
const datumVeld = document.getElementById("datum");
const vandaagKnop = document.getElementById("vandaag-knop");
const dataKey = "werkdag-data";
const veldIds = ["datum", "werklocatie", "blikjes", "schermen", "uren", "ai"];

const ritPopup = document.getElementById("rit-popup");
const ritFormulier = document.getElementById("rit-formulier");
const ritToevoegenKnop = document.getElementById("rit-toevoegen-knop");
const ritAnnulerenKnop = document.getElementById("rit-annuleren-knop");
const vervoersmiddelVeld = document.getElementById("vervoersmiddel");
const vervoersmiddelFout = document.getElementById("vervoersmiddel-fout");
const retourVeld = document.getElementById("retour");

const ritKnopTekst = "+ Voeg rit toe";
const ritToegevoegdTekst = "✓ Rit toegevoegd";

let rit = null;

// Knop Vandaag
if (datumVeld && vandaagKnop) {
    vandaagKnop.addEventListener("click", function () {
        const vandaag = new Date();

        const dag = String(vandaag.getDate()).padStart(2, "0");
        const maand = String(vandaag.getMonth() + 1).padStart(2, "0");
        const jaar = vandaag.getFullYear();

        datumVeld.value = `${jaar}-${maand}-${dag}`;
    });
}

// Validatie van het formulier
if (formulier) {
    formulier.addEventListener("submit", function (event) {
        event.preventDefault();

        let formulierGeldig = true;

        veldIds.forEach(function (veldId) {
            const veld = document.getElementById(veldId);
            const foutmelding = document.getElementById(`${veldId}-fout`);

            foutmelding.textContent = "";
            veld.classList.remove("ongeldig");

            if (!veld.checkValidity()) {
                formulierGeldig = false;
                veld.classList.add("ongeldig");

                if (veld.validity.valueMissing) {
                    foutmelding.textContent = "Dit veld is verplicht.";
                } else if (veld.validity.rangeUnderflow) {
                    foutmelding.textContent = "Vul een getal van 0 of hoger in.";
                } else if (veld.validity.stepMismatch) {
                    foutmelding.textContent = "Vul een geldig getal in.";
                } else {
                    foutmelding.textContent = "Vul een geldige waarde in.";
                }
            }
        });

        if (formulierGeldig) {
            const formData = new FormData(formulier);
            const dataObject = Object.fromEntries(formData);
            dataObject.rit = rit;

            storeData(dataObject);
            formulier.reset();
            resetRit();
            meldWerkdagOpgeslagen();
        }
    });
}

// Pop-up rit toevoegen
if (ritPopup && ritFormulier && ritToevoegenKnop && ritAnnulerenKnop) {
    ritToevoegenKnop.addEventListener("click", function () {
        ritPopup.showModal();
    });

    ritAnnulerenKnop.addEventListener("click", function () {
        ritPopup.close();
    });

    ritFormulier.addEventListener("submit", function (event) {
        event.preventDefault();

        vervoersmiddelFout.textContent = "";
        vervoersmiddelVeld.classList.remove("ongeldig");

        if (!vervoersmiddelVeld.checkValidity()) {
            vervoersmiddelVeld.classList.add("ongeldig");
            vervoersmiddelFout.textContent = "Dit veld is verplicht.";
            return;
        }

        rit = {
            vervoersmiddel: vervoersmiddelVeld.value,
            retour: retourVeld.checked
        };

        ritToevoegenKnop.textContent = ritToegevoegdTekst;
        ritToevoegenKnop.disabled = true;

        ritPopup.close();
    });

    // Pop-up leegmaken bij sluiten (ook bij Escape)
    ritPopup.addEventListener("close", function () {
        ritFormulier.reset();
        vervoersmiddelFout.textContent = "";
        vervoersmiddelVeld.classList.remove("ongeldig");
    });
}

function resetRit() {
    rit = null;
    ritToevoegenKnop.textContent = ritKnopTekst;
    ritToevoegenKnop.disabled = false;
}

function fetchData() {
    const opgeslagenData = localStorage.getItem(dataKey);

    if (opgeslagenData === null) {
        return { werkdagen: [] };
    } else {
        return JSON.parse(opgeslagenData);
    }
}

function storeData(dataObject) {
    const gegevens = fetchData();
    gegevens.werkdagen.push(dataObject);

    const gegevensTekst = JSON.stringify(gegevens);
    localStorage.setItem(dataKey, gegevensTekst);
}