// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCaTui0hR3Fw08WhHMjFw6xNXG9HXk-QT0",
  authDomain: "ai-trip-a2321.firebaseapp.com",
  projectId: "ai-trip-a2321",
  storageBucket: "ai-trip-a2321.firebasestorage.app",
  messagingSenderId: "416091426494",
  appId: "1:416091426494:web:0b28802e0d4e961d4a98ef",
  measurementId: "G-8TQNLRPKNM"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
// const analytics = getAnalytics(app);