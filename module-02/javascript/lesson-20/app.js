/*************************************************
 * JavaScript Functions – Beginner Practice File
 * Topic:
 * 1. What is a function
 * 2. Callback function
 * 3. Call by value
 * 4. Call by reference
 *************************************************/


// -----------------------------------------------
// 1️⃣ BASIC FUNCTION
// -----------------------------------------------

// A function is a reusable block of code
function greet() {
  console.log("Hello World");
}

// function call / invoke
greet();


// -----------------------------------------------
// 2️⃣ FUNCTION WITH PARAMETERS & RETURN
// -----------------------------------------------

function add(a, b) {
  let sum = a + b;
  return sum; // value wapas bhejta hai
}

let addResult = add(10, 5);
console.log("Sum is:", addResult);


// -----------------------------------------------
// 3️⃣ CALLBACK FUNCTION
// -----------------------------------------------

// What is a Callback Function?
// Simple Definition

// A callback function is a function that is passed as an argument to another function and called later.

// 👉 Means:
// Function ko function ke andar bhejna = callback

// Real Life Example
// “Jab kaam complete ho jaye to mujhe call karna”

// main function jo callback accept karta hai
function main(cb, x) {
  console.log("Main function started");
  cb(x); // callback call
}

// callback function
function callback(x) {
  console.log("Callback function called with value:", x);
}

// function ko function ke andar pass kiya
main(callback, 4);
main(callback, 10);


// -----------------------------------------------
// 4️⃣ CALL BY VALUE (Primitive Types)
// -----------------------------------------------
// number, string, boolean → call by value

function updateValue(x) {
  x = x + 10;
  return x;
}

let num = 10;
let valueResult = updateValue(num);

console.log("Original num:", num);        // 10
console.log("Returned value:", valueResult); // 20


// -----------------------------------------------
// 5️⃣ CALL BY REFERENCE (Non-Primitive Types)
// -----------------------------------------------
// array, object → call by reference

function updateArray(arr) {
  arr[0] = 99;
  return arr;
}

let numbers = [10, 20];
let arrayResult = updateArray(numbers);

console.log("Original array:", numbers);   // [99, 20]
console.log("Returned array:", arrayResult); // [99, 20]


// -----------------------------------------------
// 6️⃣ COPY VS REFERENCE EXAMPLE
// -----------------------------------------------

// Call by VALUE
let x = 5;
let y = x;

y = 20;

console.log("x:", x); // 5
console.log("y:", y); // 20


// Call by REFERENCE
let arr1 = [1, 2];
let arr2 = arr1;

arr2[0] = 100;

console.log("arr1:", arr1); // [100, 2]
console.log("arr2:", arr2); // [100, 2]


// -----------------------------------------------
// 7️⃣ FUNCTION ACCEPTING OBJECT
// -----------------------------------------------

function showUser(user) {
  console.log("User name is:", user.name);
}

showUser({ name: "Ali" });