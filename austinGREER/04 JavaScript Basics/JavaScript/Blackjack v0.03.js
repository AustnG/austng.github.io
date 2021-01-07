//
// Blackjack
// by Austin Greer
// 2019.07.24
// used in plnkr.co
//

let suits = ['Hearts', 'Clubs', 'Diamonds', 'Spades'];
let values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace',];
let deck = [];

for (let suitIndex = 0; suitIndex < suits.length; suitIndex++) {
    for (let valueIndex = 0; valueIndex < values.length; valueIndex++){
        deck.push(values[valueIndex] + ' of ' + suits[suitIndex]);
    }
}

for (let i = 0; i < deck.length; i++) {
    console.log(deck[i]);
}

// ignored below for the lesson
let playerCards = [deck[0], deck[2]];

console.log("Welcome to Blackjack!");

console.log("You are dealt: ");
console.log("  " + playerCards[0]);
console.log("  " + playerCards[1]);