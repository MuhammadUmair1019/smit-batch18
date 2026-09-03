const fs = require("fs");

fs.writeFileSync("./test.txt", "Hello NodeJs");

const additionalContent = '\nThis text will be added at the end.';
fs.appendFileSync("./test.txt", additionalContent);

// let result = fs.readFileSync("./test.txt", "utf-8")

// console.log(result)


// fs.copyFileSync("./test.txt", "./new-test.txt")


// fs.unlinkSync("./new-test.txt")


// fs.mkdirSync("./views")




// ---------------------------------------------------------
// const utils = require('./utils');

// console.log(utils)


// const { add, mul } = require('./utils');


// console.log(add(2, 2))
// console.log(mul(2, 4))



// alert("Hello") // ❌
// console.log(window) // ❌

// document.getElementById("body")

// console.log(global)

// setInterval(() => {
//     console.log("Run")
// }, 1000)