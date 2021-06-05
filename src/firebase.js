// const firebase = require("firebase");
// // Required for side-effects
// require("firebase/firestore");

import firebase from 'firebase/app'
import 'firebase/firebase-firestore'

var firebaseConfig = {
    apiKey: "AIzaSyA37wJ7eD_TP7TceIwkbRCE6eym5KabNCQ",
    authDomain: "crud-react-503a0.firebaseapp.com",
    projectId: "crud-react-503a0",
    storageBucket: "crud-react-503a0.appspot.com",
    messagingSenderId: "1039506698863",
    appId: "1:1039506698863:web:fd78b697b2e267f8b8d39a"
  };
  // Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);

export const db = fb.firestore();