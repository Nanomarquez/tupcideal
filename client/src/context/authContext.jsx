import { createContext, useContext, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";
import { useEffect } from "react";

export const authContext = createContext();

export const useAuth = () => {

  const context = useContext(authContext);

  if (!context) throw new Error("There is not auth provider");

  return context;
};

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);

  const signUp = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const logIn = async (email, password) => {
    signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => signOut(auth);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  return (
    <authContext.Provider value={{ signUp, logIn, user, logOut }}>
      {children}
    </authContext.Provider>
  );
}
