// ===============================================
// JavaScript Lesson: Data Modeling & Memory Basics
// Lecture flow: Top to bottom
// ===============================================



// -----------------------------------------------
// 1️⃣ Variables: var, let, const (Mutation vs Re-declare)
// -----------------------------------------------

// Primitive data types
// string, number, boolean, null, undefined

// ❌ const cannot be reassigned
// const x = 20;
// x = 30; // Error

// ✅ let can be reassigned but NOT redeclared
let x = 10;
// let x = 20; // Error
x = 20;
console.log(x);

// ✅ var can be reassigned AND redeclared
var y = 10;
var y = 20;
y = 30;
console.log(y);



// -----------------------------------------------
// 2️⃣ Arrays & const behavior
// -----------------------------------------------

// const prevents reassignment, NOT mutation
const arr = [2, 3, 4];

// Mutating array values is allowed
arr[0] = 10;
arr[1] = 29;
arr[2] = 40;
arr[3] = 70;

console.log(arr);

// ❌ Reassigning a const array is NOT allowed
// arr = [3, 4, 5];


// var allows redeclaration
var nums = [2, 3, 4];
var nums = [3, 5, 6];
console.log(nums);



// -----------------------------------------------
// 3️⃣ Primitive vs Reference Types
// -----------------------------------------------

// Primitive values (copied by VALUE)
let a = 10;
let b = a;

b = 20;

console.log(a); // 10
console.log(b); // 20


// Objects are copied by REFERENCE
let userOne = { name: 'Ali', age: 20 };
let userTwo = userOne;

userTwo.name = 'Ahmed';

console.log('user one ->', userOne);
console.log('user two ->', userTwo);

// ⚠️ Both variables point to the SAME memory location



// -----------------------------------------------
// 4️⃣ Poor vs Better Data Modeling
// -----------------------------------------------

// ❌ Bad modeling (related data split into separate arrays)
// let product = {
//   title: 'Headphones',
//   price: [2000, 1000, 500],
//   colors: ['black', 'green', 'pink'],
// };

// Hard to maintain relationship between price & color


// ✅ Better modeling using objects
let productBasic = {
  title: 'Headphones',
  price: 1000,
  quantity: 5,
  colors: ['black', 'green', 'pink'],
};

console.log(productBasic.colors[1]);



// -----------------------------------------------
// 5️⃣ Best Practice: Nested Objects (Real-world Modeling)
// -----------------------------------------------

// Each variation keeps its own data together
let product = {
  title: "Headphones",
  variations: [
    { color: "black", price: 2000, quantity: 4 },
    { color: "green", price: 1000, quantity: 3 },
    { color: "pink", price: 500, quantity: 2 },
    { color: "blue", price: 300, quantity: 1 },
  ],
};



// -----------------------------------------------
// 6️⃣ Looping through nested data
// -----------------------------------------------

// Calculate total quantity from all variations
let totalQuantity = 0;

for (let i = 0; i < product.variations.length; i++) {
  totalQuantity += product.variations[i].quantity;
}

console.log('Total Quantity:', totalQuantity);



// Accessing individual values
// console.log(product.variations[0].quantity);
// console.log(product.variations[1].quantity);
// console.log(product.variations[2].quantity);



// -----------------------------------------------
// ✅ Key Takeaways
// -----------------------------------------------
// • Use objects to group related data
// • Prefer nested objects for real-world models
// • Primitives copy by value, objects by reference
// • const allows mutation but blocks reassignment
// • Good data modeling = easier loops, logic & scaling
