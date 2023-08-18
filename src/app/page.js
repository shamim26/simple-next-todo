"use client";
import TodoList from "@/components/TodoList";
import { useState } from "react";

export default function Home() {
  const isBrowser = typeof window !== "undefined";
  const todos = isBrowser ? JSON.parse(localStorage.getItem("to-do")) : [];
  const [input, setInput] = useState("");
  const [todoItem, setTodoItem] = useState(todos || []);

  // add new to do
  const addTodo = (e) => {
    e.preventDefault();
    if (input === "") return;

    // add to local storage
    const newTodo = { id: Date.now(), text: input, done: false };
    if (!todos) {
      localStorage.setItem("to-do", JSON.stringify([newTodo]));
    } else {
      localStorage.setItem("to-do", JSON.stringify([...todos, newTodo]));
    }
    // update state
    setTodoItem((prevTodos) => [...prevTodos, newTodo]);
    setInput("");
  };

  //mark the completed to do
  const markTodo = (id) => {
    const marked = todoItem.map((todo) =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    );
    console.log(marked);
    setTodoItem(marked);
    localStorage.setItem("to-do", JSON.stringify(marked));
  };

  //   delete to do
  const deleteTodo = (id) => {
    const restItems = todoItem?.filter((todo) => todo.id !== id);
    setTodoItem(restItems);
    localStorage.setItem("to-do", JSON.stringify(restItems));
  };

  return (
    <main className="bg-slate-300 h-screen overflow-y-auto">
      <div className="main ">
        <h1>To Do</h1>

        <form onSubmit={addTodo} className="flex justify-center relative">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Add a To Do"
          />
          <button type="submit" className="add-button">
            <svg fill="#fff" viewBox="0 0 16 16" height="1.8em" width="1.8em">
              <path
                fillRule="evenodd"
                d="M8 2a.5.5 0 01.5.5v5h5a.5.5 0 010 1h-5v5a.5.5 0 01-1 0v-5h-5a.5.5 0 010-1h5v-5A.5.5 0 018 2z"
              />
            </svg>
          </button>
        </form>
        {/* send data to child to render */}
        <TodoList
          todos={todoItem}
          deleteTodo={deleteTodo}
          markTodo={markTodo}
        />
      </div>
    </main>
  );
}
