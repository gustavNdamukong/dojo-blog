
import * as firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'

// init firebase
const firebaseConfig = {
    apiKey: "AIzaSyD-U_BZvhRSTJKgjqVaD__V7qrIRuiw6tQ",
    authDomain: "fir-training-7ea1d.firebaseapp.com",
    databaseURL: 'https://fir-training-7ea1d.firebaseio.com',
    projectId: "fir-training-7ea1d",
    storageBucket: "fir-training-7ea1d.appspot.com",
    messagingSenderId: "100793648509",
    appId: "1:100793648509:web:428c66e527d8c1ae6b7814"
  };


// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig)

// Initialize Cloud Firestore through Firebase
const db = firebaseApp.firestore()
console.log(db)

// init firestore service (in case we ever want to store any fileson Firebase's firestore service)
// const projectFirestore = con.firestore()

export { db }