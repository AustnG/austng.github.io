///// 03 JavaScript Beginnings: Section 2 - Storing Info in Variables \\\\\
let productName = "Model";
// 'let' = making a variable, variable comes next (in this case it's 'productName'),
//  and then our string after the = sign setting the variable Model equal to "Model"
console.log(productName);

//-------------------------
let p = "Model";
console.log(p);
// same as above - variable can be WHATEVER you want

//-------------------------
let productName = "Model";
let productID = "Tau";
console.log(productName, productID);

// Instead of using lots of 'let's statements you can use a comma like below:
let productName = "Model",
    productID = "Tau";
console.log(productName, productID);


///// 03 JavaScript Beginnings: Section 3 - Understanding Code Errors \\\\\
let productName = "Model";
console.log(productNme); //note the 'a' in name is missing. This will throw a Reference Error

// another common error is not having the variable defined.

///// 03 JavaScript Beginnings: Section 4 - Strings and Numeric Variables \\\\\
Strings can be in 'single' or "double quotes"

'Hello World'
"Hello World"
"Don't do this at home" // notice apostrophe - use double quotes if there is a single quote in your string
'We\'re programming' // the \' is kown as an escpase character and will let the program work correctly in this case

13
.013
5000000
.00000005 // numbers are displayed without quotes

let price = 5.00;
    price2 = 3.00;
console.log(price, price2);
console.log(price + price2); // + symbol adds numbers. Make sure your numbers stay numbers when doing mathmatics

//-------------------------
let firstName = "John",
    lastName = "Dorn";
console.log(firstName + lastName); // + symbol concatenate strings

///// 03 JavaScript Beginnings: Section 5 - Simple Operators \\\\\

let first = 12,
    second = 3;
let answer1 = first + second;
let answer2 = first - second;
let answer3 = first * second;
let answer4 = first / second;
let answer5 = first  % second;
console.log(answer1, answer2, answer3, answer4, answer5);

let answer6 = 3 + 4 * 5;
let answer7 = (3 + 4) * 5;
console.log(answer6, answer7);

///// 03 JavaScript Beginnings: Section 6 - Commenting our Code \\\\\

//This is a comments - This is great for notes for future reference or other programmers
//
// also good for blank lines and spacing

/*

anthing between these 2 symbols will be commented out

*/

// Great for Copyright notices or licenses