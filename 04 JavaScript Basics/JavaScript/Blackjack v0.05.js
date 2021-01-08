//
// Blackjack
// by Austin Greer
// 2019.07.26
// used in plnkr.co
//

let suits = ['Hearts', 'Clubs', 'Diamonds', 'Spades'];
let values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace',];

function createDeck() {
    let deck = [];
    for (let suitIndex = 0; suitIndex < suits.length; suitIndex++) {
        for (let valueIndex = 0; valueIndex < values.length; valueIndex++) {
            let card = {
                suit: suits[suitIndex],
                value: values[valueIndex]
            };
            deck.push( card );
        }
    }
    return deck;
}

function getCardString(card) {
    return card.value + ' of ' + card.suit;
}

function getNextCard() {
    return deck.shift();
}

let deck = createDeck();

/* Prints out entire deck
for (let i = 0; i < deck.length; i++) {
    console.log(deck[i]);
}
*/

let playerCards = [ getNextCard(), getNextCard() ];

console.log("Welcome to Blackjack!");

console.log("You are dealt: ");
console.log("  " + getCardString(playerCards[0]) );
console.log("  " + getCardString(playerCards[1]) );