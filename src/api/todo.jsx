import { db } from "@/firebase.config";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";

const addTodo = async ({ input, done, userId }) => {
  await addDoc(collection(db, "to-do"), {
    user: userId,
    text: input,
    done: done,
    createdAt: serverTimestamp(),
  });
};

const updateStatus = async (docId, status) => {
  const todoRef = doc(db, "to-do", docId);
  await updateDoc(todoRef, {
    done: status.done,
  });
};

const deleteTodo = async (docId) => {
  const docRef = doc(db, "to-do", docId);
  await deleteDoc(docRef);
};

export { addTodo, updateStatus, deleteTodo };
