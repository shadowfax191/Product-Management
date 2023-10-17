// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBebwwG5GFEDKR5ESjcb_HAfPi9aBtMKHg",
  authDomain: "entertainment-brand-shop.firebaseapp.com",
  projectId: "entertainment-brand-shop",
  storageBucket: "entertainment-brand-shop.appspot.com",
  messagingSenderId: "839342825205",
  appId: "1:839342825205:web:855c67b6fdca02711d6fbc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 const auth = getAuth(app)
 export default auth