// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
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

const auth = getAuth();







let toggleButton = document.getElementById("open-shoplist");
let shoppingList = document.getElementById("pending-items");
shoppingList.style.height = "0px";
let price = 0;
let orderConfirm = document.getElementById("orderConfirm");

let billTable = document.getElementById("order-list");

toggleButton.addEventListener("click", (e) => {
    if (shoppingList.style.height == "0px") {
        shoppingList.style.height = "calc(100vh - 25px - 82px)";
    } else {
        shoppingList.style.height = "0px";
    }
})
let orderedItems = JSON.parse(localStorage.getItem("orderedItems"))
function addItems() {
    for (let i = 0; i < orderedItems.length; i++) {
        let item = orderedItems[i];
    
    
        if ((item.price * item.quantity)>=1000 && (item.price * item.quantity)<1000000) {
            price = ((item.price * item.quantity)/1000).toFixed(3);
        } else {
            price = item.price * item.quantity;
        }
    
        billTable.innerHTML += `
        <tr class="bill-item">
            <td class="bill-content">${i+1}</td>
            <td class="bill-content">${item.name}</td>
            <td class="bill-content"><input class="quantity-input" type="number" value="${item.quantity}" onkeydown="return false" min="1" step="1"></td>
            <td class="bill-content">${item.price}.000đ</td>
            <td class="bill-content total-price">${price}.000đ</td>
            <td class="bill-content"><button class="cancel-button">X</button></td>
        </tr>
        `
    
        
    
    
        
    }
}
function updatePrice() {
    let allPrice = 0;

    for (let i = 0; i < orderedItems.length; i++) {
        let item = orderedItems[i];
        allPrice += item.price * item.quantity;
    }


    if (allPrice==0) {
        orderConfirm.innerHTML = "Order"
    } else if (allPrice<1000) {
        orderConfirm.innerHTML = `Order - ${allPrice}.000đ` ;   
    } else if (allPrice>=1000 && allPrice<1000000) {
        orderConfirm.innerHTML = `Order - ${(allPrice/1000).toFixed(3)}.000đ`;
    }
    localStorage.setItem("price", allPrice)

}

addItems()
updatePrice()


let quantityInp = document.querySelectorAll(".quantity-input");
quantityInp.forEach((input, index) => {
    input.addEventListener("input", (e)=>{
        
        let item = orderedItems[index]
        item.quantity = parseInt(input.value)
        localStorage.setItem("orderedItems", JSON.stringify(orderedItems))
        let totalPrice = input.parentElement.parentElement.getElementsByClassName("total-price")[0]
        if ((item.price * item.quantity)>=1000 && (item.price * item.quantity)<1000000) {
            price = ((item.price * item.quantity)/1000).toFixed(3);
        } else {
            price = item.price * item.quantity;
        }
        totalPrice.innerHTML = `${price}.000đ`
        updatePrice()
        
    })
})


let cancelButtons = document.getElementsByClassName("cancel-button");

for (let c = 0; c < cancelButtons.length; c++) {
    let button = cancelButtons[c];
    button.addEventListener("click", (e)=>{
        orderedItems.splice(c,1)
        localStorage.setItem("orderedItems", JSON.stringify(orderedItems))
        location.reload()
    })
}

orderConfirm.addEventListener("click", (e)=>{
    e.preventDefault()
    if (orderConfirm.innerHTML != "Order") {
        document.location.replace("../payment/payment.html")
    } else {
        alert("Please buy before paying")
    }
    
})