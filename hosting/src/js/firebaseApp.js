import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'

var config = {
    apiKey: "AIzaSyDY30PPVzuDZYx92ONHKdqL0zXopHizDxw",
    authDomain: "prickathon.firebaseapp.com",
    databaseURL: "https://prickathon.firebaseio.com",
    projectId: "prickathon",
    storageBucket: "prickathon.appspot.com",
    messagingSenderId: "854301723180"
};
export const firebaseApp = firebase.initializeApp(config);