import { db } from "../database/firebase.config";
import {
  getDocs,
  collection,
  updateDoc,
  doc,
  query,
  where,
  setDoc,
  getDoc,
} from "firebase/firestore";

export const addUser = async (name: string, email: string, uid: string) => {
  try {
    if (await getUser("email", email)) return;
    const usersRef = collection(db, "users");
    const userDocRef = doc(usersRef, uid);
    await setDoc(userDocRef, { name, email, uid });
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async (name: string, value: string) => {
  try {
    const userSnapshot = await getDocs(
      query(collection(db, "users"), where(name, "==", value))
    );
    return userSnapshot.empty ? null : userSnapshot.docs[0].data();
  } catch (error) {
    return null;
  }
};
