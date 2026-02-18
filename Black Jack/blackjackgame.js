// =========================
//  CLASSE DECK
// =========================
class Deck {
    constructor() {
        this.deckSorted = [
            "A","2","3","4","5","6","7","8","9","10","J","Q","K",
            "A","2","3","4","5","6","7","8","9","10","J","Q","K",
            "A","2","3","4","5","6","7","8","9","10","J","Q","K",
            "A","2","3","4","5","6","7","8","9","10","J","Q","K"
        ];

        this.cardsValues = {
            "2": 2, "3": 3, "4": 4, "5": 5, "6": 6,
            "7": 7, "8": 8, "9": 9, "10": 10,
            "J": 10, "Q": 10, "K": 10,
            "A": 11
        };

        // mazzo mescolato iniziale
        this.deck = this.shuffleDeck([...this.deckSorted]);
    }

    shuffleDeck(deck) {
        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }
        this.deck = deck;
        return this.deck;
    }

    getDeckSorted() {
        return this.deckSorted;
    }

    getDeck() {
        return this.deck;
    }

    drawCard() {
        return this.deck.pop();
    }
}

// =========================
//  CLASSE PLAYER
// =========================
class Player {
    constructor(mainDeck) {
        this.deck = mainDeck;
        this.playerHand = [];
        this.obiettivo = this.generateObiettivo();

        this.cardIds = {
            "A" : "asso",
            "2" : "due",
            "3" : "tre",
            "4" : "quattro",
            "5" : "cinque",
            "6" : "sei",
            "7" : "sette",
            "8" : "otto",
            "9" : "nove",
            "10" : "dieci",
            "J" : "jack",
            "Q" : "queen",
            "K" : "king",
        };

        const container = document.getElementById("player-cards");
        if (container) {
            const rect = container.getBoundingClientRect();
            this.playerCardsX = rect.left + 4;
            this.playerCardsY = rect.top + 4;
            this.playerCardsXconst = this.playerCardsX;
            this.playerCardsYconst = this.playerCardsY;
        }
    }

    setPlayerHand(arr) {
        this.playerHand = arr;
    }

    generateObiettivo() {
        return Math.floor(Math.random() * (20 - 16 + 1)) + 16;
    }

    setObiettivo() {
        this.obiettivo = this.generateObiettivo();
        const el = document.getElementById("obiettivo");
        if (el) el.textContent = this.obiettivo;
    }

    getObiettivo() {
        return this.obiettivo;
    }

    calculateHandValue(cards) {
        let total = 0;
        let aces = 0;

        for (let card of cards) {
            total += this.deck.cardsValues[card];
            if (card === "A") aces++;
        }

        while (total > 21 && aces > 0) {
            total -= 10;
            aces--;
        }

        return total;
    }

    showCard(card) {
        const playerCards = document.getElementById("player-cards");

        const div = document.createElement("div");
        div.classList.add("carta", this.cardIds[card]);

        playerCards.appendChild(div);

        // 1. Ottieni posizione iniziale della carta nel deck
        const startRect = div.getBoundingClientRect();

        // 2. Calcola differenza tra posizione attuale e obiettivo
        const deltaX = this.playerCardsX - startRect.left;
        const deltaY = this.playerCardsY - startRect.top;

        // 3. Imposta la posizione iniziale (senza animazione)
        div.style.transform = "translate(0px, 0px)";

        // 4. Forza un reflow per permettere la transizione
        div.offsetHeight;

        // 5. Avvia l’animazione verso la destinazione
        div.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        this.playerCardsX += 50
    }


    clearCardsView() {
        const hand = document.getElementById("player-cards");
        if (!hand) return;

        const cards = hand.querySelectorAll(".carta");
        cards.forEach(card => card.remove());
    }


    setMano(total) {
        const el = document.getElementById("valoreMano");
        if (el) el.textContent = total;
    }

    updateScore(total) {
        const el = document.getElementById("score");
        if (el) el.textContent = total;
    }

    onDrawClick() {
        if (this.deck.getDeck().length === 0) {
            return;
        }

        const card = this.deck.drawCard();
        this.playerHand.push(card);

        this.showCard(card);

        const total = this.calculateHandValue(this.playerHand);
        this.setMano(total);

        if (this.deck.getDeck().length === 0) {
            document.getElementById("deck").classList.add("deckConsumato");
        }

        if (total === 21) {
            this.playerCardsX = this.playerCardsXconst;
            this.playerCardsY = this.playerCardsYconst;
            return true
        }
    }

    onStayClick() {
        const total = this.calculateHandValue(this.playerHand);

        const score = document.getElementById("score").innerText
        if (total > this.getObiettivo() && total < 21){
            this.updateScore(parseInt(score)+200)
        }
        else if (total == this.getObiettivo()){
            this.updateScore(parseInt(score)+total*10)
        }
        else{
            this.updateScore(parseInt(score)-20*(
                Math.max(total, this.getObiettivo())-Math.min(total, this.getObiettivo())/2)
            )
        }

        this.playerCardsX = this.playerCardsXconst;
        this.playerCardsY = this.playerCardsYconst;
    }

    resetHand() {
        this.playerHand = [];
        this.setMano(0);
        this.clearCardsView();
    }
}

// =========================
//  ISTANZE E EVENTI
// =========================
const mainDeck = new Deck();
const player = new Player(mainDeck);

document.addEventListener("DOMContentLoaded", () => {
    player.setObiettivo();
    mainDeck.shuffleDeck([...mainDeck.getDeckSorted()]);
    player.updateScore(0);
    player.setMano(0);
});

document.getElementById("deck").addEventListener("click", (e) => {
    e.preventDefault();
    isBlackJack=player.onDrawClick();
    if (isBlackJack===true){
        player.updateScore(parseInt(document.getElementById("score").innerText)+2000)
        player.resetHand();
        player.setObiettivo();
        mainDeck.shuffleDeck([...mainDeck.getDeckSorted()]);
    }
});

document.getElementById("stay").addEventListener("click", (e) => {
    e.preventDefault();

    player.onStayClick();

    // reset giro
    player.resetHand();
    player.setObiettivo();
    mainDeck.shuffleDeck([...mainDeck.getDeckSorted()]);
    player.clearCardsView();
    if (document.getElementById("deck").contains(document.querySelector(".deckConsumato"))){
        document.getElementById("deck").classList.remove("deckConsumato");
    }
});
