// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
const firebaseConfig = {
  apiKey: "AIzaSyA4civw4wCtveQaHsOR7hjw7Bcv_JB0INw",
  authDomain: "brand-factory-536c5.firebaseapp.com",
  projectId: "brand-factory-536c5",
  storageBucket: "brand-factory-536c5.appspot.com",
  messagingSenderId: "537851460608",
  appId: "1:537851460608:web:6071502434f6c1160cece5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth =getAuth(app)
export const db =getFirestore(app)
export const storage =getStorage(app)
export default app