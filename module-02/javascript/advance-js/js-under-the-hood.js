console.log("START");
setTimeout(() => {
  console.log("TIMEOUT 1 !");
}, 1000);
setTimeout(() => {
  console.log("TIMEOUT 2 !");
}, 1000);
setTimeout(() => {
  console.log("TIMEOUT 3 !");
}, 1000);
console.log("END");

// console.log("START");

// for (let i = 0; i < 1000000000; i++) {
//   console.log(i);
// }

// console.log("END");
// --------------------------------------------------------------------
// let product = [
//   { id: 101, title: "Product 01", quantity: 1 },
//   { id: 102, title: "Product 02", quantity: 3 },
// ];
// localStorage.setItem("theme", "light");
// localStorage.setItem("cart", JSON.stringify(product));
// const theme = localStorage.getItem("theme");

// localStorage.removeItem("theme");
// console.log(theme);

// let theme = "light";

// document.querySelector("h1").addEventListener("click", () => {
//   theme = "dark";
//   console.log(theme);
// });

// ---------------------------------------------------------------------
// function z() {
//   for (var i = 1; i <= 3; i++) {
//     function y(i) {
//       setTimeout(() => {
//         console.log(i);
//       }, i * 1000);
//     }
//     y(i);
//   }
// }

// z();

// function z() {
//   setTimeout(function () {
//     console.log("TIMEOUT!");
//   }, 3000);

//   console.log("HELLO");
// }

// z();

// -------------------------------------
// function x() {
//   var a = 10;

//   function y() {
//     console.log(a);
//   }

//   // y();
//   return y;
// }

// x();
// var result = x();
// result();
// console.log(result);

// -----------------------------------------------------------
// var x = 20;

// if (true) {
//   var x = 30;
//   console.log(x);
// }

// console.log(x);

// ----------------------------------------------------

// function a() {
//   var z = 20;
// }

// console.log(z);

// console.log(x);

// console.log(y);
// console.log(x);

// var x = 10;
// let y = 20;

// -----------------------------------------------------
// var a = 10;

// function z(b) {
//   console.log(b);
// }

// z(4);
// console.log(a);

// x -> undefined
// b -> {...}
// let d = 100;
// function a() {
//   var x = 10;
//   console.log(k);
//   function b() {
//     var z = 20;
//     console.log(x);

//     c();
//     function c() {
//       let k = 200;
//       console.log(d);
//       console.log(z);
//     }
//   }
//   b();
// }
// a();
// console.log(x);
// var x = 5;

// // console.log(y);
// function y(a) {
//   var z = 20;
//   console.log(a);
//   console.log(z);
// }

// y(2);
// console.log(x);

// ------------------------------------------
// console.log(x);
// var x = 10;

// console.log(sum);
// function sum(a, b) {
//   let ans = a + b;
//   return ans;
// }

// sum(2, 3);
// console.log(x);
// // setTimeout(() => {
// //     console.log("Timeout!");
// //   }, 3000);
// // console.log()
