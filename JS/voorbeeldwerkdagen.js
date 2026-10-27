const voorbeeldWerkdagen = [
    {
        datum: "2026-10-19",
        werklocatie: "hoofdkantoor",
        schermen: "2", uren: "8", ai: "12", blikjes: "2",
        rit: { bestemming: "kantoor", vervoersmiddel: "auto", kilometers: 18, retour: true },
        voorbeeld: true
    },
    {
        datum: "2026-10-20",
        werklocatie: "thuis",
        schermen: "1", uren: "7.5", ai: "8", blikjes: "0",
        rit: null,
        voorbeeld: true
    },
    {
        datum: "2026-10-21",
        werklocatie: "klantlocatie",
        schermen: "2", uren: "8", ai: "6", blikjes: "1",
        rit: { bestemming: "bouwhuis", vervoersmiddel: "openbaar-vervoer", kilometers: 6, retour: true },
        voorbeeld: true
    },
    {
        datum: "2026-10-22",
        werklocatie: "hoofdkantoor",
        schermen: "2", uren: "8", ai: "15", blikjes: "1",
        rit: { bestemming: "kantoor", vervoersmiddel: "openbaar-vervoer", kilometers: 22, retour: true },
        voorbeeld: true
    },
    {
        datum: "2026-10-23",
        werklocatie: "thuis",
        schermen: "1", uren: "8", ai: "5", blikjes: "0",
        rit: null,
        voorbeeld: true
    },
    {
        datum: "2026-10-24",
        werklocatie: "thuis",
        schermen: "1", uren: "4", ai: "3", blikjes: "1",
        rit: null,
        voorbeeld: true
    },
    {
        datum: "2026-10-25",
        werklocatie: "thuis",
        schermen: "1", uren: "3", ai: "2", blikjes: "0",
        rit: null,
        voorbeeld: true
    },
    {
        datum: "2026-10-26",
        werklocatie: "hoofdkantoor",
        schermen: "2", uren: "8", ai: "10", blikjes: "2",
        rit: { bestemming: "kantoor", vervoersmiddel: "auto", kilometers: 18, retour: true },
        voorbeeld: true
    }
];

voegVoorbeeldwerkdagenToe();

function voegVoorbeeldwerkdagenToe() {
    const alToegevoegd = localStorage.getItem("voorbeeldwerkdagen-toegevoegd");

    if (alToegevoegd === "dagelijks-19-26") {
        return;
    }

    const opgeslagenData = localStorage.getItem("werkdag-data");
    let gegevens = { werkdagen: [] };

    if (opgeslagenData !== null) {
        gegevens = JSON.parse(opgeslagenData);
    }

    voorbeeldWerkdagen.forEach(function (voorbeeld) {
        let datumBestaat = false;

        gegevens.werkdagen.forEach(function (werkdag) {
            if (werkdag.datum === voorbeeld.datum) {
                datumBestaat = true;
            }
        });

        if (!datumBestaat) {
            gegevens.werkdagen.push(voorbeeld);
        }
    });

    localStorage.setItem("werkdag-data", JSON.stringify(gegevens));
    localStorage.setItem("voorbeeldwerkdagen-toegevoegd", "dagelijks-19-26");
}
