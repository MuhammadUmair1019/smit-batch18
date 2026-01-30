// Lesson 18 - Functions and Product Data

// -------------------
// What is a function?
// A function is a reusable block of code that performs a specific task.
// You can "call" the function whenever you need that task done.
// Functions can accept input values (called parameters) and can return output (result).

// Example: greet function
function greet(idx, name) {
  console.log(idx, `Hello ${name}`);
}

greet(1, "Ahmed"); // Output: 1 Hello Ahmed
greet(2, "Ali");   // Output: 2 Hello Ali

// -------------------
// Another example of a simple function without parameters
// function greet(idx) {
//   console.log(idx, "Hello World");
// }

// greet(1)
// greet(2)
// greet(3)

// -------------------
// Function with multiple statements (code block)
// function print() {
//   console.log("Hello Ahmed");
//   console.log("Hello Ali");
//   console.log("Hello Zubair");
//   console.log("Hello Mujtaba");
// }

// console.log("--------------------------");
// print();

// var x = 10;
// console.log(x);
// console.log("--------------------------");
// print();

// -------------------
// Products with variations (nested arrays)
// let products = [
//   {
//     id: 101,
//     title: "Airpods pro",
//     variations: [
//       { id: 1, color: "black", price: 200, quantity: 3 },
//       { id: 2, color: "green", price: 300, quantity: 4 },
//       { id: 3, color: "red", price: 400, quantity: 5 },
//     ],
//   },
//   {
//     id: 102,
//     title: "Mobile",
//     variations: [
//       { id: 1, color: "black", price: 6000, quantity: 2 },
//       { id: 2, color: "green", price: 3000, quantity: 3 },
//       { id: 3, color: "red", price: 4000, quantity: 1 },
//     ],
//   },
//   {
//     id: 103,
//     title: "Mobile",
//     variations: [
//       { id: 1, color: "black", price: 6000, quantity: 2 },
//       { id: 2, color: "green", price: 3000, quantity: 3 },
//       { id: 3, color: "red", price: 4000, quantity: 10 },
//     ],
//   },
// ];

// for (let k = 0; k < products.length; k++) {
//   let product = products[k];
//   let totalQuantity = 0;

//   for (let i = 0; i < product.variations.length; i++) {
//     totalQuantity += product.variations[i].quantity;
//   }

//   console.log(`Product ${product.id} = ${totalQuantity} Qty`);
// }

// -------------------
// Single product example
// let product = {
//   id: 101,
//   title: "Airpods pro",
//   variations: [
//     { id: 1, color: "black", price: 200, quantity: 3 },
//     { id: 2, color: "green", price: 300, quantity: 4 }
