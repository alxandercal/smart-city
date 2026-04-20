import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";


  const firebaseConfig = {
    apiKey: "AIzaSyBZNBQzL16Np0OfxByzWWiLeNevzEoBpJk",
    authDomain: "smart-city-558d7.firebaseapp.com",
    projectId: "smart-city-558d7",
    storageBucket: "smart-city-558d7.firebasestorage.app",
    messagingSenderId: "608268719364",
    appId: "1:608268719364:web:89e1a6ba1eb5e1b8972c51"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  

  export{ app,auth,db }

