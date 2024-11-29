// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCaowRDJRszXayBL-QGnYokq0sdcC2SbWA",
  authDomain: "e-consultation-60f09.firebaseapp.com",
  projectId: "e-consultation-60f09",
  storageBucket: "e-consultation-60f09.appspot.com",
  messagingSenderId: "855684803621",
  appId: "1:855684803621:web:777ecba129b8867bc763cc"
};

// Initialize Firebase
const fbapp = initializeApp(firebaseConfig);
const firestoredb = getFirestore( fbapp );

export { fbapp, firestoredb, firebaseConfig }