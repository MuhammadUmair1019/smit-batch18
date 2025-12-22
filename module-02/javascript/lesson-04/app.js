// =================================================
// LESSON 04 – Truthy & Falsy, Strings, Comparisons
// =================================================

// -------------------------------------------------
//  Truthy & Falsy Values
// -------------------------------------------------

// ❌ Falsy values in JavaScript:
// false, 0, -0, "", undefined, null, NaN

var x = "";

if (x) {
  console.log("TRUE");
} else {
  console.log("FALSE");
}

// -------------------------------------------------
// String Indexing
// -------------------------------------------------

var fullName = "Ahmed Zubair";

// A  h  m  e  d
// 0  1  2  3  4

console.log("Length:", fullName.length);

var index = fullName.length - 4;

console.log("Using []:", fullName[index]);
console.log("Using charAt():", fullName.charAt(index));

// -------------------------------------------------
// Another String Indexing Example
// -------------------------------------------------

var fullName2 = "Ahmed Ali";

// A  h  m  e  d     A  l  i
// 0  1  2  3  4  5  6  7  8

console.log("Last Character:", fullName2[fullName2.length - 1]);
console.log("First Character:", fullName2.charAt(0));
console.log("Total Length:", fullName2.length);

// -------------------------------------------------
// Not Equal Operators (!= vs !==)
// -------------------------------------------------

var a = 10; // number
var b = "10"; // string

if (a !== b) {
  console.log("Not Equal (value or type mismatch)");
} else {
  console.log("Equal");
}

console.log(10 !== 8); // true

// -------------------------------------------------
//  Equality Operators (== vs ===)
// -------------------------------------------------

if (a === b) {
  console.log("Equal");
} else {
  console.log("Not Equal (type matters)");
}

// -------------------------------------------------
//  Comparison Operators
// -------------------------------------------------

// ==  Equal to
// >   Greater than
// <   Less than
// >=  Greater than or equal to
// <=  Less than or equal to

console.log(10 > 5); // true
console.log(10 <= 5); // false

// -------------------------------------------------
// String Methods
// -------------------------------------------------

var t1 = "       mobile ";
var t2 = "Mobile";

console.log("Trimmed:", t1.trim());
console.log("Uppercase:", t1.toUpperCase());
console.log("Lowercase:", t1.toLowerCase());

if (t1.toLowerCase().trim() === t2.toLowerCase()) {
  console.log("Strings are Equal");
} else {
  console.log("Strings are Not Equal");
}

// -------------------------------------------------
// Simple String Comparison
// -------------------------------------------------

var s1 = "mobile";
var s2 = "mobile";

console.log(s1 === s2); // true

// =================================================
// END OF LESSON 04
// =================================================
