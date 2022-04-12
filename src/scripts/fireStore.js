// NPM package
import { collection, getDocs } from "firebase/firestore";

// Project files
import fireStore from "./firebase";

// Methods
export async function getCollection(path) {
  const collectionPath = collection(fireStore, path); // firebase-fe2/firestore/drivers
  const snapshot = await getDocs(collectionPath);

  console.log("data", snapshot);
}

const querySnapshot = await getDocs(collection(db, "users"));
querySnapshot.forEach((doc) => {
  console.log(`${doc.id} => ${doc.data()}`);
});
