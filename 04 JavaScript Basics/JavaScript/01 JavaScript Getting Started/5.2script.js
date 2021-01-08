///// 05 Project Flow: Section 2 - Conditionals using if() \\\\\

if (5 === 5) {          // true
    console.log('Yes');
}

if (5 > 10) {           // false
    console.log('No');
}

if (5 >= 5) {           // ture
    console.log('Yes');
}

//-------------------------

let state = 'KY';
let taxPercent = 0;

if (state === 'KY') {
    taxPercent = 6;
}

console.log(taxPercent);    // 6

//-------------------------

let state = 'KY';
let taxPercent = 6;

if (state !== 'KY') {
    taxPercent = 0;
}

console.log(taxPercent);    // 6


//-------------------------

let score = 1000;

if (score >= 1000) {
    score = score + 100;
}

console.log("Score is: ", score);


///// 05 Funtions: Section 3 - if() ... else \\\\\
let state = 'KY';
let taxPercent;

if (state === 'KY') {
    taxPercent = 6;
}
else {
    taxPercent = 0;
}

console.log(taxPercent);    // 6


//-------------------------

let score = 9;

if (score > 10) {
    score = score + 1;
}
else if (score === 9 ){
    console.log("Almost");
}
else {
    console.log("Nice Try");
}

console.log("Score is: ", score);


///// 05 Project Flow: Section 4 - switch & case \\\\\

let state = 'TX';

switch(state) {
    case 'NY':
        console.log('New York');
        break; // breaks code off if  condition is met.
    case 'TX':
        console.log('Texas');
        break;
    default:
        console.log('Unknown');
        break;
} // result = console logs 'Texas'

//-------------------------

let state = 'TX';

switch(state) {
    case 'NY':
        console.log('New York');
        break; // breaks code off if  condition is met.
    case 'TX':
        console.log('Texas');
        // allow fall through           // if you don't break, the code will continue thru until the next break; For rare cases you may want
    case 'TN':                          // this to happen so you can do that, but jest need to make sure you comment as such
        console.log('Tennessee');
        break;    
    default:
        console.log('Unknown');
        break;
} // result = console logs 'Texas' & 'Tennessee'