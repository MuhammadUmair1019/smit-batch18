const addForm = document.querySelector(".add");
const search = document.querySelector(".search input");
const list = document.querySelector(".todos");
const addButton = document.querySelector(".btn");

let editIndex = null;

addForm.addEventListener("submit", function (e) {
  e.preventDefault();

  if (editIndex === null) {
    list.innerHTML += `
     <li class="list-group-item d-flex justify-content-between align-items-center">
        <span>${addForm.add.value}</span>
        <div>
          <i class="fas fa-edit edit"></i>
          <i class="far fa-trash-alt delete"></i>
        </div>
      </li>
  
  `;
  } else {
    list.children[editIndex].querySelector("span").textContent =
      addForm.add.value;
    console.log(list.children[editIndex].querySelector("span"));
    editIndex = null;
    addButton.textContent = "Add Todo";
  }

  // addForm.add.value = ""
  addForm.reset();
});

list.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete")) {
    console.log(e.target.parentElement.parentElement);

    e.target.parentElement.parentElement.remove();
  }

  if (e.target.classList.contains("edit")) {
    const items = list.children;
    const targetItem = e.target.parentElement.parentElement;
    addButton.textContent = "Update Todo";

    for (let i = 0; i < items.length; i++) {
      if (items[i] === targetItem) {
        console.log(i);
        editIndex = i;
      }
    }

    addForm.add.value =
      e.target.parentElement.previousElementSibling.textContent;
  }
});
