//import firebase from 'firebase'; 
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'
import 'firebase/compat/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCtn8iInAoeT8jANcAbo6LaQNQD-5UZC18",
    authDomain: "snapchat-fe697.firebaseapp.com",
    projectId: "snapchat-fe697",
    storageBucket: "snapchat-fe697.appspot.com",
    messagingSenderId: "811679916981",
    appId: "1:811679916981:web:01bcbb5b8b183ad717affc"
};


const firebaseApp = firebase.initializeApp(firebaseConfig);
//const db = firebaseApp.firestore(); 
const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, storage, provider };