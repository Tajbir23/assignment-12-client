// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBaAPb2l-20lWJXBOVcmkZmj8XDJ4cyJ0g",
  authDomain: "diagnostic-center-5a909.firebaseapp.com",
  projectId: "diagnostic-center-5a909",
  storageBucket: "diagnostic-center-5a909.appspot.com",
  messagingSenderId: "939712558695",
  appId: "1:939712558695:web:069d26b891787a38f0c6c2",
  measurementId: "G-4L8WWRLJNC"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, analytics, auth };