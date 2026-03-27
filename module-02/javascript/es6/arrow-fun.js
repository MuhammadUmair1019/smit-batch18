// Arrow Functions in JavaScript

// Definition:
// An arrow function is a shorter way to write functions using =>

// Returning an Object
let z = () => ({ id: 101, name: "Ali" });
console.log(z());

// Short Form (Implicit Return)
let sum = (a, b) => a + b;
let result1 = sum(3, 3);
console.log(result1);

//Block Body (Explicit Return)
let add = (a, b) => {
    return a + b;
};
console.log(add(2, 3));

// No Parameters
let greet = () => console.log("Hello");
greet();

// Return Value Check
let check = () => console.log("Hello");
let result2 = check();
console.log(result2); // undefined


// Normal Function (Traditional Way)

// Definition:
// A normal function uses the 'function' keyword

function y() {
    console.log("Hello!");
}

y();