/****************************************************
 * DOM (Document Object Model) - JavaScript Example
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

/****************************************************
 *  Select Element by ID
 ****************************************************/

// Select element using ID
const heading = document.getElementById("heading");

// Check if element exists before modifying
if (heading) {
  heading.innerHTML = "DOM Manipulation Example";
  console.log("Heading element:", heading);
}

/****************************************************
 *  Select Element by Class Name
 ****************************************************/

// Returns an HTMLCollection (array-like object)
const subHeadings = document.getElementsByClassName("sub-heading");

subHeadings[0].innerHTML = "Hello from JavaScript!";
console.log("Sub Heading:", subHeadings[0]);

/****************************************************
 * Select Element by Tag Name
 ****************************************************/

// Returns HTMLCollection
const paragraphs = document.getElementsByTagName("p");

console.log("First paragraph:", paragraphs[0]);

/****************************************************
 *  Change Page Title
 ****************************************************/

document.title = "JavaScript | DOM Lesson";
