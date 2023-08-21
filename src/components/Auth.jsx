"use client";
import { auth } from "@/firebase.config";
import useAuth from "@/hooks/useAuth";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const provider = new GoogleAuthProvider();

const handleSingIn = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
    })
    .catch((err) => console.error(err.message));
};

const handleLogOut = () => {
  signOut(auth).then().catch();
};

export default function Auth() {
  const { isLoggedIn } = useAuth();
  return (
    <div>
      {!isLoggedIn && (
        <button className="log-button" onClick={handleSingIn}>
          {" "}
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            height="1.5em"
            width="1.5em"
          >
            <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 01-5.279-5.28 5.27 5.27 0 015.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 00-8.934 8.934 8.907 8.907 0 008.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z" />
          </svg>{" "}
          Sign In
        </button>
      )}
      {isLoggedIn && (
        <button className="log-button" onClick={handleLogOut}>
          Log Out
        </button>
      )}
    </div>
  );
}
