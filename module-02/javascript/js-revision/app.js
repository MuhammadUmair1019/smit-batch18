// ======================================================
// REVISION: IF / ELSE, COMPARISON & LOGICAL OPERATORS
// ======================================================

var name = "Ali"; // Student name (String)
var attendance = true; // Attendance status (Boolean)

// prompt() always returns a STRING
// Using + converts it into a NUMBER
var marks = +prompt("Enter your marks (0 - 100):");

console.log("Marks:", marks);
console.log("Type of marks:", typeof marks);

// ------------------------------------------------------
//  GRADING SYSTEM USING IF / ELSE IF / ELSE
// ------------------------------------------------------
//
// 80 - 100  => A
// 70 - 79   => B
// 60 - 69   => C
// 50 - 59   => D
// Below 50  => F
//

if (marks >= 80 && marks <= 100) {
  console.log("Grade: A");
} else if (marks >= 70 && marks <= 79) {
  console.log("Grade: B");
} else if (marks >= 60 && marks <= 69) {
  console.log("Grade: C");
} else if (marks >= 50 && marks <= 59) {
  console.log("Grade: D");
} else if (marks >= 0 && marks < 50) {
  console.log("Grade: F");
} else {
  alert("❌ Invalid Marks! Please enter between 0 and 100.");
}

// ------------------------------------------------------
// 3. SIMPLIFIED GRADING LOGIC (BETTER PRACTICE)
// ------------------------------------------------------
//
// Why this works?
// Because conditions are checked from TOP to BOTTOM.
//

/*
if (marks >= 80) {
  console.log("Grade: A");
} else if (marks >= 70) {
  console.log("Grade: B");
} else if (marks >= 60) {
  console.log("Grade: C");
} else if (marks >= 50) {
  console.log("Grade: D");
} else {
  console.log("Grade: F");
}
*/

// ------------------------------------------------------
// LOGICAL OPERATORS
// ------------------------------------------------------

// AND (&&) → All conditions must be TRUE
// OR  (||) → At least one condition must be TRUE

// Example: Pass criteria
/*
if (marks >= 50 && attendance === true) {
  console.log("Student Passed ✅");
} else {
  console.log("Student Failed ❌");
}
*/

// OR example
/*
if (marks >= 50 || attendance === true) {
  console.log("Allowed to sit in exam");
} else {
  console.log("Not allowed");
}
*/

// ------------------------------------------------------
// COMPARISON OPERATORS
// ------------------------------------------------------

// ==  → checks VALUE only
// === → checks VALUE + TYPE (Recommended)

console.log("== vs === examples");
console.log(80 == "80"); // true  (value same)
console.log(80 === "80"); // false (type different)

// !=  → not equal
// !== → not equal (value + type)

console.log(80 !== 60); // true
console.log(80 !== 80); // false

// ------------------------------------------------------
// GREATER / LESS THAN OPERATORS
// ------------------------------------------------------

console.log(marks > 70); // greater than
console.log(marks >= 80); // greater than or equal
console.log(marks < 50); // less than
console.log(marks <= 100); // less than or equal

// ------------------------------------------------------
//BOOLEAN VALUES IN IF CONDITIONS
// ------------------------------------------------------

var isPresent = true;

if (isPresent) {
  console.log("Student is Present 🟢");
} else {
  console.log("Student is Absent 🔴");
}

// ------------------------------------------------------
//  TYPE COERCION (IMPORTANT CONCEPT)
// ------------------------------------------------------

var x = 10;
var y = "5";

console.log(x + y); // "105" (string concatenation)
console.log(x - y); // 5
console.log(x * y); // 50
console.log(x / y); // 2

// ------------------------------------------------------
// STRING CONCATENATION
// ------------------------------------------------------

var firstName = "Ahmed";
var lastName = "Ali";

console.log(firstName + " " + lastName);

// ------------------------------------------------------
// ARITHMETIC OPERATORS
// ------------------------------------------------------

console.log(2 + 2); // Addition
console.log(5 - 2); // Subtraction
console.log(2 * 3); // Multiplication
console.log(10 / 2); // Division
console.log(10 % 3); // Remainder (Modulus)
console.log(2 ** 3); // Power (Exponent)

// ------------------------------------------------------
// VARIABLE NAMING RULES
// ------------------------------------------------------

// Valid variable names
var userName = "";
var $price = 0;
var _count = 1;

// Invalid variable names
// var 12user = ""; ❌
// var user-name = ""; ❌

// ------------------------------------------------------
// PRIMITIVE DATA TYPES
// ------------------------------------------------------
//
// number
// string
// boolean
// undefined
// null
//

var score = 90; // number
var studentName = "Ali"; // string
var active = true; // boolean
var value = null; // null

console.log(typeof score);
console.log(typeof studentName);
console.log(typeof active);
console.log(typeof value); // object (JavaScript quirk)
