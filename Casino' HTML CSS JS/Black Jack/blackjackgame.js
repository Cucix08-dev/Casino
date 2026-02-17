// =========================
//  MAZZO ORDINATO (4x PICCHE)
// =========================
let deckSorted = [
    "A","2","3","4","5","6","7","8","9","10","J","Q","K",
    "A","2","3","4","5","6","7","8","9","10","J","Q","K",
    "A","2","3","4","5","6","7","8","9","10","J","Q","K",
    "A","2","3","4","5","6","7","8","9","10","J","Q","K"
];

// =========================
//  VALORI DELLE CARTE
// =========================
const cardsValues = {
    "2": 2, "3": 3, "4": 4, "5": 5, "6": 6,
    "7": 7, "8": 8, "9": 9, "10": 10,
    "J": 10, "Q": 10, "K": 10,
    "A": 11
};

// =========================
//  FUNZIONE PER MESCOLARE IL MAZZO
// =========================
function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

let deck = shuffleDeck([...deckSorted]);

// =========================
//  MANO DEL GIOCATORE
// =========================
let playerHand = [];

// =========================
//  CALCOLO DEL PUNTEGGIO
// =========================
function calculateHandValue(cards) {
    let total = 0;
    let aces = 0;

    for (let card of cards) {
        total += cardsValues[card];
        if (card === "A") aces++;
    }

    // Se sballi, trasforma gli assi da 11 → 1
    while (total > 21 && aces > 0) {
        total -= 10;
        aces--;
    }

    return total;
}

// =========================
//  MOSTRARE LA CARTA NELLA GRAFICA
// =========================
function showCard(card) {
    const container = document.getElementById("player-cards");

    const div = document.createElement("div");
    div.classList.add("card-slot");

    const map = {
        "A": "asso",
        "2": "due",
        "3": "tre",
        "4": "quattro",
        "5": "cinque",
        "6": "sei",
        "7": "sette",
        "8": "otto",
        "9": "nove",
        "10": "dieci",
        "J": "jack",
        "Q": "queen",
        "K": "king"
    };

    div.classList.add(map[card]);
    container.appendChild(div);
}

// =========================
//  AGGIORNARE LO SCORE
// =========================
function updateScore(total) {
    document.getElementById("score").textContent = total;
}

// =========================
//  FUNZIONE DRAW
// =========================
function onDrawClick() {
    if (deck.length === 0) {
        console.log("Il mazzo è finito!");
        return;
    }

    const card = deck.pop();   // pesca la carta IN CIMA
    playerHand.push(card);     // aggiungi alla mano

    showCard(card);            // mostra graficamente

    const total = calculateHandValue(playerHand);
    updateScore(total);

    if (total === 21) console.log("BLACKJACK!");
    if (total > 21) console.log("BUST!");
}

// =========================
//  FUNZIONE STAY
// =========================
function onStayClick() {
    const total = calculateHandValue(playerHand);

    console.log("Hai scelto STAY.");
    console.log("Totale finale:", total);

    if (total === 21) console.log("BLACKJACK!");
    else if (total > 21) console.log("Hai sballato!");
    else console.log("Mano valida, ora tocca al banco.");
}

// =========================
//  EVENTI CLICK
// =========================
document.getElementById("draw").addEventListener("click", (e) => {
    e.preventDefault();
    onDrawClick();
});

document.getElementById("stay").addEventListener("click", (e) => {
    e.preventDefault();
    onStayClick();
});
