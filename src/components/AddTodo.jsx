"use client";

import { addTodo } from "@/api/todo";
import useAuth from "@/hooks/useAuth";
import { useState } from "react";

export default function AddTodo() {
  const { user, isLoggedIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      alert("Please Sign In");
      setInput('')
      return;
    }
    setLoading(true);
    const todo = {
      input,
      done: false,
      userId: user?.uid,
    };

    await addTodo(todo);
    setLoading(false);
    setInput("");
  };

  return (
    <div>
      {" "}
      <form onSubmit={handleAddTodo} className="flex justify-center relative">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          placeholder="Add a To Do"
        />
        <button
          disabled={input.length < 1 || loading}
          type="submit"
          className="add-button"
        >
          <svg fill="#fff" viewBox="0 0 16 16" height="1.8em" width="1.8em">
            <path
              fillRule="evenodd"
              d="M8 2a.5.5 0 01.5.5v5h5a.5.5 0 010 1h-5v5a.5.5 0 01-1 0v-5h-5a.5.5 0 010-1h5v-5A.5.5 0 018 2z"
            />
          </svg>
        </button>
      </form>
    </div>
  );
}
