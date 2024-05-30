import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyCeKmgCWWQ7GGWJb2RB5JldoA2M79uvK1c",
  authDomain: "react-entertainment-app-48362.firebaseapp.com",
  projectId: "react-entertainment-app-48362",
  storageBucket: "react-entertainment-app-48362.appspot.com",
  messagingSenderId: "1094105047227",
  appId: "1:1094105047227:web:f7ce5170ac7a1d44bec99e",
  measurementId: "G-79THJEFVMP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
