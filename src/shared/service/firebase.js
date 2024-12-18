import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/storage";

try {
  firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
  });
  console.log("Firebase inicializado com sucesso!", firebase);
} catch (error) {
  console.error("Erro ao inicializar o Firebase:", error);
}
export const fb = {
  firestore: firebase.firestore(),
  auth: firebase.auth(),
  googleProvider: new firebase.auth.GoogleAuthProvider(),
  arrayUnion: firebase.firestore.FieldValue.arrayUnion,
  increment: firebase.firestore.FieldValue.increment,
  storage: firebase.storage(),
};
