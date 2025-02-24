// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth , getAnalytics , signInWithPhoneNumber} from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCFUBM2yHsr2im413iPpnR3uNlVAswYNk8",
  authDomain: "vibematch-1e019.firebaseapp.com",
  projectId: "vibematch-1e019",
  storageBucket: "vibematch-1e019.firebasestorage.app",
  messagingSenderId: "243704161787",
  appId: "1:243704161787:web:e9d128a62424194f2ad75e",
  measurementId: "G-0F5ZLJ46X2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;