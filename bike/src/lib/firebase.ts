import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCOz5EgquvPWOZEFOWvMPsrwOBPVQsBz44",
  authDomain: "bike-d867d.firebaseapp.com",
  projectId: "bike-d867d",
  storageBucket: "bike-d867d.firebasestorage.app",
  messagingSenderId: "447884330482",
  appId: "1:447884330482:web:d1c2c20d43c621de1e576b"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
