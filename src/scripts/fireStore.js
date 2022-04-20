// NPM package
import { doc, collection } from "firebase/firestore";
import { addDoc, getDoc, getDocs, setDoc, deleteDoc } from "firebase/firestore";

// Project files
import { fireStore } from "./firebase";

// Methods
// -- Create (❌ error hanlding pending)
export async function createDocument(path, data) {
  let payload = { data: undefined, error: false };

  try {
    const documentPath = collection(fireStore, path); // missing the db ref on purpose
    const document = await addDoc(documentPath, data);

    payload = { data: document.id, error: false };
  } catch (error) {
    payload = { data: error, error: true };
  }

  return payload;
}

// -- Read (⏱ error hanlding in progress)
export async function readDocument(path, id) {
  const documentPath = doc(fireStore, path, id);
  const document = await getDoc(documentPath);

  return document.data();
}

export async function readCollection(path) {
  let payload = { data: undefined, error: false };

  try {
    const collectionPath = collection(fireStore, path);
    const snapshot = await getDocs(collectionPath);
    const documents = snapshot.docs.map((item) => {
      return { id: item.id, ...item.data() };
    });

    payload = { data: documents, error: false };
  } catch (error) {
    payload = { data: error, error: true };
  }

  return payload;
}

// -- Update (❌ error hanlding pending)
export async function updateDocument(path, data) {
  const id = data.id;
  const documentPath = doc(fireStore, path, id);

  await setDoc(documentPath, data);
}

// -- Delete (❌ error hanlding pending)
export async function deleteDocument(path, id) {
  const documentPath = doc(fireStore, path, id);

  await deleteDoc(documentPath);
}
