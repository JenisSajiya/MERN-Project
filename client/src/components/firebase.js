// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDlxN0DNOLynQOnIlyB70dNy2GsXQNwYjM",
  authDomain: "mern-auth-44500.firebaseapp.com",
  projectId: "mern-auth-44500",
  storageBucket: "mern-auth-44500.appspot.com",
  messagingSenderId: "999745839172",
  appId: "1:999745839172:web:c2fdcaae073dad92c15c11",
  measurementId: "G-HHQS0H9PHG"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
