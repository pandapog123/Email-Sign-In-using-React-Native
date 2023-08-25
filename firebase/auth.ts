import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { firebaseApp } from ".";

export const auth = getAuth(firebaseApp);

export async function logInWithEmail(email: string, password: string) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    throw err;
  }
}

export async function signUpWithEmail(email: string, password: string) {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (err) {
    throw err;
  }
}

export async function signOutAsync() {
  await signOut(auth);
}
