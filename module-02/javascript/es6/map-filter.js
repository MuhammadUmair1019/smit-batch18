let products = [
  {
    id: 101,
    title: "Mobile",
    variations: [
      { id: 1, color: "black", price: 5000, quantity: 5 },
      { id: 2, color: "white", price: 6000, quantity: 4 },
      { id: 3, color: "green", price: 7000, quantity: 3 },
    ],
    reviews: [
      {
        id: 110,
        name: "Ahmed",
        rating: 4.5,
        comment: "very good product",
        date: "1/26/2026",
        status: false,
      },
      {
        id: 111,
        name: "Ali",
        rating: 5.0,
        comment: "very good product",
        date: "1/26/2026",
        status: true,
      },
      {
        id: 112,
        name: "Baber",
        rating: 3.0,
        comment: "bad product",
        date: "1/26/2026",
        status: true,
      },
      {
        name: "Mujtaba",
        rating: 4.0,
        comment: "good product",
        date: "1/26/2026",
        status: false,
      },
    ],
  },
  {
    id: 102,
    title: "Airpod",
    variations: [
      { id: 1, color: "black", price: 3000, quantity: 3 },
      { id: 2, color: "red", price: 4000, quantity: 2 },
      { id: 3, color: "silver", price: 5000, quantity: 1 },
    ],
    reviews: [
      {
        id: 110,
        name: " Zubair",
        rating: 5.0,
        comment: "very good product",
        date: "1/26/2026",
        status: false,
      },
      {
        id: 111,
        name: "Rehman",
        rating: 4.5,
        comment: "very good product",
        date: "1/26/2026",
        status: true,
      },
      {
        id: 112,
        name: "Baber",
        rating: 3.0,
        comment: "bad product",
        date: "1/26/2026",
        status: true,
      },

    ],
  },
];

let titles = products.map(product =>  product.title)
// for(let i=0; i < products.length; i++) {
//     titles.push(products[i].title)
// }

console.log(titles)





let marks = [10, 20, 30];
let filterdArr = marks.filter((m) => m < 30).map((m) => m + 10);

// console.log(filterdArr);
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
