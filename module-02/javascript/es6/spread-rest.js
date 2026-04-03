// ===============================
// Array Destructuring Examples
// ===============================

let marks = [10, 30, 50];

// Skipping elements and getting the third value
let [, , third] = marks;
console.log("Third:", third);

// ------------------------

// Rest operator with array
// let [first, ...rest] = marks;
// console.log("Rest:", rest);

// ------------------------

// Basic destructuring
// let [first, second, third] = marks;
// console.log("First:", first);
// console.log("Second & Third:", second, third);


// ===============================
// Object Destructuring Examples
// ===============================

// let product = {
//   id: 1001,
//   title: "Mobile",
//   quantity: 2,
//   status: true,
// };

// Extracting properties with rest
// let { id, status, quantity, title, ...rest } = product;
// console.log("Title:", title);
// console.log("Rest:", rest);

// Renaming and default values
// let { title, quantity: qty, stock = 0 } = product;
// console.log("Stock:", stock);
// console.log("Qty:", qty);

// Traditional way (without destructuring)
// let title = product.title;
// let qty = product.quantity;
// console.log("Title:", title);
// console.log("Qty:", qty);


// ===============================
// Spread Operator with Objects
// ===============================

// let obj1 = { id: 101, name: "Ali", status: true };
// let obj2 = { ...obj1, id: obj1.id + 1 };

// console.log("Original Object:", obj1);
// console.log("Copied & Modified Object:", obj2);


// ===============================
// Spread Operator with Arrays
// ===============================

// let arr1 = [2, 4, 5];

// Copying array using spread
// let arr2 = [...arr1];

// arr2[0] = 99;

// console.log("Original Array:", arr1);
// console.log("Modified Copy:", arr2);


// ===============================
// Object Reference vs Copy
// ===============================

// let obj1 = { name: "Ali" };
// let obj2 = { ...obj1 };

// obj2.name = "Ahmed";

// console.log("Original Object:", obj1);
// console.log("Modified Copy:", obj2);


// ===============================
// Primitive Copy Example
// ===============================

let x = 10;
let y = x;

y = 20;

console.log("x:", x);
console.log("y:", y);