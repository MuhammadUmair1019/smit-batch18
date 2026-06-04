const todoInput = document.getElementById("todoInput") as HTMLInputElement;
const addBtn = document.getElementById("addBtn") as HTMLButtonElement;
const todoList = document.getElementById("todoList") as HTMLUListElement;

function addTodo(): void {
  const task: string = todoInput.value.trim();

  if (task === "") {
    alert("Please enter a task");
    return;
  }

  const li: HTMLLIElement = document.createElement("li");

  const span: HTMLSpanElement = document.createElement("span");
  span.innerText = task;

  const doneBtn: HTMLButtonElement = document.createElement("button");
  doneBtn.innerText = "Done";

  doneBtn.addEventListener("click", () => {
    span.classList.toggle("completed");
  });

  const deleteBtn: HTMLButtonElement = document.createElement("button");
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

todoInput.addEventListener("keydown", (event: KeyboardEvent) => {
  if (event.key === "Enter") {
    addTodo();
  }
});
