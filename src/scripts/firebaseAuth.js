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
  let payload = { data: undefined, error: false };

  try {
    const userCredential = await createUserWithEmailAndPassword(
      authentification,
      email,
      password
    );

    payload.data = userCredential.user.uid;
  } catch (error) {
    payload = { data: error, error: true };
  }

  return payload;
}

export async function loginUser(email, password) {
  let payload = { data: undefined, error: false };

  try {
    const userCredential = await signInWithEmailAndPassword(
      authentification,
      email,
      password
    );

    payload.data = userCredential.user.uid;
  } catch (error) {
    payload = { data: error, error: true };
  }

  return payload;
}

export async function recoverUser(email) {
  let payload = { data: undefined, error: false };

  try {
    await sendPasswordResetEmail(authentification, email);
    payload.data = "Email sent";
  } catch (error) {
    payload = { data: error, error: true };
  }

  return payload;
}
