// let calc = (x, y, f) => f(x, y);

// let sum = (x, y) => x + y;
// let sub = (x, y) => x - y;
// let mul = (x, y) => x * y;
// let div = (x, y) => x / y;
// let max = (x, y) => (x > y ? x : y);

// let result = calc(2, 1, max);
// console.log(result);

// -----------------------------------------------
// // variations -> left side arrow
// (x, y) => x + y;
// (x) => x + 1;
// () => console.log("Hello");
// _ => console.log("Hello");

// // variations -> right side arrow
// (x, y) => x + y;
// (x, y) => {
//   x = x + 1;
//   y = y + 1;
//   return x + y;
// };
// () => [2, 3, 4];
// () => ({id: 101, firstName: 'Ali'})

// arrow function
// let sum = (x, y) => x + y;
// let ans = sum(2, 3);
// console.log(ans)

// function sum(x, y) {
//     return x + y;
// }

// let ans = sum(2, 4);
// console.log(ans)

// ----------------------------------------------------------------
// // Arrow Functions in JavaScript

// // Definition:
// // An arrow function is a shorter way to write functions using =>

// // Returning an Object
// let z = () => ({ id: 101, name: "Ali" });
// console.log(z());

// // Short Form (Implicit Return)
// let sum = (a, b) => a + b;
// let result1 = sum(3, 3);
// console.log(result1);

// //Block Body (Explicit Return)
// let add = (a, b) => {
//     return a + b;
// };
// console.log(add(2, 3));

// // No Parameters
// let greet = () => console.log("Hello");
// greet();

// // Return Value Check
// let check = () => console.log("Hello");
// let result2 = check();
// console.log(result2); // undefined

// // Normal Function (Traditional Way)

// // Definition:
// // A normal function uses the 'function' keyword

// function y() {
//     console.log("Hello!");
// }

// y();
