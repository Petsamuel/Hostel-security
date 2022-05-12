// const firebase = require('firebase/app');
const { initializeApp } = require("firebase/app");
const {
  getAuth,
  signInWithPhoneNumber,
  onAuthStateChanged,
  RecaptchaVerifier,
} = require("firebase/auth");
const {
  doc,
  getFirestore,
  collection,
  onSnapshot,
  getDocs,
  where,
  query,
} = require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyDesPeGT_C5ui6neIrWY7beVaVWIENfKIs",
  authDomain: "fir-92724.firebaseapp.com",
  projectId: "fir-92724",
  storageBucket: "fir-92724.appspot.com",
  messagingSenderId: "306360100843",
  appId: "1:306360100843:web:fa4c17ab4a4b67ea39dbae",
  measurementId: "G-3MJ0WC11J2",
};

initializeApp(firebaseConfig);

const db = getFirestore();
const colRef = collection(db, "users");
const auth = getAuth();
module.exports = {
  auth,
  doc,
  db,
  colRef,
  firebaseConfig,
  getDocs,
  getFirestore,
  collection,
  onSnapshot,
  where,
  query,
};
