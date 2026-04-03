let colors = ["red", "green", "red", "gray", "black", "green"];

let colorCount = colors.reduce((acc, color) => {
  acc[color] = (acc[color] || 0) + 1;
  return acc;
}, {});
console.log(colorCount);

// ----------------------------------------------
// let obj = {};
// // console.log(obj["red"]);
// obj["red"] = (obj["red"] || 0) + 1;
// console.log(obj);


// let colorCount = colors.reduce((acc, color) => {
//   acc[color] ? acc[color]++ : (acc[color] = 1);
//   return acc;
// }, {});
// console.log(colorCount);

// let colorCount = colors.reduce((acc, color) => {
//   if (acc[color]) {
//     acc[color]++;
//   } else {
//     acc[color] = 1;
//   }
//   return acc;
// }, {});

// let colorCount = {}

// for(let i=0; i < colors.length; i++) {
//   let color = colors[i];

//   if(colorCount[color]) {
//     colorCount[color]++
//   } else {
//     colorCount[color] = 1
//   }
// }
// console.log(colorCount)

// let colorCount = {
//   red: 1
// }

// colorCount['red'] = colorCount['red'] + 1
// console.log(colorCount)

// output
// {
//   red: 2,
//   green: 2,
//   gray: 1,
//   black: 1,
// }

// --------------------------------------------------------------
// let products = [
//   { id: 101, title: "LED", price: 5000 },
//   { id: 102, title: "Laptop", price: 3000 },
//   { id: 103, title: "Mobile", price: 1000 },
// ];

// products.sort((a, b) => (a.price > b.price ? -1 : 1));

// console.log(products);

// let arr = [5, 10, 2, 2, 1];
// arr.sort((a, b) => a - b);

// arr.sort((a, b) => (a < b ? -1 : 1));

// arr.sort((a, b) => {
//   return a < b ? -1 : 1;
// });

// arr.sort((a, b) => {
//     if(a < b) {
//         return -1;
//     } else if(a === b) {
//         return 0
//     }  else {
//         return 1
//     }
// })

// console.log(arr);

// reduce method
// let arr = [2, 3, 10, 5, 1]

// let ans = arr.reduce((acc, val) =>  acc + val, 0)

// let ans = arr.reduce((acc, val) => {
//     return acc + val
// }, 0)
// console.log(ans)

// let sum = 0;
// arr.forEach(x => sum += x)

// console.log(sum)

// ---------------------------------------------------------
// let products = [
//   {
//     id: 101,
//     title: "Mobile",
//     price: 500,
//     colors: ["red", "black", "green", "black"],
//   },
//   {
//     id: 102,
//     title: "Laptop",
//     price: 15000,
//     colors: ["gold", "gray", "green"],
//   },
//   {
//     id: 103,
//     title: "Airpod",
//     price: 300,
//     colors: ["black", "red", "white"],
//   },
// ];

// let filterProducts = products.filter((product) =>  product.colors.find((color) => color == "green"));

// let filterProducts = products.filter((product) =>  product.colors.filter((color) => color == "gold").length);

// let filterProducts = products.filter((product) => {
//   return product.colors.filter((color) => color == "black").length;
// });

// let filterProducts = products.filter((product) => {
//   let filteredColors = product.colors.filter((color) => color == "black");
//   console.log(filteredColors);

//   return filteredColors.length;
// });

// let filterProducts = products.filter((product) => {
//   let isMatch = false;

//   product.colors.forEach((color) => {
//     if (color === "black") {
//       isMatch = true;
//     }
//   });

//   return isMatch;
// });

// let filterProducts = products.filter((product) => {
//   let isMatch = false;

//   for (let i = 0; i < product.colors.length; i++) {
//     if (product.colors[i] === "black") {
//       isMatch = true;
//     }
//   }

//   return isMatch
// });

// console.log(filterProducts);

// let filterProducts = products.filter((product) => product.price < 1000);
// console.log(filterProducts);

// let array = [10, 20, 30, 40, 30];
// let copyArr = array.map(x => x + 10); // any expression
// let filteredArr = array.filter(x => x === 30); // boolean expression
// let searchItem = array.find(x => x == 60)

// // array.forEach(x => {
// //     console.log(x)
// // })
// console.log(searchItem)
// console.log(copyArr)
// console.log(filteredArr)

// function mul(x) {
//     return x * 2
// }
// array.map(x => mul(x))
