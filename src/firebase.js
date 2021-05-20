import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase'

const app = firebase.initializeApp({
    apiKey: "AIzaSyDx9yELRjmSCtwHrEcRUhOKXob_2Od8vgY",
    authDomain: "dogebank-connect.firebaseapp.com",
    projectId: "dogebank-connect",
    storageBucket: "dogebank-connect.appspot.com",
    messagingSenderId: "225936319423",
    appId: "1:225936319423:web:c2dab13abefb1322a8370a",
    measurementId: "G-57H96PV20F"
})

export const auth = app.auth()
export const db = app.firestore()
export default app
