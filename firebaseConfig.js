import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore , addDoc, collection , getDocs , query , deleteDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDw3yPggpsa5bnI0mIGHY9YfbWJKa4L4g4",
    authDomain: "de-ve-de-f6d5d.firebaseapp.com",
    projectId: "de-ve-de-f6d5d",
    storageBucket: "de-ve-de-f6d5d.appspot.com",
    messagingSenderId: "83866951846",
    appId: "1:83866951846:web:9450b5bce5eaca054f1467"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
let db;
try {
    db = getFirestore(app);
} catch (error) {
    console.log(error);
}

//console.log(db);

export { db, addDoc, collection , getDocs , query , deleteDoc, updateDoc };