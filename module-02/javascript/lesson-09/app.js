/**************************************************
 * JavaScript Lecture File (Bottom → Top Flow)
 **************************************************/

/* ================================
   1. console.log (Basic Output)
================================ */
console.log("Hello JavaScript");


/* ================================
   2. Increment Operators (++ / --)
================================ */
var x = 0;

// Post-increment
var y = x++; // y = 0, x = 1

// Pre-increment
var z = ++x; // z = 2, x = 2

console.log("x:", x);
console.log("y:", y);
console.log("z:", z);


/* ================================
   3. for Loop Structure
================================ */
// for (start; condition; update)


/* ================================
   4. Simple Loop (Counting)
================================ */
for (var i = 0; i < 5; i++) {
    console.log(i);
}
// Output: 0 1 2 3 4


/* ================================
   5. Reverse Loop
================================ */
for (var i = 5; i >= 1; i--) {
    console.log(i);
}
// Output: 5 4 3 2 1


/* ================================
   6. Even & Odd Numbers
================================ */
for (var i = 0; i <= 10; i++) {
    if (i % 2 === 0) {
        console.log("Even:", i);
    } else {
        console.log("Odd:", i);
    }
}


/* ================================
   7. Multiplication Table
================================ */
for (var i = 1; i <= 10; i++) {
    console.log("2 x " + i + " = " + (2 * i));
}


/* ================================
   8. Loop Through Array
================================ */
let students = ["Ali", "Ahmed", "Sara", "Zubair"];

for (var i = 0; i < students.length; i++) {
    console.log("Student:", students[i]);
}


/* ================================
   9. Sum Without Loop (Concept)
================================ */
// var sum = 0;
// sum = sum + 1; // 0 + 1 = 1
// sum = sum + 2; // 1 + 2 = 3
// sum = sum + 3; // 3 + 3 = 6
// sum = sum + 4; // 6 + 4 = 10


/* ================================
   10. Sum Using for Loop
================================ */
var sum = 0;

for (var i = 0; i < 5; i++) {
    sum = sum + i;
    // 0 + 0 = 0
    // 0 + 1 = 1
    // 1 + 2 = 3
    // 3 + 3 = 6
    // 6 + 4 = 10
}

console.log("Final Sum:", sum); // 10

