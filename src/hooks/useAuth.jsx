"use client";
import { auth } from "@/firebase.config";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoggedIn(user && user?.uid ? true : false);
    });
  }, []);
  return { user, isLoggedIn };
}
