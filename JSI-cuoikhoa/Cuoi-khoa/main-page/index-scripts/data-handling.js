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


import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { getDatabase, ref, child, get, set } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";
import {
  getFirestore, onSnapshot, doc, getDoc, setDoc, collection, addDoc, updateDoc, deleteDoc, deleteField
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
const db = getFirestore();
const dbRef = ref(getDatabase());
const auth = getAuth();

/////LOGIN
let login = document.getElementById("login")
let welcome = document.getElementById("welcome");
let username = document.getElementById("username");
let logout = document.getElementById("logout");


onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    get(child(dbRef, `UserList/${uid}/role`)).then((snapshot) => {
      if (snapshot.exists()) {
        if (snapshot.val() == "employee") {
          document.location.replace("../employee-console/console.html")
        }
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });

    get(child(dbRef, `UserList/${uid}/username`)).then((snapshot) => {
      if (snapshot.exists()) {
        
        welcome.style.display = "flex";
        login.style.display = "none";
        username.innerHTML = snapshot.val();
  
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
    // ...
  } else {
    // User is signed out
    // ...
    welcome.style.display = "none";
    login.style.display = "flex";
  }
});


logout.addEventListener("click", (e)=>{
  signOut(auth).then(() => {
  }).catch((error) => {
    alert("error code: "+error+" when signing out")
  });
})


////REVIEW

let title = document.getElementById("review-title")
let content = document.getElementById("review-content")
let submit = document.getElementById("review-submit")

submit.addEventListener("click", (e)=>{
    e.preventDefault()
    var ref = doc(db, "comments", auth.currentUser.uid)
    setDoc(ref, {
      title: title.value,
      content: content.value
    }).then(() => { 
      alert("Gửi thành công")
      // document.location.replace("../main-page/index.html")
    }).catch((error) => {
      alert("Lỗi khi gửi: " + error)
    })
    
})