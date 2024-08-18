// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC1d_jfi9P0spZHNbpkg8sUOe4rVgTgIQc",
  authDomain: "flashcardai-9c846.firebaseapp.com",
  projectId: "flashcardai-9c846",
  storageBucket: "flashcardai-9c846.appspot.com",
  messagingSenderId: "190488590814",
  appId: "1:190488590814:web:c0b5b5ed042fbe2d4c454f",
  measurementId: "G-CPD6H5FH9N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export {db}