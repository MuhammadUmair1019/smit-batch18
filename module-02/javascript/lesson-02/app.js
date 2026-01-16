// =================================================
// LESSON NO 2
// JavaScript Basics – Primitive Data Types & Operators
// =================================================


// -------------------------------------------------
// Primitive (Basic) Data Types
// -------------------------------------------------
// number, string, boolean, undefined, null


// -------------------------------------------------
// 10. Concatenating text strings
// -------------------------------------------------
var t1 = "Mobile";
var t2 = "Laptop";

console.log(t1);
console.log(t2);
console.log(t1 + " " + t2);


// -------------------------------------------------
// 9. Numbers & Output Formatting
// -------------------------------------------------
var x = 10;

console.log("sum:");
console.log("sum:", x);
console.log("sum: " + x);


// -------------------------------------------------
// 8. Arithmetic Operators
// -------------------------------------------------
console.log("------------------");
console.log(4 + 2);   // Addition
console.log(4 - 2);   // Subtraction
console.log(4 * 2);   // Multiplication
console.log(4 / 2);   // Division
console.log(10 % 3);  // Remainder


// -------------------------------------------------
// 7. Operator Precedence & Associativity
// -------------------------------------------------
// ()   -> Parentheses
// **   -> Exponentiation (Right to Left)
// *,/,% -> Multiplication / Division / Remainder
// +,-  -> Addition / Subtraction

// Associativity in Math Operators
// Operators that have the same precedence are evaluated according to their associativity:

// Left-to-right associativity: Operators like +, -, *, / are evaluated from the left.
// Right-to-left associativity: The exponentiation operator ** is evaluated from the right.

var totalCost = 2 + 2 ** 2 ** 2;
console.log("Total Cost:", totalCost);

/*
Expression explanation step-by-step:

1. Parentheses ()
2. Exponentiation ** (Right-to-Left)
3. *, /, % (Left-to-Right)
4. +, - (Left-to-Right)
*/

var result = (5 + 3) * 2 ** 3 ** 2 / 4 + 10 - 6 % 4;

4096 / 4 + 10 - 6 % 4

/*
STEP-BY-STEP BREAKDOWN:

Step 1: Parentheses
(5 + 3) = 8

Expression becomes:
8 * 2 ** 3 ** 2 / 4 + 10 - 6 % 4

Step 2: Exponentiation (Right-to-Left)
3 ** 2 = 9
2 ** 9 = 512

Expression becomes:
8 * 512 / 4 + 10 - 6 % 4

Step 3: *, /, % (Left-to-Right)
8 * 512 = 4096
4096 / 4 = 1024
6 % 4 = 2

Expression becomes:
1024 + 10 - 2

Step 4: +, - (Left-to-Right)
1024 + 10 = 1034
1034 - 2 = 1032
*/

console.log("Final Result:", result); // 1032


// -------------------------------------------------
// 6. Parentheses Change Result
// -------------------------------------------------
var sum = 1 + (3 * 4);      // 13
var total = (1 + 3) * 4;   // 16

console.log("Sum:", sum);
console.log("Total:", total);


// -------------------------------------------------
// 5. Variables & Reassignment
// -------------------------------------------------
var value = 20;
console.log(value);

value = 10;
console.log(value);


// -------------------------------------------------
// 4. Undefined Variable
// -------------------------------------------------
var y;
console.log(y); // undefined


// -------------------------------------------------
// 3. Checking Data Types using typeof
// -------------------------------------------------
var name = "Ahmed";
console.log(typeof name, name);

var age = 20;
console.log(typeof age, age);

var isPass = true;
console.log(typeof isPass, isPass);

var marks;
console.log(typeof marks, marks);


// -------------------------------------------------
// 2. Multiple Variables
// -------------------------------------------------
var fullName = "Muhammad";
var isStudent = true;

console.log(isStudent, fullName);


// -------------------------------------------------
// 1. Browser Alert (Optional)
// -------------------------------------------------
// Uncomment to test in browser
// alert("Class 2");


// -------------------------------------------------
// End of Lesson 02
// -------------------------------------------------
