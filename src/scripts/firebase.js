// NPM package
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // plugin for FireStore database
import { getStorage } from "firebase/storage"; // plugin for the Firebase CloudStorage dynamic hosting

// Properties
const firebaseConfig = {
  apiKey: "AIzaSyAX8XRB_dKVak22gumWb56h-MxsCBPBDKE",
  authDomain: "firestore-fe2.firebaseapp.com",
  projectId: "firestore-fe2",
  storageBucket: "firestore-fe2.appspot.com",
  messagingSenderId: "1009972372916",
  appId: "1:1009972372916:web:45044610cf9ed26edf7ee1",
};
const firebaseapp = initializeApp(firebaseConfig);

export const fireStore = getFirestore(firebaseapp);
export const cloudStorage = getStorage(firebaseapp);
