// =======================================
// Week 3 | JavaScript For Loop Practice
// =======================================


// ---------------------------------------
// 1) Search a value in an array
// ---------------------------------------

var arr = [10, 15, 40, 60, 80];

var searchVal = +prompt("Please enter your number?");
var isFound = false;

for (var i = 0; i < arr.length; i++) {
  if (arr[i] === searchVal) {
    isFound = true;
    break;
  }
}

if (isFound) {
  console.log("Found:", searchVal);
} else {
  console.log("Not Found:", searchVal);
}



// ---------------------------------------
// 2) Count positive and negative numbers
// ---------------------------------------

var nums = [-2, 3, 10, -10, 30];

var pos = 0;
var neg = 0;

for (var i = 0; i < nums.length; i++) {
  if (nums[i] < 0) {
    neg++;
  } else {
    pos++;
  }
}

console.log("Positive numbers:", pos);
console.log("Negative numbers:", neg);



// ---------------------------------------
// 3) Count pass and fail students
// ---------------------------------------

var marks = [80, 40, 60, 30, 90, 10];

var pass = 0;
var fail = 0;

for (var i = 0; i < marks.length; i++) {
  if (marks[i] > 50) {
    pass++;
  } else {
    fail++;
  }
}

console.log("Pass:", pass);
console.log("Fail:", fail);



// ---------------------------------------
// 4) Calculate average rating
// ---------------------------------------

var ratings = [4.0, 4.5, 5.0, 3.0];
var sum = 0;

for (var i = 0; i < ratings.length; i++) {
  sum = sum + ratings[i];
}

var avg = sum / ratings.length;
console.log("Average rating:", avg);



// ---------------------------------------
// 5) Basic nested for loop
// ---------------------------------------

for (var i = 0; i < 2; i++) {
  for (var j = 0; j < 2; j++) {
    console.log(i, j);
  }
}



// ---------------------------------------
// 6) Nested loop (Class & Students example)
// ---------------------------------------

for (var classNo = 1; classNo <= 3; classNo++) {
  for (var studentNo = 1; studentNo <= 2; studentNo++) {
    console.log("Class", classNo, "Student", studentNo);
  }
}



// ---------------------------------------
// 7) Outer & Inner loop flow
// ---------------------------------------

for (var i = 0; i < 2; i++) {
  console.log("Outer:", i);

  for (var j = 0; j < 2; j++) {
    console.log("Inner:", j);
  }
}

console.log("Hello");
