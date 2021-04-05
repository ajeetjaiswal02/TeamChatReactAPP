import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyAqC7Ib2xiSK08B1hkM02LriQHbhOvOvdY",
    authDomain: "team-chatter.firebaseapp.com",
    projectId: "team-chatter",
    storageBucket: "team-chatter.appspot.com",
    messagingSenderId: "974844024207",
    appId: "1:974844024207:web:1617ad461fe0b11319a7fa"
};

let app;

if(firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig)
} else {
    app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };