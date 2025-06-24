import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBO6MWUEQLBnXNdIuWaDi-O77RweiFPZSM",
  authDomain: "react-native-app-1eee6.firebaseapp.com",
  projectId: "react-native-app-1eee6",
  storageBucket: "react-native-app-1eee6.firebasestorage.app",
  messagingSenderId: "844598096422",
  appId: "1:844598096422:web:62827959bc1f1467af6ce7",
  measurementId: "G-74CBGSCGH5",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
