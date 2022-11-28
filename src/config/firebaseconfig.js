// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCdG0wUawKnSYWuly6it08qfT2sakUh9XE",
  authDomain: "react-native-firebase-867b7.firebaseapp.com",
  projectId: "react-native-firebase-867b7",
  storageBucket: "react-native-firebase-867b7.appspot.com",
  messagingSenderId: "674635372549",
  appId: "1:674635372549:web:1c8ebc53643c66d533646c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const db = getFirestore(app);
