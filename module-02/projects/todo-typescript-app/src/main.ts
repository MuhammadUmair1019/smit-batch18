import "./style.css";

type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("App element not found");
}

let todos: Todo[] = [];

function createTodo(title: string): Todo {
  return {
    id: crypto.randomUUID(),
    title,
    completed: false,
  };
}

function addTodo(title: string): void {
  const trimmedTitle = title.trim();

  if (!trimmedTitle) return;

  todos = [...todos, createTodo(trimmedTitle)];
  render();
}

function toggleTodo(id: string): void {
  todos = todos.map((todo) =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );

  render();
}

function deleteTodo(id: string): void {
  todos = todos.filter((todo) => todo.id !== id);
  render();
}

function render(): void {
  app.innerHTML = `
    <main class="todo-app">
      <h1>Todo App</h1>

      <form id="todoForm" class="todo-form">
        <input
          id="todoInput"
          type="text"
          placeholder="Enter task..."
          autocomplete="off"
        />
        <button type="submit">Add</button>
      </form>

      <ul class="todo-list">
        ${todos
          .map(
            (todo) => `
              <li class="todo-item ${todo.completed ? "completed" : ""}">
                <span>${todo.title}</span>

                <div>
                  <button data-action="toggle" data-id="${todo.id}">
                    ${todo.completed ? "Undo" : "Done"}
                  </button>

                  <button data-action="delete" data-id="${todo.id}">
                    Delete
                  </button>
                </div>
              </li>
            `
          )
          .join("")}
      </ul>
    </main>
  `;

  bindEvents();
}

function bindEvents(): void {
  const form = document.querySelector<HTMLFormElement>("#todoForm");
  const input = document.querySelector<HTMLInputElement>("#todoInput");

  if (!form || !input) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    addTodo(input.value);
    input.value = "";
  });

  document
    .querySelectorAll<HTMLButtonElement>("[data-action]")
    .forEach((button) => {
      button.addEventListener("click", () => {
        const id = button.dataset.id;
        const action = button.dataset.action;

        if (!id || !action) return;

        if (action === "toggle") {
          toggleTodo(id);
        }

        if (action === "delete") {
          deleteTodo(id);
        }
      });
    });
}

render();
