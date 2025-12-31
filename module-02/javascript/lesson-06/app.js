// ======================================================
// LESSON: Objects & Arrays in JavaScript
// ======================================================

// ------------------------------------------------------
// OBJECTS (Storing related data together)
// ------------------------------------------------------

// Instead of creating separate variables for each student,
// we use OBJECTS to group related data.

var s1 = {
  name: "Ahmed",
  marks: 70,
  atten: true,
};

var s2 = {
  name: "Ali",
  marks: 80,
  atten: false,
};

var s3 = {
  name: "Zubair",
  marks: 90,
  atten: true,
};

// Accessing object properties
console.log(s1);
console.log(s1.name);
console.log(s1.marks);
console.log(s1.atten);

// ------------------------------------------------------
// ARRAY OF OBJECTS (Best practice for real apps)
// ------------------------------------------------------

// Instead of multiple variables, we store objects inside an array

var students = [
  {
    name: "Ahmed",
    marks: 70,
    atten: true,
  },
  {
    name: "Ali",
    marks: 80,
    atten: false,
  },
  {
    name: "Zubair",
    marks: 90,
    atten: true,
  },
];

console.log(students);

// Accessing array data
console.log(students[0].name);
console.log(students[0].marks);
console.log(students[0].atten);

// ------------------------------------------------------
// 3️⃣ ARRAYS (Separate values approach – NOT recommended)
// ------------------------------------------------------

// Storing same data in separate arrays ❌
// This approach is confusing and error-prone

var names = ["Ahmed", "Ali", "Zubair"];
var marks = [70, 80, 90];
var attendances = [true, false, true];

console.log(names);
console.log(marks);
console.log(attendances);

// Accessing related data (hard to manage)
console.log(names[0], marks[0], attendances[0]);
console.log(names[1], marks[1], attendances[1]);
console.log(names[2], marks[2], attendances[2]);

// ------------------------------------------------------
// ARRAY METHODS – splice()
// ------------------------------------------------------

// splice(startIndex, deleteCount, newItems...)

var marks = [70, 80, 90];

// Remove 1 element from index 1
marks.splice(1, 1); // [70, 90]

// Add value at index 1
marks.splice(1, 0, 60); // [70, 60, 90]

// Replace values
marks.splice(1, 1, 60, 30, 50);

// Remove elment from last index
marks.pop()

// Remove elment from starting index
marks.shift()

console.log(marks);

// ------------------------------------------------------
// 5️⃣ push() & unshift()
// ------------------------------------------------------

// push → add at END
marks.push(40, 30);

// unshift → add at START
marks.unshift(50, 10);

console.log(marks);

// ------------------------------------------------------
// 6️⃣ ARRAY INDEX & LENGTH
// ------------------------------------------------------

// Indexing example
// Value: 70  80  90  100
// Index:  0   1   2    3

var marks = [70, 80, 90];

// Adding value by index
marks[3] = 100;

console.log(marks);
console.log("Length:", marks.length);

// Updating values
marks[0] = 60;
marks[2] = 100;

console.log(marks);

// ------------------------------------------------------
// 7️⃣ SIMPLE ARRAY EXAMPLE
// ------------------------------------------------------

var arr = [2, 3];

// Add at end
arr.push(4);
arr.push(6);

// Add at start
arr.unshift(1);

console.log(arr);

// Access values
console.log(arr[0]);
console.log(arr[1]);

// ======================================================
// ✅ KEY TAKEAWAYS
// ======================================================
// ✔ Objects group related data
// ✔ Arrays store multiple values
// ✔ Array of objects is BEST for real applications
// ✔ splice(), push(), unshift() modify arrays
// ✔ Index starts from 0
