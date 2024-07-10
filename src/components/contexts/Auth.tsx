import {
  useState,
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
} from "react";
import { auth, googleProvider } from "../../database/firebase.config";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { addUser, getUser } from "../../database/store";

export interface AuthProps {
  currentUser: any;
  USER: any;
  signUpWithEmail: (
    name: string,
    email: string,
    password: string
  ) => Promise<any>;
  signInWithEmail: (email: string, password: string) => Promise<any>;
  signInWithGoogle: () => Promise<any>;
  logout: () => void;
  setUSER: React.Dispatch<React.SetStateAction<any>>;
}

const AuthContext = createContext<AuthProps | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [USER, setUSER] = useState<any>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (currUser) => {
      setCurrentUser(currUser);
    });
  }, []);

  useEffect(() => {
    const setUSERHelper = async () => {
      try {
        const user = await getUser("email", currentUser.email);
        setUSER(user);
      } catch (error) {
        console.log(error);
      }
    };

    currentUser && currentUser.email && setUSERHelper();
  }, [currentUser]);

  // register
  const signUpWithEmail = async (
    name: string,
    email: string,
    password: string
  ) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password).then(
        (userCredentials) => {
          const { email, uid } = userCredentials.user;
          addUser(String(name), String(email), uid);
        }
      );
      return { status: true };
    } catch (error: any) {
      const errorMsg = error.code ? error.code.split("/")[1] : error.message;
      return { status: false, errorMsg };
    }
    //
  };

  // login
  const signInWithEmail = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { status: true };
    } catch (error: any) {
      const errorMsg = error.code.split("/")[1];
      return { status: false, errorMsg };
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider).then((userCredentials) => {
        // adduser to database
        const { email, uid, displayName } = userCredentials.user;
        console.log(userCredentials);
        if (!email) return;
        addUser(String(displayName), String(email), uid);
      });
      return { status: true };
    } catch (error) {
      return { status: false, errorMsg: "Sign In Failed" };
    }
  };

  const logout = async () => {
    try {
      signOut(auth);
      location.reload();
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        USER,
        signUpWithEmail,
        signInWithEmail,
        signInWithGoogle,
        logout,
        setUSER,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext) as AuthProps;
