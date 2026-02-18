/****************************************************
 * DOM (Document Object Model) - JavaScript
 ****************************************************/

/*
Definition:
DOM (Document Object Model) is a programming interface
that represents an HTML document as a tree structure.

It allows JavaScript to:
- Access HTML elements
- Change content
- Modify styles
- Update attributes
- Change page title
*/

/* ==================================================
   DOM STRUCTURE
================================================== */

// Root -> document
// Nodes -> Every element in HTML

// Types of Nodes:
// 1. Element Node
// 2. Text Node

// Relationships:
// - Parent
// - Child
// - Sibling


/* ==================================================
   setTimeout Example
================================================== */

console.log("Start");

function delayedGreeting() {
  console.log("Hello, world!");
  alert("Hello");
}

setTimeout(delayedGreeting, 2000);

console.log("End");


/* ==================================================
   SELECTING ELEMENTS
================================================== */

// 1. Using querySelector()
// const button = document.querySelector("button");
// const para = document.querySelector("p");

// 2. Using querySelectorAll()
// const paragraphs = document.querySelectorAll("p");

// 3. By Tag Name
// const paragraphs = document.getElementsByTagName("p");

// 4. By Class Name
// const subHeadings = document.getElementsByClassName("sub-heading");

// 5. By ID
// const heading = document.getElementById("heading");


/* ==================================================
   MODIFYING CONTENT
================================================== */

// heading.innerText = "Welcome to class 26";


/* ==================================================
   WORKING WITH CLASSES
================================================== */

// const para = document.querySelector("p");

// para.setAttribute("class", "error");
// para.classList.add("dummy");

// Example: Conditional Class Assignment

// const paragraphs = document.querySelectorAll("p");

// for (let i = 0; i < paragraphs.length; i++) {
//   if (paragraphs[i].innerText.includes("error")) {
//     paragraphs[i].classList.add("error");
//   } else if (paragraphs[i].innerText.includes("success")) {
//     paragraphs[i].classList.add("success");
//   }
// }


/* ==================================================
   WORKING WITH ATTRIBUTES
================================================== */

// const link = document.querySelector("a");

// console.log(link.getAttribute("href"));
// console.log(link.getAttribute("id"));

// link.setAttribute("class", "link");
// link.setAttribute("style", "color: green;");

// console.log(link.getAttributeNames());


/* ==================================================
   SELECTING NESTED ELEMENTS
================================================== */

// const box = document.querySelector(".box-1 > p");
// box.innerText = "Para 1";

// const boxInsideDiv = document.querySelector("div p");
// console.log(boxInsideDiv);


/* ==================================================
   SUMMARY
================================================== */

// The DOM allows JavaScript to:
// - Select elements
// - Modify text
// - Change styles
// - Update attributes
// - Dynamically control webpage content
