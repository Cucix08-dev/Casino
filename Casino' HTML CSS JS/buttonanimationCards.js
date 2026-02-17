const buttonsCards = document.querySelectorAll(".blackjack-btn-group");

buttonsCards.forEach(button => {
    button.addEventListener("click", (e) => {
        e.preventDefault();

        let target = "Black Jack/blackjack.html";

        explodeCard(button);

        setTimeout(() => {
            window.location.href = target;
        }, 1200);
    });
});

function explodeCard(button) {
    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    for (let i = 0; i < 14; i++) {
        createCard(centerX, centerY);
    }
}

function createCard(x, y) {
    const card = document.createElement("div");
    card.classList.add("cards");

    card.style.left = x + "px";
    card.style.top = y + "px";

    document.getElementById("cards-container").appendChild(card);

    // --- ANGOLO CASUALE 0° - 360° ---
    const angleDeg = Math.random() * 360;
    const angle = angleDeg * (Math.PI / 180);

    // --- POTENZA CASUALE ---
    const power = 300 + Math.random() * 400;

    // velocità iniziale
    const vx = Math.cos(angle) * power;
    const vy = Math.sin(angle) * power;

    // durata animazione
    const duration = 1200;
    const t = duration / 1000;

    // posizione finale (senza gravità)
    const finalX = vx * t;
    const finalY = vy * t;

    // animazione
    card.animate(
        [
            { transform: "translate(0, 0)", opacity: 1 },
            { transform: `translate(${finalX}px, ${finalY}px)`, opacity: 0 }
        ],
        {
            duration: duration,
            easing: "ease-out",
            fill: "forwards"
        }
    );

    setTimeout(() => card.remove(), duration + 50);
}

