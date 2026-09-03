// ========================================
// GOODCO2GETHER
// Algemene JavaScript functionaliteit
// ========================================


// Controleer of het formulier bestaat
const werkdagFormulier = document.querySelector("form");


if (werkdagFormulier) {

    werkdagFormulier.addEventListener("submit", function(event) {

        event.preventDefault();

        // Gegevens uit het formulier ophalen
        const datum = document.querySelector("#datum").value;
        const vervoer = document.querySelector("#vervoer").value;
        const afstand = Number(document.querySelector("#afstand").value);
        const retour = document.querySelector("#retour").value;


        // Controleren of alles is ingevuld
        if (!datum || !vervoer || !afstand) {

            alert("Vul alle verplichte velden in.");

            return;
        }


        // Als het een retourrit is, afstand verdubbelen
        let totaleAfstand = afstand;

        if (retour === "ja") {
            totaleAfstand = afstand * 2;
        }


        // CO2-factoren per vervoersmiddel
        const factoren = {

            fiets: 0,

            lopen: 0,

            ov: 0.06,

            auto: 0.18,

            motor: 0.12

        };


        // CO2 berekenen
        const factor = factoren[vervoer];

        const uitstoot = totaleAfstand * factor;


        // Resultaat tonen
        alert(
            "Werkdag opgeslagen!\n\n" +
            "Datum: " + datum + "\n" +
            "Afstand: " + totaleAfstand + " km\n" +
            "CO₂-uitstoot: " + uitstoot.toFixed(2) + " kg"
        );

    });

}
