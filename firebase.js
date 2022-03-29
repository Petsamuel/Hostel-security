const firebase = require('firebase/app');
const auth = require('firebase/auth');

const firebaseConfig = {
    apiKey: "AIzaSyAcdPogfXbLI35w8UMZoAETxO5DVDIHzPU",
    authDomain: "security-system-5169e.firebaseapp.com",
    projectId: "security-system-5169e",
    storageBucket: "security-system-5169e.appspot.com",
    messagingSenderId: "127453085475",
    appId: "1:127453085475:web:c7ff9244d910f859e45696"
};

firebase.initializeApp(firebaseConfig);


module.exports = firebaseConfig;