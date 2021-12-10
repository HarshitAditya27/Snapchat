//import firebase from 'firebase'; 
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'
import 'firebase/compat/auth'

const firebaseConfig = {
    apiKey: "PUTYOURAPIKEYHERE",
    authDomain: "PUTYOURDOMAINHERE",
    projectId: "PUTYOURPROJECTIDHERE",
    storageBucket: "PUTYOURSTORAGEBUCKETHERE",
    messagingSenderId: "PUTYOURMESSAGINGSENDERIDHERE",
    appId: "PUTYOURAPPIDHERE",
};


const firebaseApp = firebase.initializeApp(firebaseConfig);
//const db = firebaseApp.firestore(); 
const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, storage, provider };
