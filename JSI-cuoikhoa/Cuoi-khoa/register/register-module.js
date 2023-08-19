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

import { getDatabase, ref, set} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";

const db = getDatabase();
const auth = getAuth()


const username = document.getElementById('username');
const email = document.getElementById('email');
const pass = document.getElementById('password');
const submit = document.getElementById('submit');

function validation(){
    let emailregex=/[a-zA-Z0-9]+@(gmail|yahoo|outlook)\.com/;     
    let userregex =/[a-zA-Z0-9]{5,}/;
    if(!userregex.test(username.value)){
        alert("username should alphabets, 5 character");
        return false;
    }

    if(!emailregex.test(email.value)){
        alert("the email a valid email ");
        return false;
    }

    
    return true;
}
//  --dang ky

function register(){
    if(!validation()){
        return;
    }

    const dbRef = ref(db);

    createUserWithEmailAndPassword(auth, email.value, pass.value)
        .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                set(ref(db, "UserList/" + user.uid),
                {
                    username: username.value,
                    role: "user",
                }).then(()=>{
                    
                    document.location.replace("../login/login.html")
                }).catch((error)=>{
                    alert("error "+ error);
                })
                // ...
                

            })
        .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
                alert("dang ky ko thanh cong")
            })    
}
//submit

submit.addEventListener('click', () =>{
    register()
}) 