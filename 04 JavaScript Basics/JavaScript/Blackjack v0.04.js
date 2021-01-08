//
// Blackjack
// by Austin Greer
// 2019.07.25
// used in plnkr.co
//

let suits = ['Hearts', 'Clubs', 'Diamonds', 'Spades'];
let values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace',];

function createDeck() {
    let deck = [];
    for (let suitIndex = 0; suitIndex < suits.length; suitIndex++) {
        for (let valueIndex = 0; valueIndex < values.length; valueIndex++) {
            deck.push(values[valueIndex] + ' of ' + suits[suitIndex]);
        }
    }
    return deck;
}

function getNextCard() {
    return deck.shift();
}

let deck = createDeck();

/*
for (let i = 0; i < deck.length; i++) {
    console.log(deck[i]);
}
*/

let playerCards = [ getNextCard(), getNextCard() ];

console.log("Welcome to Blackjack!");

console.log("You are dealt: ");
console.log("  " + playerCards[0]);
console.log("  " + playerCards[1]);