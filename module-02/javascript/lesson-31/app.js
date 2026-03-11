let marks = [10, 20, 40];

let filteredArr = marks.filter(function (val) {
  if (val <= 20) {
    return true;
  } 

  return false
});

let modifiedMarks = filteredArr.map(function (m) {
    return m + 10;
})


console.log("filtered arr")
console.log(filteredArr);
console.log(modifiedMarks)



// map
// let copyArr = marks.map(function (val) {
//   if (val <= 20) {
//     return val + 10;
//   }

//    return val
// });

// console.log(marks);
// console.log(copyArr);

// let modifiedMarks = [];

// for (let i = 0; i < marks.length; i++) {
//   modifiedMarks[i] = marks[i] + 10;
// }

// console.log(marks);
// console.log(modifiedMarks);


// for (let i=2; i < marks.length; i++) {
//     console.log(marks[i])
// }

// marks.forEach(function cb(m, idx) {
//   console.log(idx, m);
// });
