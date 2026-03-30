let marks = [10, 20, 30];
let filterdArr = marks.filter((m) => m < 30).map((m) => m + 10);

console.log(filterdArr);
// let filterdArr = marks.filter(m => m < 30); // []

// filterdArr = filterdArr.map(m => m + 10)

// console.log(filterdArr);

// let filterdArr = marks.filter((m) => {
//     if(m < 30) {
//         return true
//     } else {
//         return false
//     }
// }); // []

// console.log(filterdArr)

// any expression
// marks.map((m) =>m + 10);

let copyMarks = marks.map((m) => {
  if (m < 30) {
    return m + 10;
  } else {
    return m;
  }
}); // [20, 30, 40]

// console.log(marks);
// console.log(copyMarks)

// -------------------------------------------
// let marks = [10, 20, 30]; // [20, 30, 40]
// let copyArr = [];

// for(let i=0; i < marks.length; i++) {
//     copyArr.push(marks[i] + 10)
// }

// console.log(marks)
// console.log(copyArr)

// ------------------------------------------
// // Array map() Method in JavaScript

// // Definition:
// // map() creates a new array by applying a function to each element of the original array

// let marks = [30, 40, 50];

// //  Using arrow function with ternary operator
// let modifiedMarks = marks.map((m) => (m < 40 ? m + 10 : m));

// console.log(marks);
// console.log(modifiedMarks);

// // Using arrow function with if-else
// // let modifiedMarks = marks.map((m) => {
// //     if (m < 40) {
// //         return m + 10;
// //     } else {
// //         return m;
// //     }
// // });

// // let modifiedMarks = marks.map((m) => m + 10);

// //  Traditional loop (without map)
// // let copyArr = [];
// // for (let i = 0; i < marks.length; i++) {
// //     copyArr.push(marks[i] + 10);
// // }

// // console.log(marks);
// // console.log(copyArr);
