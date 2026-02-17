const buttons = document.querySelectorAll(".slot-machine-btn-group");

buttons.forEach(button => {
    button.addEventListener("click", (e) => {
        e.preventDefault();

        const label = button.textContent.trim().toLowerCase();
        let target = null;

        if (label === "slot machine") {
            target = "Slot machine/slot-machine.html";
        } else if (label === "indietro") {
            target = "../";
        } else {
            return;
        }

        explodeCoins(button);

        setTimeout(() => {
            window.location.href = target;
        }, 1200);
    });
});

function explodeCoins(button) {
    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    for (let i = 0; i < 14; i++) {
        createCoin(centerX, centerY);
    }
}

function createCoin(x, y) {
    const coin = document.createElement("div");
    coin.classList.add("coin");

    coin.style.left = x + "px";
    coin.style.top = y + "px";

    document.body.appendChild(coin);

    // --- ANGOLO TRA 45° E 125° (solo verso l'alto) ---
    const angleDeg = 45 + Math.random() * 80; 
    const angle = angleDeg * (Math.PI / 180);

    // potenza iniziale
    const power = 450 + Math.random() * 200;

    // velocità iniziale
    const vx = Math.cos(angle) * power;   // laterale
    const vy = -Math.sin(angle) * power;  // verso l’alto

    // gravità dolce
    const gravity = 600; // più basso = caduta lenta e morbida

    // durata animazione
    const duration = 1200;
    const t = duration / 1000;

    // posizione finale con gravità
    const finalX = vx * t;
    const finalY = vy * t + 0.5 * gravity * t * t;

    coin.animate(
        [
            { transform: "translate(0, 0)", opacity: 1 },

            // punto più alto (metà animazione)
            { transform: `translate(${vx * (t/2)}px, ${vy * (t/2)}px)`, opacity: 1 },

            // caduta con gravità
            { transform: `translate(${finalX}px, ${finalY}px)`, opacity: 0 }
        ],
        {
            duration: duration,
            easing: "ease-out",
            fill: "forwards"
        }
    );

    setTimeout(() => coin.remove(), duration + 50);
}
