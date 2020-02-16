const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp()

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const db = admin.firestore()


exports.notifyAdmins = functions.https.onRequest(async (request, response) => {
  const snap = await db.collection('users')
    .where('roles', 'array-contains', 'admin')
    .get()
  const adminUsers = snap.docs.map(docSnap => docSnap.data())
  const registrationTokens = adminUsers.map(user => user.notification_key)
  const message = {
    notification: {
      title: 'Hello admins',
      body: 'Test message to admins',
    },
    tokens: registrationTokens,
  }

  try {
    await admin.messaging().sendMulticast(message)
  } catch (err) {
    console.error(err)
    response.status(409).json({success: false, message: 'Failed to send notifications', err})
    throw err
    return
  }

  response.json(adminUsers)
})

