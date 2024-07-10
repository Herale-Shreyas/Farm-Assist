export interface AuthProps {
  currentUser: any;
  USER: any;
  signUpWithEmail: (
    name: string,
    email: string,
    password: string
  ) => Promise<Object>;
  signInWithEmail: (email: string, password: string) => Promise<Object>;
  signInWithGoogle: () => Promise<boolean>;
  logout: () => void;
  setUSER: React.Dispatch<React.SetStateAction<any>>;
}
