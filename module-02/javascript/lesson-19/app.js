// Lesson 19 - Functions with Real Product Data (Detailed)

// We have an array of products
// Each product contains:
// 1) basic info (id, title)
// 2) variations (colors, price, quantity)
// 3) reviews (rating, comment, status)

let products = [
  {
    id: 101,
    title: "Mobile",

    // variations = different versions of the same product
    variations: [
      { id: 1, color: "black", price: 5000, quantity: 5 },
      { id: 2, color: "white", price: 6000, quantity: 4 },
      { id: 3, color: "green", price: 7000, quantity: 3 },
    ],

    // reviews = customer feedback
    reviews: [
      { id: 110, name: "Ahmed", rating: 4.5, comment: "very good product", date: "1/26/2026", status: false },
      { id: 111, name: "Ali", rating: 5.0, comment: "very good product", date: "1/26/2026", status: true },
      { id: 112, name: "Baber", rating: 3.0, comment: "bad product", date: "1/26/2026", status: true },
      { name: "Mujtaba", rating: 4.0, comment: "good product", date: "1/26/2026", status: false },
    ],
  },

  {
    id: 102,
    title: "Airpod",
    variations: [
      { id: 1, color: "black", price: 3000, quantity: 10 },
      { id: 2, color: "red", price: 4000, quantity: 2 },
      { id: 3, color: "silver", price: 5000, quantity: 1 },
    ],
    reviews: [
      { id: 110, name: "Zubair", rating: 5.0, comment: "very good product", date: "1/26/2026", status: false },
      { id: 111, name: "Rehman", rating: 4.5, comment: "very good product", date: "1/26/2026", status: true },
      { id: 112, name: "Baber", rating: 3.0, comment: "bad product", date: "1/26/2026", status: true },
    ],
  },
];

// -----------------------------------------
// FUNCTION 1: Count total reviews
// Input: reviews array
// Output: number of reviews

function countReviews(reviews) {
  return reviews.length;
}

// -----------------------------------------
// FUNCTION 2: Calculate average rating
// Input: complete product object
// Logic:
// 1) Loop through reviews
// 2) Add all ratings
// 3) Divide by total reviews

function avgRating(product) {
  let totalRating = 0;

  for (let i = 0; i < product.reviews.length; i++) {
    totalRating += product.reviews[i].rating;
  }

  return totalRating / product.reviews.length;
}

// -----------------------------------------
// FUNCTION 3: Display product summary
// Uses other functions inside it (function reuse)

function display(product) {
  console.log(
    `Product ${product.id} = ${avgRating(product)} (${countReviews(product.reviews)} reviews)`
  );
}

// -----------------------------------------
// Loop through all products and display info

for (let i = 0; i < products.length; i++) {
  display(products[i]);
}

// -----------------------------------------
// SAME LOGIC WITHOUT FUNCTIONS (BAD PRACTICE)

for (let i = 0; i < products.length; i++) {
  let product = products[i];
  let totalRating = 0;

  for (let j = 0; j < product.reviews.length; j++) {
    totalRating += product.reviews[j].rating;
  }

  let avg = totalRating / product.reviews.length;

  console.log(
    `Product ${product.id} = ${avg} (${product.reviews.length} reviews)`
  );
}

// ❌ Problem:
// - Code repetition
// - Hard to maintain
// - Not reusable

// ✅ Solution: Use functions


// What is a function?
// A function is a reusable block of code that performs a specific task.
// You can "call" the function whenever you need that task done.
// Functions can accept input values (called parameters) and can return output (result).

// function calc(a, b, op) {
//   // console.log(a, b, op)
//   if (op === "+") {
//     return a + b;
//   }

//   if (op === "-") {
//     return a - b;
//   }

//   if (op === "*") {
//     return a * b;
//   }

//   if (op === "/") {
//     return a / b;
//   }

//   return "Operator is not define!"
// }

// let result = calc(6, 4, "+");

// console.log(result);

// function add(a, b) {
//   let sum = a + b;

//   return sum
// }

// function mul(a, b) {
//   let mul = a * b;

//   return mul
// }

// console.log("Sum", add(4, 4))

// console.log("Mul", mul(2, 3))

// let result = add(4, 4)
// console.log(result)

// console.log(2 + 2)
// console.log(4 + 2)

// -----------------------------------------
// function test() {
//   let x = "Hello, World"

//   return x
// }

// let result = test()

// console.log(result)

// console.log(test())

// function greet(name) {
//   console.log(`Hello ${name}`)
// }

// greet("Zubair")
// greet("Ali")

// function print() {
//   console.log("Hello Ahmed");
//   console.log("Hello Ali");
//   console.log("Hello Zubair");
//   console.log("Hello Mujtaba");
// }

// console.log("Hello Ahmed");
// console.log("Hello Ali");
// console.log("Hello Zubair");
// console.log("Hello Mujtaba");

// print()

// console.log("-------------------");

// print()
// console.log("Hello Ahmed");
// console.log("Hello Ali");
// console.log("Hello Zubair");
// console.log("Hello Mujtaba");

// console.log("-------------------");

// print()
// console.log("Hello Ahmed");
// console.log("Hello Ali");
// console.log("Hello Zubair");
// console.log("Hello Mujtaba");
