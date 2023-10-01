// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = JSON.parse(process.env.REACT_APP_FIREBASE_KEY);
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };