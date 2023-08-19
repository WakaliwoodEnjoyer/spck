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
import {getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { getDatabase, ref, child, get } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";

const dbRef = ref(getDatabase());
const auth = getAuth();
const db = getFirestore();

/////LOGIN
let login = document.getElementById("login")
let welcome = document.getElementById("welcome");
let username = document.getElementById("username");
let logout = document.getElementById("logout");

////PAYMENT DATA
let price = document.getElementById("price")
let submit = document.getElementById("pay-button")

let phone = document.getElementById("phone")
let address = document.getElementById("address")
let orderer = document.getElementById("name")
let momo = document.getElementById("momo")
let cash = document.getElementById("cash")

let payInfo = document.getElementById("online-pay")
let cashPay = document.getElementById("cash-pay")

//INPUT EFFECT
let info = document.querySelectorAll(".info")
let asterisk = document.querySelectorAll(".asterisk")
info.forEach((element, index) => {
  console.log(element)

  element.addEventListener("focus", (e)=>{
    asterisk[index].style.right = "0px"
    asterisk[index].style.top = "0px"
  })

  element.addEventListener("focusout", (e)=>{
    if (element.value == "") {
      element.style.borderColor = "red"
      asterisk[index].style.color = "red"

    }
  })

  element.addEventListener("input", (e)=>{
    if (element.value == "") {
      element.style.borderColor = "red"
      asterisk[index].style.color = "red"
    } else {
      element.style.borderColor = "rgb(73, 197, 57)"
      asterisk[index].style.color = "rgb(73, 197, 57)"
    }
  })
});






momo.addEventListener('change', (e) => {
  payInfo.style.display = "flex"
  cashPay.style.display = "none"
});
cash.addEventListener('change', (e) => {
  cashPay.style.display = "flex"
  payInfo.style.display = "none"
})

////TABLE DATA

let orderedItems = localStorage.getItem("orderedItems")
let items = JSON.parse(orderedItems)




function encrypt(item) {
  var encryption = CryptoJS.AES.encrypt(item, 'qgwTCF%3qf0#jtodYD7|Q108"*qS>|');
  return encryption.toString();
}
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    get(child(dbRef, `UserList/${uid}/username`)).then((snapshot) => {
      if (snapshot.exists()) {

        welcome.style.display = "flex";
        login.style.display = "none";
        username.innerHTML = snapshot.val();

        submit.addEventListener("click", (e) => {
          e.preventDefault()
          order(uid)
          


        })
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


logout.addEventListener("click", (e) => {
  signOut(auth).then(() => {
  }).catch((error) => {
    alert("error code: " + error + " when signing out")
  });
})



let a = localStorage.getItem("price")

if (a == null) {
  price.innerHTML = price.innerHTML
} else if (a < 1000) {
  price.innerHTML += `${a}.000đ`;
} else if (a >= 1000 && a < 1000000) {
  price.innerHTML += `${(a / 1000).toFixed(3)}.000đ`;
}

function validate() {
  let nameRegex = /[a-zA-Z][^0-9]$/;

  let phoneRegex = /^[0-9]{7,13}$/;
  let addressRegex = /[a-zA-Z0-9]/;

  if (!nameRegex.test(orderer.value)) {
    alert("Tên không hợp lệ")
    return true
  }
  if (!phoneRegex.test(phone.value)) {
    alert("Số điện thoại không hợp lệ")
    return true
  }
  if (!addressRegex.test(address.value)) {
    alert("Địa chỉ không hợp lệ")
    return true
  }
  return false
}

function order(uid) {
  if (validate()) {
    return
  }

  var ref = doc(db, "orders", uid)
  let a = ""


  if (momo.checked == true) {
    a = momo.value
  } else if (cash.checked == true) {
    a = cash.value
  } else {
    a = "error"
  }


  setDoc(ref, {
    name: encrypt(orderer.value),
    address: encrypt(address.value),
    phone: encrypt(phone.value),
    order: orderedItems,
    payment: a,
    uid: uid,
    status: "active",
  }).then(() => {
    let announcement =
      `Đặt hàng thành công!
`

    alert(announcement)
    document.location.replace("../main-page/index.html")
  }).catch((error) => {
    alert("Đặt hàng không thành công do: " + error)
  })

}



