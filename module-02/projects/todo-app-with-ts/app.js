"use strict";
const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");
function addTodo() {
    const task = todoInput.value.trim();
    if (task === "") {
        alert("Please enter a task");
        return;
    }
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.innerText = task;
    const doneBtn = document.createElement("button");
    doneBtn.innerText = "Done";
    doneBtn.addEventListener("click", () => {
        span.classList.toggle("completed");
    });
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.addEventListener("click", () => {
        li.remove();
    });
    li.appendChild(span);
    li.appendChild(doneBtn);
    li.appendChild(deleteBtn);
    todoList.appendChild(li);
    todoInput.value = "";
}
addBtn.addEventListener("click", addTodo);
todoInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addTodo();
    }
});
