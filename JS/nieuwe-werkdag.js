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
const bestemmingVeld = document.getElementById("bestemming");
const kilometersVeld = document.getElementById("kilometers");
const ritVeldIds = ["bestemming", "vervoersmiddel", "kilometers"];
const retourVeld = document.getElementById("retour");

const ritKnopTekst = "+ Voeg rit toe";

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
        if (rit) {
            bestemmingVeld.value = rit.bestemming;
            vervoersmiddelVeld.value = rit.vervoersmiddel;
            kilometersVeld.value = rit.kilometers;
            retourVeld.checked = rit.retour;
        } else if (document.getElementById("werklocatie").value === "hoofdkantoor") {
            bestemmingVeld.value = "kantoor";
        } else if (document.getElementById("werklocatie").value === "klantlocatie") {
            bestemmingVeld.value = "bouwhuis";
        }

        ritPopup.showModal();
    });

    ritAnnulerenKnop.addEventListener("click", function () {
        ritPopup.close();
    });

    ritFormulier.addEventListener("submit", function (event) {
        event.preventDefault();

        let ritGeldig = true;

        ritVeldIds.forEach(function (veldId) {
            const veld = document.getElementById(veldId);
            const foutmelding = document.getElementById(veldId + "-fout");
            foutmelding.textContent = "";
            veld.classList.remove("ongeldig");

            if (!veld.checkValidity()) {
                ritGeldig = false;
                veld.classList.add("ongeldig");

                if (veld.validity.valueMissing) {
                    foutmelding.textContent = "Dit veld is verplicht.";
                } else {
                    foutmelding.textContent = "Vul een afstand groter dan 0 in, met maximaal één decimaal.";
                }
            }
        });

        if (!ritGeldig) {
            return;
        }

        rit = {
            bestemming: bestemmingVeld.value,
            vervoersmiddel: vervoersmiddelVeld.value,
            kilometers: Number(kilometersVeld.value),
            retour: retourVeld.checked
        };

        ritToevoegenKnop.textContent = "✓ Rit toegevoegd — aanpassen";

        ritPopup.close();
    });

    // Pop-up leegmaken bij sluiten (ook bij Escape)
    ritPopup.addEventListener("close", function () {
        ritFormulier.reset();
        ritVeldIds.forEach(function (veldId) {
            document.getElementById(veldId + "-fout").textContent = "";
            document.getElementById(veldId).classList.remove("ongeldig");
        });
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
bestemmingVeld.addEventListener("change", vulAfstandIn);
vervoersmiddelVeld.addEventListener("change", vulAfstandIn);

function vulAfstandIn() {
    const bestemming = bestemmingVeld.value;
    const vervoersmiddel = vervoersmiddelVeld.value;

    if (bestemming === "kantoor" && vervoersmiddel === "auto") {
        kilometersVeld.value = 18;
    } else if (bestemming === "kantoor" && vervoersmiddel === "openbaar-vervoer") {
        kilometersVeld.value = 22;
    } else if (bestemming === "bouwhuis" && vervoersmiddel === "auto") {
        kilometersVeld.value = 4.5;
    } else if (bestemming === "bouwhuis" && vervoersmiddel === "openbaar-vervoer") {
        kilometersVeld.value = 6;
    } else {
        kilometersVeld.value = "";
    }
}
