// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyBMksuh51YxlEQNL4IvvbS6IvkchswWTAA",
    authDomain: "twitter-application-d80f7.firebaseapp.com",
    projectId: "twitter-application-d80f7",
    storageBucket: "twitter-application-d80f7.appspot.com",
    messagingSenderId: "904107914005",
    appId: "1:904107914005:web:f0f874aa7517813298af1c",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export default app;
export { db, storage };
