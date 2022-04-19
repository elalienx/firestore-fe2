// NPM package
import {
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";

// Project files
import { fireStore } from "./firebase";

// Methods
// -- Create
export async function createDocument(path, data) {
  const documentPath = collection(fireStore, path);
  const document = await addDoc(documentPath, data);

  return document.id;
}

// -- Read
export async function getDocument(path, id) {
  const documentPath = doc(fireStore, path, id);
  const document = await getDoc(documentPath);

  return document.data();
}

export async function getCollection(path) {
  const collectionPath = collection(fireStore, path); // firebase-fe2/firestore/drivers
  const snapshot = await getDocs(collectionPath);
  const documents = snapshot.docs.map((item) => {
    return { id: item.id, ...item.data() };
  });

  return documents;
}

// -- Update (pending)

// -- Delete
export async function deleteDocument(path, id) {
  const documentPath = doc(fireStore, path, id);

  await deleteDoc(documentPath);
  console.log("Deleted document successfully", id);
}
