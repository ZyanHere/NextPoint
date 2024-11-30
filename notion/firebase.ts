import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"



const firebaseConfig = {
    apiKey: "AIzaSyB9iXMFjrtmi7EbwgIBx0sVgJIagSMcpBE",
    authDomain: "notion-like-d8b28.firebaseapp.com",
    projectId: "notion-like-d8b28",
    storageBucket: "notion-like-d8b28.firebasestorage.app",
    messagingSenderId: "917519654733",
    appId: "1:917519654733:web:2718738602bca6a7ac2104"
};


// Initialize Firebase
// const app = initializeApp(firebaseConfig);

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };