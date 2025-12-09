// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzqI33KARkTM3y5e5m1poenjmgZoDRHyY",
  authDomain: "lv-servis-f91d6.firebaseapp.com",
  projectId: "lv-servis-f91d6",
  storageBucket: "lv-servis-f91d6.firebasestorage.app",
  messagingSenderId: "770895825300",
  appId: "1:770895825300:web:a19994f3fefc7666102781"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
