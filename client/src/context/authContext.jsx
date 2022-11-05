import { createContext, useContext, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
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
  const [loading, setLoading] = useState(true);

  const [usuario, setUser] = useState(null);

  const signUp = async (email, password) =>
    await createUserWithEmailAndPassword(auth, email, password);

  const signUpTwo = async (email, password,emaildos) => {
    await createUserWithEmailAndPassword(auth, email, password).then((res) =>
      logOut()
    ).then(res=>logIn(emaildos,emaildos))
  };

  const logIn = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const loginWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
  };

  const logOut = () => signOut(auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <authContext.Provider
      value={{
        signUp,
        logIn,
        usuario,
        logOut,
        loading,
        loginWithGoogle,
        signUpTwo,
      }}
    >
      {children}
    </authContext.Provider>
  );
}
