const items = document.querySelector("ul");
const todos = document.querySelectorAll("li");

const button = document.querySelector("button");

for (let i = 0; i < todos.length; i++) {
  todos[i].addEventListener("click", function todoCompleted() {
    todos[i].style.textDecoration = "line-through";
  });
}

button.addEventListener("click", function () {
  items.innerHTML += `
    <li> item 4 </li>
`;
});

// ------------------------------------------------------
// const items = document.querySelector("ul")
// const item = document.querySelector("li")

// function todoCompleted() {
//     item.style.textDecoration = "line-through"
// }

// item.addEventListener("click", todoCompleted)

// console.log(item)
// console.log(items)

// ----------------------------------------------------------
// const box = document.querySelector("div")

// console.log(box.children[1].parentElement.parentElement.parentElement)

// console.log(box.nextElementSibling.nextElementSibling)
// console.log(box.previousElementSibling)
