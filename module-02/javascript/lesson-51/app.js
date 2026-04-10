
// function test() {
//   console.log(arguments);
// }

// test(2)

// function sum(a, ...rest) {
//   return rest.reduce((acc, curr) => {
//     return acc + curr;
//   }, 0);
// }

// console.log(sum(2, 4, 6, 8, 1, 12));

// (function (x) {
//   console.log(x, "IIFE executed");
// })(2)

// (x => console.log(x, "IIFE executed"))(2)

// test()

// if (true) {
//   let x = 10;
//   console.log(x);
// }

// console.log(x);

// function test() {
//     var y = 10;
//     console.log(y)
// }

// console.log(y)

// function test() {
//   let x = 10;
//   console.log(x);

//   function z() {
//     console.log(x)
//   }
//   z()
// }

// test();
// console.log(x); // error

// ------------------------------------------
// const greet = function sayHello() {
//   console.log("Hello");
// };

// greet()
// sayHello(); // ??
// sayHello();

// var sayHello = function () {
//   console.log("Hello");
// }

// console.log(x)

// let x = 10;

// function greet(name = "Guest") {
//   console.log("Hello " + name);
// }

// greet("Umair");
// greet(); // Guest
// -----------------------------------------
// let key = "city"

// const user = {
//   name: "Umair",
//   [key]: "Pakistan"
// };

// console.log(user)

// -------------------------------------
// const user = { age: undefined };

// console.log(user.age || 2); // 2
// console.log(user.age ?? 3); // 3

// ---------------------------------------
// Optional Chaining ?.
// let user = {};

// console.log(user.address?.city);

// const obj1 = { a: 1 };
// const obj2 = { b: 2 };

// const result = Object.assign({}, obj1, obj2);
// console.log(result);

// --------------------------------
// const obj1 = { a: 1 };
// const obj2 = { a: 1 };

// console.log(JSON.stringify(obj1) === JSON.stringify(obj2))

// console.log({} == {})
// console.log([] == [])

// const user = { name: "Umair" };
// Object.freeze(user)

// user.name = "Ali"

// console.log(user)

// --------------------------------------------------------
// let arr = [3, 5, 6];

// let result = arr.findIndex((x) => x === 8);
// console.log(result);

// ----------------------------------------------------------
// let arr1 = [2, 4]
// let arr2 = [6, 8]

// // let arr3 = [...arr1, ...arr2]
// let arr3 = arr1.concat(arr2)
// console.log(arr3)

// let obj1 = { a: 1 };
// let obj2 = { b: 2 };

// let obj3 = { ...obj1, ...obj2 };

// console.log(obj1)
// console.log(obj2)
// console.log(obj3)

// --------------------------------------------------------

// let userOne = {
//   name: "Ali",
//   age: 43,
//   address: {
//     country: "Pakistan",
//   },
// };

// let userTwo = { ...userOne, address: { ...userOne.address } };

// userTwo.name = "Sunny";
// userTwo.address.country = "US";

// let deepCopy = JSON.parse(JSON.stringify(userOne))
// deepCopy.address.country = "China"

// const deepCopy2 = structuredClone(userOne);
// deepCopy2.address.country = "Iran"

// console.log(userOne);
// console.log(userTwo);
// console.log(deepCopy)
// console.log(deepCopy2)

// let userTwo = {
//     name: 'Ahmed',
//     age: 43
// }

// ----------------------------------------------------
// function greet(a, b) {
//   console.log("Hello", a, b, this);
// }

// const user = {
//   name: "Ali",
// };

// greet.call(user, 2, 3);
// greet.apply(user, [2, 4]);
// let fn = greet.bind(user);
// fn(2, 5);
