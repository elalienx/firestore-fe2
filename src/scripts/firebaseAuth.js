// NPM Packages
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

// Project file
import { authentification } from "./firebase";

// Methods
export async function createUser(email, password) {
  const userCredential = await createUserWithEmailAndPassword(
    authentification,
    email,
    password
  );

  return userCredential.user.uid;
}

export async function loginUser(email, password) {
  const userCredential = await signInWithEmailAndPassword(
    authentification,
    email,
    password
  );

  return userCredential.user.uid;
}

export async function recoverUser(email) {
  await sendPasswordResetEmail(authentification, email);
}
