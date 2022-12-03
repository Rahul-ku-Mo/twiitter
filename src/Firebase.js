
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZpdVKWbzpuS7mka8vhXpkxWJYH6KgNT4",
  authDomain: "my-twitter-52cea.firebaseapp.com",
  projectId: "my-twitter-52cea",
  storageBucket: "my-twitter-52cea.appspot.com",
  messagingSenderId: "893527027905",
  appId: "1:893527027905:web:7de3da52811d73414d2440",
  measurementId: "G-52NBKEL7FP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const analytics = getAnalytics(app);

export const auth = getAuth(app);

export const db = getFirestore(app);

export const storage = getStorage(app);