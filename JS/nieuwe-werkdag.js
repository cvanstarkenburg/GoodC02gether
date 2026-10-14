const formulier = document.querySelector("#werkdag-formulier");
const dataKey = "werkdag-data";

// Knop Vandaag
const datumVeld = document.querySelector("#datum");
const vandaagKnop = document.querySelector("#datum + .foutmelding + button");

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

        const velden = formulier.querySelectorAll("input, select");
        let formulierGeldig = true;

        velden.forEach(function (veld) {
            const foutmelding = veld.parentElement.querySelector(".foutmelding");

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
            storeData(dataObject);
            formulier.reset();

            formulier.querySelectorAll(".ongeldig").forEach(function (veld) {
                veld.classList.remove("ongeldig");
            });

            formulier.querySelectorAll(".foutmelding").forEach(function (melding) {
                melding.textContent = "";
            });
        }
    });
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