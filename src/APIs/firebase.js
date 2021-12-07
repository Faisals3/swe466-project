import firebase from 'firebase/app';
import '@firebase/firestore';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAgquYnNWXyCXpQ04KxRBNJtHRQqY_6SxY",
    authDomain: "swe466-bc90c.firebaseapp.com",
    projectId: "swe466-bc90c",
    storageBucket: "swe466-bc90c.appspot.com",
    messagingSenderId: "817593314292",
    appId: "1:817593314292:web:92605de3eb1750b1f167a1"
  };

let Firebase;
if (firebase.apps.length === 0) {
  Firebase = firebase.initializeApp(firebaseConfig);
}

export const dbRoot = firebase.firestore();

export default Firebase;
