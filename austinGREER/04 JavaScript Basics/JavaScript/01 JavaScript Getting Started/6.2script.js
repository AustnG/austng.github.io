///// 06 Funtions: Section 2 -  Function Basics \\\\\

function myFunction() {
    console.log('in myFunction');
}
myFunction();

///// 06 Funtions: Section 3 -  Passing Information to Functions \\\\\

function myFunction(message) {
    console.log(message);
}
myFunction('First Message');
myFunction('Second Message');

//-------------------------


function myFunction2(message, anotherMessage) {
    console.log(message, anotherMessage);
}
myFunction2('First Message', 'Second Message');

//-------------------------

function myFunction(message) {
    message = message + ' World!';
    console.log(message);
}
myFunction('Hello');

///// 06 Funtions: Section 4 -  Function Return Values \\\\\

function myFunction(message, favColor) {
    newMessage = message + ' ' + favColor + ' World!';
    console.log(newMessage);
}
myFunction('Hello', 'Green');

//-------------------------

function triplePlus(value) {
    let tripValue = value + value + value;
    return tripValue;
}

console.log( triplePlus(4) ); // = 12

//-------------------------

function plus(num) {
    let newNum = num + 100;
    return newNum;
}

let result = plus(42);
console.log(result)

///// 06 Funtions: Section 5 -  Function Scope \\\\\
function plus(num) {
    let newNum = num + 100;
    return newNum;
}
plus(42);
console.log(newNum);    // = Reference Error: newNum is undefined - outside of scope

//-------------------------

let message = "First Message";

function myFunction() {
  let message = "Hello World!";
  return message;
}

myFunction();
console.log(message);   // = "First Message"  - outside of scope