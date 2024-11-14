import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

function Todolist() {
    let [todos, setTodos] = useState([{ task: "Sample Task", id: uuidv4(), done: false }]);
    let [newtodo, setNewtodo] = useState("");

    let addNewTask = () => {
        if (newtodo.trim()) { 
            setTodos((prevTodos) => {
                return [...prevTodos, { task: newtodo, id: uuidv4(), done: false }];
            });
            setNewtodo("");
        }
    };

    let updateTodoValue = (event) => {
        setNewtodo(event.target.value);
    };

    let deleteTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    let markAsDone = (id) => {
        setTodos(todos.map((todo) => {
            if (todo.id === id) {
                return { ...todo, done: true }; // Create a new object to avoid mutating state
            }
            return todo;
        }));
    };

    let markAllAsDone = () => {
        setTodos(todos.map((todo) => ({ ...todo, done: true })));
    };

    return (
        <>
            <h1>Todo List</h1>
            <input
                type="text"
                placeholder="Enter task"
                onChange={updateTodoValue}
                value={newtodo}
            /><br /><br />
            <button onClick={addNewTask}>Add task</button>
            <br /><br /><br />
            <hr />
            <h2>Tasks</h2>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>
                        <span style={todo.done ? { textDecorationLine: "line-through" } : {}}>
                            {todo.task}
                        </span>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <button onClick={() => markAsDone(todo.id)}>Mark as Done</button>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <button id="delete" onClick={() => deleteTodo(todo.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <br />
            <button onClick={markAllAsDone}>All Done</button>
        </>
    );
}

export default Todolist;
