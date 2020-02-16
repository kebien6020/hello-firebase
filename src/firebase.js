// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from 'firebase/app'

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
// import "firebase/analytics";

// Add the Firebase products that you want to use
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/messaging'

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
const messaging = (() => {
  if (firebase.messaging.isSupported()) {
    return firebase.messaging()
  }

  return null
})()

const setupMessaging = async () => {
  if (messaging) {
    messaging.usePublicVapidKey('BIX-hxgox44qDJKIHbBkNTpOs-zcfgltx0BetMkrL7vvFOar1gQBV2JUQkZk8RRK3S5THND2ZPb6L65z12xLH38')
  
    try {
      await messaging.requestPermission()
    } catch (err) {
      console.warn('Permission denied')
      return
    }

    console.log('Have permission')
    try {
      const token = await messaging.getToken()
      console.log(token)
    } catch (err) {
      console.error('Error getting token')
    }
  }

}

setupMessaging()

messaging.onMessage(payload => {
  console.log('onMessage: ', payload)
})


export { firebase, auth, db, messaging }
