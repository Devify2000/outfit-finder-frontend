// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import {
  getAuth,
  GoogleAuthProvider,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBCQM-YvZWbqF68Gl-DBnsoD6dqg_YpRdU",
  authDomain: "hopple-findthatfit.firebaseapp.com",
  projectId: "hopple-findthatfit",
  storageBucket: "hopple-findthatfit.firebasestorage.app",
  messagingSenderId: "417992077899",
  appId: "1:417992077899:web:80db95d83b64f8dbebd3ce",
  measurementId: "G-DS82VDHW5Y",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// if (typeof window !== "undefined") {
//   isSupported().then((supported) => {
//     if (supported) {
//       getAnalytics(app);
//     }
//   });
// }

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// ensure user stays logged in after refresh
setPersistence(auth, browserLocalPersistence);

export { auth, provider };
