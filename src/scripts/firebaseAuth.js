// NPM Packages
import { createUserWithEmailAndPassword } from "firebase/auth";

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
