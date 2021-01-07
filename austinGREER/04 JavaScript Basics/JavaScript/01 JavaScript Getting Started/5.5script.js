///// 05 Project Flow: Section 5 - Looping with for() \\\\\
for (let i = 0; i < 3; i++) {
    console.log(i);
}                       // result = 0 1 2

// creating the variable 'i' and setting it = to 0
// 'i' can stand for 'index' or 'iterator', but at the end of the day it's simply a variable name.
//
// next is the condition -->  i < 3;
// so as long as 'i' meets the conditions specified (in this case i < 3) the code block will run
//
// when the code block finishes exicution, the script goes to the third part of the for() loop --> 'i++'
// ++ simply adds 1 (one) to the variable (so i now = 1). And since we're LOOPING we go back to the condition.
//
// Once the condition becomes false, the loop will stop running.


///// 05 Project Flow: Section 5 - Looping with while() \\\\\
let count = 0;

while (count <= 3) {
  console.log(count);
  count++;
}                      // result = 0 1 2 3