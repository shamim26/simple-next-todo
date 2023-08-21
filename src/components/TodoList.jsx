import { deleteTodo, updateStatus } from "@/api/todo";
import { db } from "@/firebase.config";
import useAuth from "@/hooks/useAuth";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";

export default function TodoList() {
  const { user } = useAuth();
  const [todos, setTodos] = useState([]);

  const refreshData = () => {
    if (!user) {
      setTodos([]);
      return;
    }

    const q = query(
      collection(db, "to-do"),
      where("user", "==", user?.uid),
      orderBy("createdAt", 'desc')
    );
    onSnapshot(q, (querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      setTodos(list);
    });
  };
  useEffect(() => {
    refreshData();
  }, [user]);

  const markTodo = (id) => {
    const updated = todos.map(async (todo) => {
      if (todo.id === id) {
        await updateStatus(id, { done: !todo.done });
      }
    });
  };

  const removeTodo = async (id) => {
    await deleteTodo(id);
  };

  return (
    <div className="w-4/5 md:w-2/4 mx-auto my-10 text-black">
      <div className="flex flex-col gap-5">
        {todos?.map((todo) => (
          <div key={todo?.id} className="to-do-items">
            <p
              onClick={() => markTodo(todo.id)}
              className={` cursor-pointer inline ${
                todo?.done ? "line-through opacity-50" : ""
              }`}
            >
              {todo.text}
            </p>
            <span
              className="cursor-pointer"
              onClick={() => removeTodo(todo?.id)}
            >
              {" "}
              <svg
                fill="none"
                stroke="#eb1c15"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                viewBox="0 0 24 24"
                height="1.3em"
                width="1.3em"
              >
                <path d="M21 4H8l-7 8 7 8h13a2 2 0 002-2V6a2 2 0 00-2-2zM18 9l-6 6M12 9l6 6" />
              </svg>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
