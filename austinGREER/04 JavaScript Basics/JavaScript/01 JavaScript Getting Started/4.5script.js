///// 04 Types & Arrays: Section 5 - Arrays \\\\\
let values = [1, 2, 3]; // creating an array
console.log( values[0] ); // 1
console.log( values[1] ); // 2
console.log( values[2] ); // 3
console.log( values[3] ); // undefined


// *** ARRAYS ARE INDEXED STARTING AT VALUE 0 ***
let cards = ["Ace", "King", "Queen", "Jack"];
console.log(cards);   // results = (4) ["Ace", "King", "Queen", "Jack"] - number = amount of elements
console.log( cards[0] );   // results = Ace


///// 04 Types & Arrays: Section 6 - Array Features \\\\\
let cards = ["Ace", "King", "Queen", "Jack"];
console.log( cards.length ); // results = 4 - if it was empty it would return 0

//-------------------------

let cards = ["Ace", "King", "Queen", "Jack"];
cards.push("Joker");
console.log( cards.length ); // results = 5 - adds "Joker" to the end of the Array ["Ace", "King", "Queen", "Jack", "Joker"]

let cards = ["Ace", "King", "Queen", "Jack"];
let myCard = cards.pop();  // removes the last element = "Jack"
console.log( myCard ); // results = "Jack"

//-------------------------

let cards = ["Ace", "King", "Queen", "Jack"];
let myCard = cards.shift();  // removes the first element = "Ace" and moves everything down 1 index
console.log( myCard, cards ); // results = "Ace", (3) ["King", "Queen", "Jack"]

//-------------------------

let cards = ["Ace", "King", "Queen", "Jack"];
cards.splice(3, 1);  // (removes the designated index (3), and the number of indexes to remove (1))
console.log( cards ); // results = ["Ace", "King", "Queen"]


let cards = ["Ace", "King", "Queen", "Jack"];
cards.splice(3, 1, 2, 3, 4);  // (removes the designated index (3), and the number of indexes to remove (1), then ADDS the values after the first 2 parameters)
console.log( cards ); // results = ["Ace", "King", "Queen", 2, 3, 4]