// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC34Ar2SFf26cIXjmmRzavy_tZGMolEbjg",
  authDomain: "generacionsoftware-d979b.firebaseapp.com",
  projectId: "generacionsoftware-d979b",
  storageBucket: "generacionsoftware-d979b.firebasestorage.app",
  messagingSenderId: "168794722079",
  appId: "1:168794722079:web:46e646c5dffc72c0c72a2a",
  measurementId: "G-DL915VZS7Z",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
