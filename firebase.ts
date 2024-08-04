import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBAPy2YBhXMTMPAf1ECp82Yo8FWvm45oos",
  authDomain: "notion-clone-863c7.firebaseapp.com",
  projectId: "notion-clone-863c7",
  storageBucket: "notion-clone-863c7.appspot.com",
  messagingSenderId: "419390231217",
  appId: "1:419390231217:web:c0ed80fed5ad3e9e4bc890",
  measurementId: "G-YG8JFJY9DE",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };
