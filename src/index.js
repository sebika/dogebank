import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from "firebase/app";

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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
