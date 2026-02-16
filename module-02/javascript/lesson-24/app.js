// window.alert("Hello")
// alert("Hello")


// let x = 10;

// function print() {
//   // let x = 40;
//   // x = 50;

//   console.log(x);

//   const y = 20;
//   console.log(y);
// }

// print(); // 50
// console.log("x ->", x); // 10
// console.log("y ->", y);

// console.log("x ->", x);
// console.log("y ->", y);
// let products = [
//   {
//     id: 101,
//     title: "Mobile",
//     variations: [
//       { id: 1, color: "black", price: 5000, quantity: 5 },
//       { id: 2, color: "white", price: 6000, quantity: 4 },
//       { id: 3, color: "green", price: 7000, quantity: 3 },
//     ],
//     reviews: [
//       {
//         id: 110,
//         name: "Ahmed",
//         rating: 4.5,
//         comment: "very good product",
//         date: "1/26/2026",
//         status: false,
//       },
//       {
//         id: 111,
//         name: "Ali",
//         rating: 5.0,
//         comment: "very good product",
//         date: "1/26/2026",
//         status: true,
//       },
//       {
//         id: 112,
//         name: "Baber",
//         rating: 3.0,
//         comment: "bad product",
//         date: "1/26/2026",
//         status: true,
//       },
//       {
//         name: "Mujtaba",
//         rating: 4.0,
//         comment: "good product",
//         date: "1/26/2026",
//         status: false,
//       },
//     ],
//   },
//   {
//     id: 102,
//     title: "Airpod",
//     variations: [
//       { id: 1, color: "black", price: 3000, quantity: 10 },
//       { id: 2, color: "red", price: 4000, quantity: 2 },
//       { id: 3, color: "silver", price: 5000, quantity: 1 },
//     ],
//     reviews: [
//       {
//         id: 110,
//         name: "Zubair",
//         rating: 5.0,
//         comment: "very good product",
//         date: "1/26/2026",
//         status: false,
//       },
//       {
//         id: 111,
//         name: "Rehman",
//         rating: 4.5,
//         comment: "very good product",
//         date: "1/26/2026",
//         status: true,
//       },
//       {
//         id: 112,
//         name: "Baber",
//         rating: 3.0,
//         comment: "bad product",
//         date: "1/26/2026",
//         status: true,
//       },
//     ],
//   },
// ];

// console.log(products)
// console.log(products[1].variations[2])

// function countReviews(product) {
//   let reviewsLength = product.reviews.length;
//   return reviewsLength;
// }

// function avgRating(product) {
//   let totalRating = 0;

//   for (let i = 0; i < product.reviews.length; i++) {
//     totalRating += product.reviews[i].rating;
//   }

//   let avg = totalRating / product.reviews.length;

//   return avg.toFixed(1);
// }

// Product 101 = 4.1(4)
// Product 102 = 4.2(3)

// function display(products) {
//   for (let i = 0; i < products.length; i++) {
//     let product = products[i];
//     console.log(
//       `Product ${product.id} = ${avgRating(product)}(${countReviews(product)})`,
//     );
//   }
// }

// display(products)

// display(products)

// display(products)

// display(products)

// console.log(countReviews(products[1]));
// console.log(avgRating(products[1]));

// const product = products[1]
// const reviewsCount = product.reviews.length;

// console.log(product)
// console.log(reviewsCount)

// -------------------------------------------------------------
// const now = new Date();
// const before = new Date("January 10, 2026");

// const diff = now.getTime() - before.getTime();
// console.log(now)
// console.log(before)

// const minutes = Math.round(diff / 1000 / 60);
// const hours = Math.round(minutes / 60)
// const days = Math.round(hours / 24)

// console.log(diff);
// console.log(minutes);
// console.log(hours);
// console.log(days);

// console.log(now)
// console.log(now.toDateString())
// console.log(now.toLocaleDateString())

// console.log(now.getFullYear())
// console.log(now.getMonth())
// console.log(now.getDate())
// console.log(now.getDay())
