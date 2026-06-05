const SUPABASE_URL = "https://hqbpfcvgipnoqtxggfhc.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_rJP3R4WgwIv2SFtr_E4_BA_KRnw47jX";
const supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
);

window.onload = getTodos;
window.onload = getUser;


async function getUser() {
  const { data: { user } } = await supabaseClient.auth.getUser()

  if (user?.id) {
    const todoSection = document.getElementById("todoSection")
    const authSection = document.getElementById("authSection")
    const logoutBtn = document.getElementById("logoutBtn")
    logoutBtn.style.display = 'block'
    todoSection.classList.remove("hidden")
    authSection.classList.add("hidden")
    getTodos()
    // console.log(todoSection.classList.remove("hidden"))
  }

  console.log(user)
}


async function logout() {
  const { error } = await supabaseClient.auth.signOut()

  if (error) {
    alert(error)
  }

  const todoSection = document.getElementById("todoSection")
  const authSection = document.getElementById("authSection")
  const logoutBtn = document.getElementById("logoutBtn")
  logoutBtn.style.display = 'none'
  todoSection.classList.add("hidden")
  authSection.classList.remove("hidden")
}


async function signUp() {
  const email = document.getElementById("email")
  const password = document.getElementById("password")


  console.log(email.value)
  console.log(password)

  if (!email.value || !password.value) {
    alert("Please check your email and password")
  }

  const { data, error } = await supabaseClient.auth.signUp({
    email: email.value,
    password: password.value,
  })

  if (error) {
    alert("Something went wrong")
    console.log(error)
  }

  console.log(data)
  console.log(error)
}
async function login() {
  const email = document.getElementById("email")
  const password = document.getElementById("password")


  console.log(email.value)
  console.log(password)

  if (!email.value || !password.value) {
    alert("Please check your email and password")
  }

  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  })

  if (error) {
    alert("Something went wrong")
    console.log(error)
  }

  getUser()
  // console.log(data)
  // console.log(error)
}

async function addTodo() {
  const { data: { user } } = await supabaseClient.auth.getUser()
  const input = document.getElementById("todoInput");

  if (!input.value.trim()) {
    return alert("Enter a todo");
  }

  const { error } = await supabaseClient.from("todos").insert({
    title: input.value,
    is_completed: false,
    user_id: user.id
  });

  if (error) {
    console.log(error);
    return;
  }

  input.value = "";
  getTodos();
}

async function getTodos() {
  const { data: { user } } = await supabaseClient.auth.getUser()

  const { data, error } = await supabaseClient
    .from("todos")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error);
    return;
  }

  const todoList = document.getElementById("todoList");

  todoList.innerHTML = data
    .map(
      (todo) => `
        <div class="todo-item">
          
          <div class="todo-left">
            <input
              type="checkbox"
              ${todo.is_completed ? "checked" : ""}
              onchange="toggleComplete(${todo.id}, this.checked)"
            />
  
            <span class="${todo.is_completed ? "completed" : ""}">
              ${todo.title}
            </span>
          </div>
  
          <div class="actions">
            <i
              class="fa-solid fa-pen"
              onclick="editTodo(${todo.id}, '${todo.title}')"
            ></i>
  
            <i
              class="fa-solid fa-trash"
              onclick="deleteTodo(${todo.id})"
            ></i>
          </div>
  
        </div>
      `
    )
    .join("");
}

async function editTodo(id, oldTitle) {
  const newTitle = prompt("Update Todo", oldTitle);

  if (!newTitle) return;

  const { error } = await supabaseClient
    .from("todos")
    .update({ title: newTitle })
    .eq("id", id);

  if (error) {
    console.log(error);
    return;
  }

  getTodos();
}

async function deleteTodo(id) {
  const confirmDelete = confirm("Are you sure you want to delete this todo?");

  if (!confirmDelete) return;

  const { error } = await supabaseClient.from("todos").delete().eq("id", id);

  if (error) {
    console.log(error);
    return;
  }

  getTodos();
}

async function toggleComplete(id, completed) {
  const { error } = await supabaseClient
    .from("todos")
    .update({
      is_completed: completed,
    })
    .eq("id", id);

  if (error) {
    console.log(error);
    return;
  }

  getTodos();
}

// const supabaseClient = supabase.createClient(
//   SUPABASE_URL,
//   SUPABASE_PUBLISHABLE_KEY
// );

// async function addTodo() {
//   const response = await supabaseClient
//     .from("todos")
//     .insert({ title: "Todo 2", is_completed: false });

//   console.log(response);
// }

// async function getTodos() {
//   const { data, error } = await supabaseClient.from("todos").select("*");

//   if (error) {
//     alert("Something went wrong");
//     console.log(error);
//   }

//   console.log(data);
// }

// async function updateTodo(id) {
//   const { error } = await supabaseClient
//     .from("todos")
//     .update({ title: "Updated Todo" })
//     .eq("id", id);

//   if (error) {
//     alert("Something went wrong");
//     console.log(error);
//   }
// }

// async function deleteTodo(id) {
//   const response = await supabaseClient.from("todos").delete().eq("id", id);

//   console.log(response);
// }

// console.log(supabaseClient);
