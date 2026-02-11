// ---------------------------------------------
// DATE & SWITCH STATEMENT EXAMPLE
// ---------------------------------------------

// Create a Date object for the current date & time
let now = new Date();

// getDay() returns a number between 0–6
// 0 = Sunday, 1 = Monday, ..., 6 = Saturday
let day = now.getDay();

// switch is useful when we compare ONE value
// against multiple fixed cases
switch (day) {
  case 0:
    console.log("Sunday");
    break; // stops execution here

  case 1:
    console.log("Monday");
    break;

  case 2:
    console.log("Tuesday");
    break;

  case 3:
    console.log("Wednesday");
    break;

  default:
    // runs if no case matches
    console.log("Invalid day");
}


// ---------------------------------------------
// SWITCH VS IF-ELSE (GRADE EXAMPLE)
// ---------------------------------------------

// let grade = "C";

// switch is cleaner when values are exact matches
// switch (grade) {
//   case "A":
//     console.log("Your grade is A");
//     break;

//   case "B":
//     console.log("Your grade is B");
//     break;

//   case "C":
//     console.log("Your grade is C");
//     break;

//   default:
//     console.log("Fail");
// }

// Same logic using if-else (more flexible, but longer)
// if (grade === "A") {
//   console.log("Your grade is A");
// } else if (grade === "B") {
//   console.log("Your grade is B");
// } else if (grade === "C") {
//   console.log("Your grade is C");
// } else {
//   console.log("Fail");
// }


// ---------------------------------------------
// DATE FORMATTING & METHODS
// ---------------------------------------------

// const now = new Date();
// const before = new Date("January 1, 2026");

// Different ways to display date & time
// console.log(now);                     // full date object
// console.log(now.toDateString());      // readable date
// console.log(now.toLocaleDateString()); // date based on region
// console.log(now.toLocaleTimeString()); // time only
// console.log(now.toUTCString());       // UTC time
// console.log(now.toISOString());       // ISO format (used in APIs)


// ---------------------------------------------
// DATE PARTS
// ---------------------------------------------

// console.log(now.getFullYear()); // year (2026)
// console.log(now.getMonth());    // month (0–11)

// let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
// console.log(days[now.getDay()]); // converts number to day name


// ---------------------------------------------
// TIME PARTS
// ---------------------------------------------

// console.log(now.getHours());
// console.log(now.getMinutes());
// console.log(now.getSeconds());
// console.log(now.getMilliseconds());


// ---------------------------------------------
// TIMESTAMP & DATE DIFFERENCE
// ---------------------------------------------

// Timestamp = milliseconds since Jan 1, 1970
// console.log(now.getTime());

// Convert timestamp back to date
// console.log(new Date(1770804285921));

// Difference between two dates
// const diff = now.getTime() - before.getTime();

// const mins = Math.round(diff / 1000 / 60);
// const hours = Math.round(mins / 60);
// const daysDiff = Math.round(hours / 24);

// console.log(mins);
// console.log(hours);
// console.log(`${daysDiff} days difference`);


// ---------------------------------------------
// NUMBER CONVERSION
// ---------------------------------------------

// console.log(typeof Number("2.3")); // number
// console.log(Number("2.3"));        // 2.3
// console.log(parseInt("2.3"));      // 2
// console.log(parseFloat("2.3"));    // 2.3


// ---------------------------------------------
// STRINGS & METHODS
// ---------------------------------------------

// let userName = "Ali";

// console.log(userName.toLowerCase()); // ali
// console.log(userName.toUpperCase()); // ALI
// console.log(typeof userName);        // string


// ---------------------------------------------
// OBJECT & METHOD
// ---------------------------------------------

// Methods are functions inside objects
// let userOne = {
//   name: "Ali",
//   age: 24,
//   print: function () {
//     console.log("Hello");
//   },
// };

// userOne.print();


// ---------------------------------------------
// NESTED ARRAYS & LOOPS
// ---------------------------------------------

// let arr = [[2, 6, 7], [3], [4]];

// Loop through nested arrays
// for (let i = 0; i < arr.length; i++) {
//   for (let j = 0; j < arr[i].length; j++) {
//     console.log(arr[i][j]);
//   }
// }

// console.log(arr[0]); // first inner array


// ---------------------------------------------
// VARIABLE NAMING RULES
// ---------------------------------------------

// Invalid variable name (cannot start with number)
// let 2name = "Ali"; ❌

// Valid variable names
// let full2Name = "Ahmed";
// let firstName = "Muhammad";
// let lastName = "Ali";

// String concatenation
// console.log(firstName + " " + lastName);

// Template literals (recommended)
// console.log(`${firstName} ${lastName}`);
