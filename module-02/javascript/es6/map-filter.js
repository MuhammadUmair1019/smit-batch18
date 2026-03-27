// Array map() Method in JavaScript

// Definition:
// map() creates a new array by applying a function to each element of the original array

let marks = [30, 40, 50];

//  Using arrow function with ternary operator
let modifiedMarks = marks.map((m) => (m < 40 ? m + 10 : m));

console.log(marks);
console.log(modifiedMarks);

// Using arrow function with if-else
// let modifiedMarks = marks.map((m) => {
//     if (m < 40) {
//         return m + 10;
//     } else {
//         return m;
//     }
// });


// let modifiedMarks = marks.map((m) => m + 10);

//  Traditional loop (without map)
// let copyArr = [];
// for (let i = 0; i < marks.length; i++) {
//     copyArr.push(marks[i] + 10);
// }

// console.log(marks);
// console.log(copyArr);
