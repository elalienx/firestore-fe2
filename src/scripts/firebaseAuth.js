// NPM Packages
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { sendPasswordResetEmail } from "firebase/auth";

// Project file
import { authentification } from "./firebase";

// Methods
export async function createUser(email, password) {
  const credentials = await createUserWithEmailAndPassword(
    authentification,
    email,
    password
  );

  return credentials.user.uid;
}

export async function loginUser(email, password) {
  const credentials = await signInWithEmailAndPassword(
    authentification,
    email,
    password
  );

  return credentials.user.uid;
}

export async function recoverUser(email) {
  await sendPasswordResetEmail(authentification, email);
  return "Email sent";
}
