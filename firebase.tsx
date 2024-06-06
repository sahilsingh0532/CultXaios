// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBwRxKgs_HRhB62ci0snDZpUbzSU2WcBgE",
    authDomain: "superchat-17842.firebaseapp.com",
    projectId: "superchat-17842",
    storageBucket: "superchat-17842.appspot.com",
    messagingSenderId: "231001353340",
    appId: "1:231001353340:web:999b3954fd9af866512df9",
    measurementId: "G-S30BYJTX0N"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();

export { firebase, auth, firestore, storage };