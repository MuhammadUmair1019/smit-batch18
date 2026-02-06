/*************************************************
 * JavaScript Functions – Practical Exercises
 * SOLUTION FILE
 * Topics:
 * - Real-life functions
 * - Callback functions
 * - Call by value
 * - Call by reference
 *************************************************/


// -----------------------------------------------
// Exercise 1: Price After Discount
// -----------------------------------------------

function applyDiscount(price, discount) {
  return price - discount;
}

console.log(applyDiscount(1000, 200)); // 800
console.log(applyDiscount(500, 50));   // 450


// -----------------------------------------------
// Exercise 2: Student Passed or Failed
// -----------------------------------------------

function checkResult(marks) {
  if (marks >= 50) {
    return "Pass";
  } else {
    return "Fail";
  }
}

console.log(checkResult(70)); // Pass
console.log(checkResult(40)); // Fail


// -----------------------------------------------
// Exercise 3: Callback – Order Processing
// -----------------------------------------------

function placeOrder(callback) {
  console.log("Order placed");
  callback();
}

function orderReady() {
  console.log("Order is ready!");
}

placeOrder(orderReady);


// -----------------------------------------------
// Exercise 4: Callback with Data (OTP)
// -----------------------------------------------

function sendOTP(cb, otp) {
  console.log("Sending OTP...");
  cb(otp);
}

function receiveOTP(otp) {
  console.log("OTP received:", otp);
}

sendOTP(receiveOTP, 1234);


// -----------------------------------------------
// Exercise 5: Call by Value – Wallet Balance
// -----------------------------------------------

function addMoney(balance) {
  balance = balance + 500;
  return balance;
}

let walletBalance = 1000;
let newBalance = addMoney(walletBalance);

console.log("Original balance:", walletBalance); // 1000
console.log("New balance:", newBalance);         // 1500


// -----------------------------------------------
// Exercise 6: Call by Reference – Shopping Cart
// -----------------------------------------------

function addItem(cart) {
  cart.push("Shoes");
}

let shoppingCart = ["Shirt", "Jeans"];

console.log("Before:", shoppingCart);
addItem(shoppingCart);
console.log("After:", shoppingCart);


// -----------------------------------------------
// Exercise 7: Update Object (Call by Reference)
// -----------------------------------------------

function updateName(user) {
  user.name = "Ahmed";
}

let user = { name: "Ali" };
updateName(user);

console.log(user); // { name: "Ahmed" }


// -----------------------------------------------
// Bonus Exercise: Callback + Calculation
// -----------------------------------------------

function calculate(cb, a, b) {
  cb(a, b);
}

function addNumbers(x, y) {
  console.log("Result:", x + y);
}

calculate(addNumbers, 5, 10);
