document.addEventListener("DOMContentLoaded", () => {
    const leva = document.getElementById("leva-right");
    
    const slotRis = ["sette", "uva", "banana", "ciliegia"];
    const slotsIds = [
        document.getElementById("first-ris"),
        document.getElementById("second-ris"),
        document.getElementById("third-ris")
    ];

    let isSpinning = false; // <-- BLOCCA CLICK MULTIPLI

    leva.addEventListener("click", () => {

        if (isSpinning) return;   // <-- IGNORA CLICK DURANTE ANIMAZIONE
        isSpinning = true;        // <-- BLOCCA FINO A FINE GIRO

        // --- ANIMAZIONE LEVA ---
        leva.id = "leva-right-pulled";
        setTimeout(() => {
            leva.id = "leva-right";
        }, 3000);

        // --- ANIMAZIONE SLOT ---
        let temptime = 50;
        let ultimoTempo = 0;

        for (let i = 0; i < 20; i++) {
            temptime += temptime * 0.25;
            ultimoTempo = temptime;

            setTimeout(() => {
                slotsIds.forEach(slot => {
                    slot.className = "risultati";
                    const randomClass = slotRis[Math.floor(Math.random() * slotRis.length)];
                    slot.classList.add(randomClass);
                });
            }, temptime);
        }

        // --- SOLO DOPO L’ULTIMO GIRO ---
        setTimeout(() => {
            slotsIds.forEach(slot => {
                slot.classList.add("ris-finale");
            });

            // --- CALCOLO RISULTATO ---
            const simboliFinali = slotsIds.map(s => {
                if (s.classList.contains("sette")) return "sette";
                if (s.classList.contains("uva")) return "uva";
                if (s.classList.contains("banana")) return "banana";
                if (s.classList.contains("ciliegia")) return "ciliegia";
            });

            const tuttiUguali = simboliFinali.every(s => s === simboliFinali[0]);
            const nonSette = simboliFinali[0] !== "sette";
            const tuttiUgualiNot7 = tuttiUguali && nonSette;

            const tuttiUguali7 =
                slotsIds.every(s => s.classList.contains("sette")) &&
                slotsIds.every(s => s.classList.contains("ris-finale"));

            const score = document.getElementById("score");

            if (tuttiUgualiNot7) {
                score.textContent = String(parseInt(score.textContent) + 1000);
            } else if (tuttiUguali7) {
                score.textContent = String(parseInt(score.textContent) + 77777);
            }

            // --- ORA LA LEVA PUÒ ESSERE RICLICCATA ---
            isSpinning = false;

        }, ultimoTempo + 50);
    });
});