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


for(let i=0; i < products.length; i++) {
let product = products[i]

let totalRating = 0;
for(let i=0; i< product.reviews.length; i++) {
    totalRating += product.reviews[i].rating
}
let avgRating = totalRating / product.reviews.length;

// console.log("Product " + product.id + " = " + avgRating + "(" + product.reviews.length +")") 
console.log(`Product ${product.id} = ${avgRating}(${product.reviews.length})`)
}


// console.log("Product " + products[0].id)
// console.log("Product " + products[1].id)


// -----------------------------------------------------------------------
// let product1 = {
//   title: "Mobile",
//   variations: [
//     { color: "black", price: 5000, quantity: 5 },
//     { color: "white", price: 6000, quantity: 4 },
//     { color: "green", price: 7000, quantity: 3 },
//   ],
//   reviews: [
//     {
//       name: "Ahmed",
//       rating: 4.5,
//       comment: "very good product",
//       date: "1/26/2026",
//       status: false,
//     },
//     {
//       name: "Ali",
//       rating: 5.0,
//       comment: "very good product",
//       date: "1/26/2026",
//       status: true,
//     },
//     {
//       name: "Baber",
//       rating: 3.0,
//       comment: "bad product",
//       date: "1/26/2026",
//       status: true,
//     },
//     {
//       name: "Mujtaba",
//       rating: 4.0,
//       comment: "good product",
//       date: "1/26/2026",
//       status: false,
//     },
//   ],
// };

// let product2 = {
//   title: "Mobile",
//   variations: [
//     { color: "black", price: 5000, quantity: 5 },
//     { color: "white", price: 6000, quantity: 4 },
//     { color: "green", price: 7000, quantity: 3 },
//   ],
//   reviews: [
//     {
//       name: "Ahmed",
//       rating: 4.5,
//       comment: "very good product",
//       date: "1/26/2026",
//       status: false,
//     },
//     {
//       name: "Ali",
//       rating: 5.0,
//       comment: "very good product",
//       date: "1/26/2026",
//       status: true,
//     },
//     {
//       name: "Baber",
//       rating: 3.0,
//       comment: "bad product",
//       date: "1/26/2026",
//       status: true,
//     },
//     {
//       name: "Mujtaba",
//       rating: 4.0,
//       comment: "good product",
//       date: "1/26/2026",
//       status: false,
//     },
//   ],
// };

// let maxVariation = product.variations[0]
// for(let i=0; i < product.variations.length; i++) {
//     if(product.variations[i].price > maxVariation.price) {
//       maxVariation = product.variations[i]
//     }
// }

// console.log(maxVariation)

// let arr = [4, 3, 10, 99];

// let max = arr[0];

// for (let i = 0; i < arr.length; i++) {
//   if(arr[i] > max) {
//     max = arr[i]
//   }

// }

// console.log(max)

// ---------------------------------------------------------------
// let approvedReviews = [];

// for (let i = 0; i < product.reviews.length; i++) {
//   if (product.reviews[i].status) {
//     approvedReviews.push(product.reviews[i]);
//   }
// }

// console.log(approvedReviews)

// for(let i=0; i<product.reviews.length; i++) {
//     if(product.reviews[i].status === true) {
//       console.log(product.reviews[i])
//     }
// }

// ---------------------------------------------------------------------------------
// let totalRating = 0;

// for (let i = 0; i < product.reviews.length; i++) {
//   totalRating = totalRating + product.reviews[i].rating;
// }

// let avgRating = totalRating / product.reviews.length;

// console.log("Average Rating:", avgRating);
// -------------------------------------------------------------------------------
// name, comment, rating, date,

// let totalPrice = 0;

// for (let i = 0; i < product.variations.length; i++) {
//   totalPrice = totalPrice + product.variations[i].price;
// }

// console.log("Total Price:", totalPrice);

// ---------------------------------------------------------------------------
// let totalQuantity = 0;

// for (let i = 0; i < product.variations.length; i++) {
//   totalQuantity = totalQuantity + product.variations[i].quantity
//   console.log(product.variations[i].quantity);
// }

// console.log("Total Quantity:", totalQuantity)

// ----------------------------------------------------------------
// for (let i = 0; i < product.variations.length; i++) {
//   console.log(product.variations[i].color);
// }

// console.log(product.variations[0].color)
// console.log(product.variations[1].color)

// let product = {
//   title: "Mobile",
//   quantity: 10,
//   price: [5000, 6000],
//   colors: ["black", "white"],

//   variations: [
//     { color: "black", price: 5000 },
//     { color: "white", price: 6000 },
//     { color: "green", price: 7000 },
//   ],
// };

// for (let i = 0; i < product.colors.length; i++) {
//   console.log(product.colors[i]);
// }

// console.log(product.colors[0])
// console.log(product.colors[1])
// console.log(product.colors[2])
// console.log(product.colors[3])

// console.log(product.title)
// console.log(product.color)
// console.log(product.quantity)

// -----------------------------------------------------
// let title = "Mobile";
// let quantity = 10;
// let price = 1000;
// let color = "black";
