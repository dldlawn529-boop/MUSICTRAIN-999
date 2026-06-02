import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD-923gmXFUxxyuDL1W0wCFTLjfsGiywH0",
  authDomain: "musictrain999-260624.firebaseapp.com",
  projectId: "musictrain999-260624",
  storageBucket: "musictrain999-260624.firebasestorage.app",
  messagingSenderId: "270037117642",
  appId: "1:270037117642:web:629b94d04d7c385f7d6233",
  measurementId: "G-W4GT1984S9"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
