// OLD approach 
// Select elements
const ul = document.querySelector("ul");
const list = document.querySelectorAll("li");
const button = document.querySelector("button");


// ================================
// ADD CLICK EVENT TO EACH LI
// ================================

for (let i = 0; i < list.length; i++) {
  list[i].addEventListener("click", function () {
    console.log(list[i]);
    list[i].style.textDecoration = "line-through";
    console.log("You clicked!!");
  });
}


// ================================
// ADD NEW TODO ITEM
// ================================

button.addEventListener("click", function () {
  ul.innerHTML += "<li>item 4</li>"
  // const li = document.createElement("li");
  // li.textContent = "Item 4";

  // console.log(li);

  // ul.append(li);
});
