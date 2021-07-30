import firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyC39-gcxgxRnPNJwj7zgPFjwZ4cS4_6LtA",
    authDomain: "whatsapp-clone-78085.firebaseapp.com",
    databaseURL: "https://whatsapp-clone-78085.firebaseio.com",
    projectId: "whatsapp-clone-78085",
    storageBucket: "whatsapp-clone-78085.appspot.com",
    messagingSenderId: "43735629580",
    appId: "1:43735629580:web:b6b28dfab21b1e92f05329",
    measurementId: "G-HTT3XE3BHV"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { auth, provider };
  export default db;