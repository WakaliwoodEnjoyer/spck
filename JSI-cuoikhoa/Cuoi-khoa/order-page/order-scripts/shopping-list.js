// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js"
import { getAuth } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
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
const db = getFirestore(app);;

const auth = getAuth();







let toggleButton = document.getElementById("open-shoplist");
let shoppingList = document.getElementById("pending-items");
shoppingList.style.height = "0px";
let a = 0;
let price = 0;

let cardContainer = document.getElementById("card-container");

toggleButton.addEventListener("click", (e) => {
    if (shoppingList.style.height == "0px") {
        shoppingList.style.height = "calc(100vh - 25px - 82px)";
    } else {
        shoppingList.style.height = "0px";
    }
})

let orderedItems = JSON.parse(localStorage.getItem("orderedItems"))
for (let i = 0; i < orderedItems.length; i++) {
    let item = orderedItems[i];
    
    // create item card
    let card = document.createElement("div");
    card.classList.add("order-card");
    cardContainer.appendChild(card);



    if ((item.price * item.quantity)>=1000 && (item.price * item.quantity)<1000000) {
        price = ((item.price * item.quantity)/1000).toFixed(3);
    } else {
        price = item.price * item.quantity;
    }

    card.innerHTML = `
        <img class="order-image" src="${item.image}" alt="">
        <div class="order-title">
            <h6 style="font-size: 10px;">${item.name}</h6>
            <p style="border-right: 1px solid rgb(189, 189, 189); padding-right: 4px;">x${item.quantity}</p>
        </div>
        <p style="font-size: 10px">${price}.000đ</p>
        
        <button style="height: 20px; width: 20px; font-size: 10px; padding: 0;" class="cancel-order" type="submit">X</button>
        
    `

    a += item.price * item.quantity;
    


    
}

let orderConfirm = document.getElementById("orderConfirm");
if (a==0) {
    orderConfirm.innerHTML = orderConfirm.innerHTML
} else if (a<1000) {
    orderConfirm.innerHTML += ` - ${a}.000đ` ;   
} else if (a>=1000 && a<1000000) {
    orderConfirm.innerHTML += ` - ${(a/1000).toFixed(3)}.000đ`;
}

let cancelButtons = document.getElementsByClassName("cancel-order");

for (let c = 0; c < cancelButtons.length; c++) {
    let button = cancelButtons[c];
    button.addEventListener("click", (e)=>{
        orderedItems.splice(c,1)
        localStorage.setItem("orderedItems", JSON.stringify(orderedItems))
        
    })
}


orderConfirm.addEventListener("click", (e)=>{
    e.preventDefault()
    set(ref(db, `UserList/${auth.currentUser.uid}/order`),
    {
        orderedItems
    }).then(()=>{
        alert("order sent")
    }).catch((error)=>{
        alert("error "+ error);
    })
    
})