// NPM package
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // plugin for FireStore database
import { getStorage } from "firebase/storage"; // plugin for the Firebase CloudStorage dynamic hosting
import { getAuth } from "firebase/auth"; // plugin for the Firebase Auth account system

// Properties
const firebaseConfig = {
  apiKey: "AIzaSyAX8XRB_dKVak22gumWb56h-MxsCBPBDKE",
  authDomain: "firestore-fe2.firebaseapp.com",
  projectId: "firestore-fe2",
  storageBucket: "firestore-fe2.appspot.com",
  messagingSenderId: "1009972372916",
  appId: "1:1009972372916:web:45044610cf9ed26edf7ee1",
};
const firebaseApp = initializeApp(firebaseConfig);

export const fireStore = getFirestore(firebaseApp);
export const cloudStorage = getStorage(firebaseApp);
export const authentification = getAuth(firebaseApp);
