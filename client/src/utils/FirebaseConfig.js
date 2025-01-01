// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCxxJWFhIWLK-RR9oT3kaj1XnbsrwBYMns",
  authDomain: "e-commerce-trikor.firebaseapp.com",
  projectId: "e-commerce-trikor",
  storageBucket: "e-commerce-trikor.firebasestorage.app",
  messagingSenderId: "69443777358",
  appId: "1:69443777358:web:314d372999d85f1605e41f",
  measurementId: "G-GSP9PE73KQ"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);