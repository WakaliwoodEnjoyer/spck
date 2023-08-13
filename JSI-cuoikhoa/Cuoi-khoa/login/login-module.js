// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAeGDzJavNbF-qUGvJZshVIOx4_iGTpzvY",
  authDomain: "coffee-shop-843e5.firebaseapp.com",
  projectId: "coffee-shop-843e5",
  storageBucket: "coffee-shop-843e5.appspot.com",
  messagingSenderId: "207491061068",
  appId: "1:207491061068:web:db014d662ce9a0233aebe9"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);


import { getAuth, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";


const auth = getAuth()


const email = document.getElementById('email');
const pass = document.getElementById('password');
const submit = document.getElementById('submit');

submit.addEventListener("click", ()=>{
    signInWithEmailAndPassword(auth, email.value, pass.value)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      document.location.replace("../main-page/index.html")

      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });

})
    

