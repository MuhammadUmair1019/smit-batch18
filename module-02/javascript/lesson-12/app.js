// ==============================
// Arrays of Objects
// ==============================

var students = [
    {
        name: "Ahmed",
        marks: 80,
        atten: true
    },
    {
        name: "Ali",
        marks: 40,
        atten: false
    }
];

console.log(students[0].marks, students[1].marks);
// console.log(students[1].marks)
// console.log(students[1].name)


// ==============================
// Individual Objects
// ==============================

var s1 = {
    name: "Ahmed",
    marks: 80,
    atten: true
};

var s2 = {
    name: "Ali",
    marks: 40,
    atten: false
};

// console.log(s1)
// console.log(s1.name)
// console.log(s1.marks)
// console.log(s1.atten)


// ==============================
// Multiple Arrays Example
// ==============================

// var marks = [80, 70, 40];
// var names = ["Ahmed", "Ali", "Zubair"];
// var resultStatus = [true, true, false];

// for (var i = 0; i < marks.length; i++) {
//     console.log(names[i] + ": " + marks[i] + " = " + resultStatus[i]);
// }


// ==============================
// Nested Loops
// ==============================

// for (var i = 0; i < 5; i++) {
//     for (var j = 0; j < 5; j++) {
//         console.log(i, j);
//     }
// }


// ==============================
// Primitive Data Types
// ==============================

// string, number, boolean, undefined, null

// var name = "Ahmed";
// var age = 10;
// console.log(age || name);


// ==============================
// Logical Operators (||, &&)
// ==============================

// var result = true || false || false;
// var result = 0 || " " || 1;

// var result = 2 && " " && 1;
// var result = 2 && " " && 0;

// console.log(result);


// ==============================
// Conditions with Logical Operators
// ==============================

// var x = "ali ahmed";
// var y = 9;
// var z = [4, 10];

// if (x === "ali" || y === 10 || z[0] === 4 && z.length === 1) {
//     console.log("TRUE");
// } else {
//     console.log("FALSE");
// }

// if (x === "ali" && y === 10) {
//     console.log("TRUE");
// } else {
//     console.log("FALSE");
// }


// ==============================
// Truthy and Falsy Values
// ==============================

// falsy: 0, "", undefined, null, NaN
// truthy: 1, " ", [], {}

// let value = "";

// if (value) {
//     console.log("Found");
// } else {
//     console.log("Not Found!");
// }


// ==============================
// Exponent Operator
// ==============================

// var totalCost = 2 + 2 ** 2 ** 2;
// console.log("Total Cost:", totalCost);
// console.log(2 ** 3 ** 2);


// ==============================
// Variable Naming Rules
// ==============================

// var _x = 10;
// var $x = 10;

// var firstName = "Ahmed";
// var first_name = "Ahmed";

// Invalid examples
// var ?x = 10;
// var last*name = "Ahmed";
// var last/name = "Ahmed";


// ==============================
// Variable Declaration
// ==============================

// var a = 10;
// console.log(a);

// var b = "Ahmed";
// console.log(b);

// var c = true;
// console.log(c);

// var d;
// console.log(d);
