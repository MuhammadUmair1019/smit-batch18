// =================================================
// LESSON 03
// JavaScript Conditions, Comparisons & Type Conversion
// =================================================

// -------------------------------------------------
// 8. if / else Statements
// -------------------------------------------------
// var age = 18;

var marks = +prompt("Write your marks");

if (marks >= 80) {
  console.log("Your Grade is A+1");
} else if (marks >= 70) {
  console.log("Your Grade is A");
} else if (marks >= 60) {
  console.log("Your Grade is B");
} else if (marks >= 50) {
  console.log("Your Grade is C");
} else if (marks >= 40) {
  console.log("Your Grade is D");
} else {
  console.log("You are Fail");
}


console.log("-------------------------------------");
// if (age >= 18) {
//   console.log("Eligible to vote");
// } else {
//   console.log("Not eligible to vote");
// }

// var isLoggedIn = true;

// if (isLoggedIn) {
//   console.log("User is logged in");
// } else {
//   console.log("User is not logged in");
// }

// -------------------------------------------------
// 7. Comparison Operators
// -------------------------------------------------
// >   Greater than
// <   Less than
// >=  Greater than or equal to
// <=  Less than or equal to

console.log(19 > 18); // true
console.log(18 > 18); // false
console.log(18 >= 18); // true

console.log("-----------------");

console.log(15 < 18); // true
console.log(16 < 18); // true
console.log(18 <= 18); // true

// -------------------------------------------------
// 6. Equality Operator (==)
// -------------------------------------------------
var userInput = "Ahmed";
var storedName = "Ahmed";

console.log(userInput == storedName); // true
console.log(18 == 20); // false
console.log(true == false); // false

// -------------------------------------------------
// 5. Using prompt() and alert() (Browser Only)
// -------------------------------------------------
// Uncomment to test in browser

// var userName = prompt("What is your name?");
// alert("Welcome " + userName);
// console.log(userName);

// -------------------------------------------------
// 4. Type Conversion (String ↔ Number)
// -------------------------------------------------
var x = 10;
var y = "2";
var z = "abc";

console.log(typeof y); // string
console.log(typeof parseInt(y)); // number
console.log(typeof +y); // number

console.log(x + parseInt(y)); // 12
console.log(x + +y); // 12
console.log(x * y); // 20
console.log(x / y); // 5
console.log(x * z); // NaN (Not a Number)

// -------------------------------------------------
// 3. String + Number Behavior
// -------------------------------------------------
console.log(x + y); // "102" (string concatenation)

var result = x + z;
console.log(result); // "10abc"

// -------------------------------------------------
// 2. String Operations
// -------------------------------------------------
var t1 = "Mobile";
var t2 = "Laptop";

console.log(t1 + " " + t2); // Mobile Laptop
console.log(t1 * t2); // NaN

// -------------------------------------------------
// 1. Primitive (Basic) Data Types (Revision)
// -------------------------------------------------
// string, number, boolean, undefined, null

var total = (1 + 3) * 4;
console.log(total); // 16

var name = "Ahmed";
console.log(name);

var isActive = true;
console.log(isActive);

// -------------------------------------------------
// End of Lesson 03
// -------------------------------------------------
