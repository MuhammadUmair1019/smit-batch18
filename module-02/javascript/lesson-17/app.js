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
      { id: 1, color: "black", price: 3000, quantity: 10 },
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
  }
];


let highestStock = 0;
let highestStockProduct = {};

for (let j = 0; j < products.length; j++) {
  let product = products[j];

  let totalQuantity = 0;

  for (let i = 0; i < product.variations.length; i++) {
    totalQuantity += product.variations[i].quantity;
  }

  if(totalQuantity > highestStock) {
    highestStock = totalQuantity
    highestStockProduct = product
  }

  console.log(totalQuantity);
}

console.log(highestStockProduct)
console.log(highestStock)

console.log(`Highest Stock Product: ${highestStockProduct.id} - ${highestStockProduct.title} (${highestStock})`)

// console.log(product)

// console.log(products[0].variations)

// ----------------------------------------------------------------------
// let highestStock = 0
// let highestStockProduct = {}

// for (let j = 0; j < products.length; j++) {
//   let product = products[j];

//   let totalQuantity = 0;

//   for (let i = 0; i < product.variations.length; i++) {
//     totalQuantity += product.variations[i].quantity;
//   }

//   if(totalQuantity > highestStock) {
//     highestStock = totalQuantity
//     highestStockProduct = product
//   }

//   // console.log(maxStock)
//   console.log(`Product ${product.id} = ${totalQuantity}`);
// }

// console.log(highestStockProduct)
// console.log(highestStock)

// let product = products[0];

// let maxVariation = product.variations[0]

// for(let i=0; i < product.variations.length; i++) {
//     if(product.variations[i].price > maxVariation.price) {
//       maxVariation  = product.variations[i]
//     }
// }

// // console.log(maxVariation.price)
// // console.log(product)
// console.log(`Most expansive variation: Product ${product.id} - ${maxVariation.price}`)

// for (let i = 0; i < products.length; i++) {
//   let product = products[i];

//   let totalRating = 0;

//   for (let i = 0; i < product.reviews.length; i++) {
//     totalRating += product.reviews[i].rating;
//   }

//   let avgRating = totalRating / product.reviews.length;

//   console.log(
//     `Product ${product.id} = ${avgRating}(${product.reviews.length})`,
//   );
// }

// console.log(totalRating)
// console.log(avgRating)
// console.log(product)

// console.log(products[0])
// console.log(products[1])
