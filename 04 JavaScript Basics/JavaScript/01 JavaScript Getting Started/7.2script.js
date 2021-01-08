///// 07 Objects: Section 2 -  Object Basics \\\\\
let person = {
    name: "Austin",
    age: 28;
    fullTime: true
};

console.log(person.name); // Austin
console.log(person.age); // 28
console.log(person.fullTime); // true

//-------------------------

let card = {
    suit: "Hearts",
    value: "Queen"
};

console.log(card.suit); // Hearts
console.log(card.value); // Queen


///// 07 Objects: Section 3 - Passing Objects to Functions \\\\\
function changeCard(card) {
    card.suit = "Clubs";
}

let card = {
    suit: "Hearts",
    value: "Queen"
};

changeCard(card);

console.log(card.suit); // Clubs


///// 07 Objects: Section 4 - Arrays of Objects \\\\\
let cards = [
    {
        suit: "Hearts",
        value: "Queen"
    }
];

console.log(cards[0].suit); // Hearts

//-------------------------

let cards = [
    {
        suit: "Hearts",
        value: "Queen"
    },
    {
        suit: "Clubs",
        value: "Queen"
    }
];

console.log(cards[1].suit); // Clubs

///// 07 Objects: Section 5 - JavaScript Built-in Objects \\\\\
Math
Date
String
Number

//------------------------- NUMBER -------------------------\\
let result = Math.random(); // this will generate a large random number between 0 and 1
console.log( result ); // = 0.4950855098826632

//-------------------------
let result = Math.random() * 52; // this will generate a large random number between 0 and 1 and multiply it by 52
result = Math.trunc( result ); // this truncates the result

console.log( result ); // = 15

//------------------------- DATE -------------------------\\
let result = new Date();
console.log( result ); // = Fri Jul 26 2019 11:03:14 GMT-0500 (Central Daylight Time)

//-------------------------
let result = new Date().toDateString();
console.log( result ); // = Fri Jul 26 2019

//------------------------- STRING -------------------------\\
let result = "Hello World";
result = result.toUpperCase();

console.log( result ); // = HELLO WORLD

//-------------------------
let result = "Hello World";
result = result.toLowerCase();

console.log( result ); // = hello world

//-------------------------
let result = 0 / 0;
console.log( Number.isNaN( result ) ); // = ture

let result = 2 / 2;
console.log( Number.isNaN( result ) ); // = false