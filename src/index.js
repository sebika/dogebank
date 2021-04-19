import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import firebase from "firebase/app";
import "./index.css";

firebase.initializeApp({
  apiKey: "AIzaSyDx9yELRjmSCtwHrEcRUhOKXob_2Od8vgY",
  authDomain: "dogebank-connect.firebaseapp.com",
  projectId: "dogebank-connect",
  storageBucket: "dogebank-connect.appspot.com",
  messagingSenderId: "225936319423",
  appId: "1:225936319423:web:c2dab13abefb1322a8370a",
  measurementId: "G-57H96PV20F"
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
