// 10. Search a Value
// Check whether the value 30 exists in the array or not.

var arr = [10, 20, 30, 40, 50];

var searchVal = 100;
var isFound = false;

for (var i = 0; i < arr.length; i++) {
    if(arr[i] === searchVal) {
        isFound = true
        break;
    }
}

if(isFound) {
    console.log("Found", searchVal)
} else {
    console.log("Not Found")
}


// 9. Multiply Each Value by 2
// Create a new array where each value is multiplied by 2.

// var numbers = [2, 4, 6, 8];

// var modifiedNumbers = []

// for (var i = 0; i < numbers.length; i++) {
//     modifiedNumbers.push(numbers[i] * 2)
// }

// console.log(modifiedNumbers)


// 7. Count Even Numbers
// Count how many even numbers are in the array.

// var numbers = [1, 2, 3, 4, 5, 6, 7, 8];

// var evenCount = 0;
// var oddCount = 0;

// for (var i = 0; i < numbers.length; i++) {
//     if (numbers[i] % 2 === 0) {
//         evenCount++;
//     } else {
//         oddCount++
//     }
// }

// console.log(evenCount)
// console.log(oddCount)


// 6. Find the Smallest Number

// var values = [9, 3, 15, 1, 6];

// var min = values[0];

// for (var i = 0; i < values.length; i++) {
//     if(values[i] < min) {
//         min = values[i]
//     }
// }

// console.log(min)


// 5. Find the Largest Number
// Find and print the largest number in the array.

// var nums = [45, 22, 89, 14, 77, 100];

// var max = nums[0];
// var min = nums[0]

// for (var i = 0; i < nums.length; i++) {
//     if (nums[i] > max) {
//         max = nums[i]
//     }

//     if (nums[i] < min) {
//         min = nums[i]
//     }
// }

// console.log(min, max)

// 4. Count Total Elements
// Count how many elements exist in the array using a loop.

// var fruits = ["apple", "banana", "mango", "orange"];

// var count = 0;

// for(var i=0; i < fruits.length; i++) {
//     count++;
// }

// console.log(count)



// 3. Find Sum of Array Numbers
// Calculate and print the sum of all numbers.

// var marks = [50, 60, 70, 80];

// var sum = 0;
// for(var i=0; i < marks.length; i++) {
//     // sum = sum + marks[i]
//     sum += marks[i]
// }

// console.log(sum)

// 2. Print Array in Reverse Order
// Print the array from last element to first.

// var colors = ["red", "blue", "green", "yellow"];

// for (var i = colors.length - 1; i >= 0; i--) {
//     console.log(colors[i])
// }

// for (var i = 5; i > 0; i--) {
//     console.log(i)
// }


// 1. Print All Elements

// var numbers = [10, 20, 30, 40, 50];

// for (var i = 0; i < numbers.length; i++) {
//     console.log(numbers[i])
// }

// console.log(numbers[1])
// console.log(numbers[2])
// console.log(numbers[3])
// console.log(numbers[4])
