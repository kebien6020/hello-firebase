// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from 'firebase/app'

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
// import "firebase/analytics";

// Add the Firebase products that you want to use
import 'firebase/auth'
import 'firebase/firestore'

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAir6Y5ABvu_2fO3GsUBKjGjBKM4YEu3t4',
  authDomain: 'hello-firebase-b178a.firebaseapp.com',
  databaseURL: 'https://hello-firebase-b178a.firebaseio.com',
  projectId: 'hello-firebase-b178a',
  storageBucket: 'hello-firebase-b178a.appspot.com',
  messagingSenderId: '678873861351',
  appId: '1:678873861351:web:a8cb9188052ca83a066642'
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()
const db = firebase.firestore()

export { firebase, auth, db }
