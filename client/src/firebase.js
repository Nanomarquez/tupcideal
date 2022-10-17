// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD6wrk0tradnTuAUsoA_KqDC6z_VzLiFv0",
  authDomain: "tupcideal-dc772.firebaseapp.com",
  projectId: "tupcideal-dc772",
  storageBucket: "tupcideal-dc772.appspot.com",
  messagingSenderId: "1005932984877",
  appId: "1:1005932984877:web:b6a50e8afa1ee72745d6a4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)