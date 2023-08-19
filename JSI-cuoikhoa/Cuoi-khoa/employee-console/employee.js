// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore, onSnapshot, collection,updateDoc, doc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { getDatabase, ref, child, get } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAeGDzJavNbF-qUGvJZshVIOx4_iGTpzvY",
  authDomain: "coffee-shop-843e5.firebaseapp.com",
  databaseURL: "https://coffee-shop-843e5-default-rtdb.firebaseio.com",
  projectId: "coffee-shop-843e5",
  storageBucket: "coffee-shop-843e5.appspot.com",
  messagingSenderId: "207491061068",
  appId: "1:207491061068:web:db014d662ce9a0233aebe9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
const dbRef = ref(getDatabase());



//UI

let logout = document.getElementById("logout")
function validatedUser(user) {
  if (user == "user") {
    return false
  } else if (user == "admin" || user == "employee") {
    return true
  }
}
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    get(child(dbRef, `UserList/${uid}/role`)).then((snapshot) => {
      if (snapshot.exists()) {

        if (!validatedUser(snapshot.val())) {
          document.location.replace("../main-page/index.html")
        }


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
    document.location.replace("../login/login.html")
  }).catch((error) => {
    alert("error code: " + error + " when signing out")
  });
})


///REAL TIME DATA
let orderTagsContainer = document.getElementById("orders")
let orderTags = orderTagsContainer.querySelectorAll("order-tag")



function addItem(address, name, order, phone, uid) {
  let orderData = ``
  let parsedOrder = JSON.parse(order)
  let totalPrice = 0
  parsedOrder.forEach((data, index) => {
    let allPrice = data.price * data.quantity
    totalPrice += allPrice


    orderData += 
    `
    <tr>
      <td>${index+1}</td>
      <td>${data.name}</td>
      <td>${data.quantity}</td>
      <td>${data.price}.000đ</td>
      <td>${convertPrice(allPrice)}</td>
    </tr>
    `
  });

  orderTagsContainer.innerHTML +=
`
<div class="order-tag">

  <div class="show-order">
      
      <button onclick="collapse(this)" class="toggle-order">
          Đơn hàng
      </button>

      <div class="actions">
          <button class="accept-order">Chấp nhận</button>
          <button class="cancel-order">Hủy</button>
      </div>

  </div>

  <div class="collapse">

      <table>
          <thead>
              <tr>
                  <th>STT</th>
                  <th>Đơn hàng</th>
                  <th>Số lượng</th>
                  <th>Đơn giá</th>
                  <th>Thành tiền</th>
              </tr>
          </thead>
          <tbody class="order-data">
            ${orderData}
            <tr>
              <td>Tổng</td>
              <td></td>
              <td></td>
              <td></td>
              <td>${convertPrice(totalPrice)}</td>
            </tr>
          </tbody>
      </table>

      <div class="customer-detail">

          <h4 style="display: inline;">Tên: </h4>
          <p class="name" style="display: inline;">${decrypt(name)}</p>
          <br>

          <h4 style="display: inline;">UID: </h4>
          <p class="uid" style="display: inline;">${uid}</p>
          <br>

          <h4 style="display: inline;">Địa chỉ: </h4>
          <p class="address" style="display: inline;">${decrypt(address)}</p>
          <br>

          <h4 style="display: inline;">Số điện thoại: </h4>
          <p class="phone" style="display: inline;">${decrypt(phone)}</p>
      </div>

      <div class="status">
          <h4 style="display: inline;">Trạng thái: </h4>
          <p style="display: inline;">Chưa xử lý</p>
      </div>


  </div>
</div>
` 
  

}

function addData(orders) {
  orders.forEach(order => {
    if (order.status != "canceled") {
      addItem(order.address, order.name, order.order, order.phone, order.uid)
    }
  })
}


async function getDataFireStoreRealTime() {
  const listDataFireStoreRealTime = await collection(db, "orders");
  onSnapshot(listDataFireStoreRealTime, (snapshot) => {
    var pendingOrders = []

    snapshot.forEach(order => {
      pendingOrders.push(order.data())
    })
    addData(pendingOrders)
    let cancelButton = document.querySelectorAll(".cancel-order")
    cancelButton.forEach((element)=>{
      element.addEventListener("click", (e)=>{
        let collapse = e.target.parentElement.parentElement.parentElement.getElementsByClassName("collapse")[0]
        let userInfo = collapse.getElementsByClassName("uid")[0]
        let uid = userInfo.innerHTML
        deleteOrder(uid)
      })
    })
  })
}

async function deleteOrder(uid) {
  await updateDoc(doc(db, "orders", uid), {
    status: "canceled"
  })
  location.reload()
}





function decrypt(encryptedData) {
  var encryptPass = CryptoJS.AES.decrypt(encryptedData, 'qgwTCF%3qf0#jtodYD7|Q108"*qS>|')
  return encryptPass.toString(CryptoJS.enc.Utf8)
}

function convertPrice(money) {
  if (money<1000) {
    return `${money}.000đ` ;   
  } else if (money>=1000 && money<1000000) {
    return `${(money/1000).toFixed(3)}.000đ`;
  }
}

window.onload = getDataFireStoreRealTime;

