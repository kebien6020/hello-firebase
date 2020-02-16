importScripts('https://www.gstatic.com/firebasejs/7.8.2/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/7.8.2/firebase-messaging.js')

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

const messaging = firebase.messaging()
