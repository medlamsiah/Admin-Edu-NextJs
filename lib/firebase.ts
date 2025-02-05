import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBzZadTXrbg7_X-RAjBvJX2JKr_jZ4Xg8M",
  authDomain: "etudiantgestion-29ccd.firebaseapp.com",
  projectId: "etudiantgestion-29ccd",
  storageBucket: "etudiantgestion-29ccd.firebasestorage.app",
  messagingSenderId: "137442627055",
  appId: "1:137442627055:web:0b2e17d4fc060f2e87ba1a"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };