import { useState } from "react";

function TodoApp() {
    const [todos, setTodos] = useState([])
    const [todoInput, setTodoInput] = useState("")

    const addTodo = () => {
        if (!todoInput) {
            alert("Please enter a todo")
            return
        }

        const newTodo = {
            id: Date.now(),
            text: todoInput,
            isCompleted: false,
        }

        setTodos([...todos, newTodo])
    }
    console.log(todos)

    const handleClick = (e, id) => {
        console.log(id)
        setTodos(
            todos.map(todo => (todo.id === id) ? { ...todo, isCompleted: true } : todo))
    }


    return (
        <>
            <input type="text" name="todo" onChange={(e) => setTodoInput(e.target.value)} />
            <button onClick={addTodo}> Add todo</button>

            {todos.map(todo => (
                <ul key={todo.id}>

                    <li
                        style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
                        onClick={(e) => handleClick(e, todo.id)}>
                        {todo.text}

                    </li>
                    <span> Del</span>
                </ul>
            ))}

        </>
    )
}


export default TodoApp;

