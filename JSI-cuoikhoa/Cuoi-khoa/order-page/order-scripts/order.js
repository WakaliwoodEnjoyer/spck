var rebound = true;
var image = document.getElementById("image");
var titleName = document.getElementById("title");
var Currentprice = document.getElementById("price");
var board = document.getElementById("order-board");


function showItem(imageID, title, price) {
    
    if (rebound) {
        image.src = imageID;
        titleName.innerHTML = title;
        Currentprice.innerHTML = price;
        rebound = false;
        board.style.display = "block";
    } else {
        board.style.display = "none";
        rebound = true;
    }

}


//SPECIAL_BOARD

var specBoard = document.getElementById("special-board");

function showSpecial(imageID, title, cost1, cost2, cost3) {
    
    if (rebound==true) {
        document.getElementById("spec-image").src = imageID;
        document.getElementById("spec-title").innerHTML = title;
        document.getElementById("cost1").innerHTML = cost1;
        document.getElementById("cost2").innerHTML = cost2;
        document.getElementById("cost3").innerHTML = cost3;
        rebound = false;
        specBoard.style.display = "block";
    } else {
        specBoard.style.display = "none";
        rebound = true;
    }

}

//coffee


let coffee = [
    {
        name: "Latte nóng",
        image: "../images/products/coffee/hot-latte.jpg",
        price: "45.000 đ",
        desc: "[content deleted]",
    },
    {
        name: "Socola nóng",
        image: "../images/products/coffee/hot-choco-coffee.jpg",
        price: "45.000 đ",
        desc: "[content deleted]",
    },
    {
        name: "Cà phê cacao sữa dừa",
        image: "../images/products/coffee/cocoa-coconut.jpg",
        price: "50.000 đ",
        desc: "[content deleted]",
    },
    {
        name: "Cà phê năng lượng đen (nóng/đá)",
        image: "../images/products/coffee/energy-coffee(andMilk).jpg",
        price: "32.000 đ",
        desc: "[content deleted]",
    },
    {
        name: "Cà phê năng lượng sữa (nóng/đá)",
        image: "../images/products/coffee/energy-coffee(andMilk).jpg",
        price: "35.000 đ",
        desc: "[content deleted]",
    },
]

let fruitTea = [
    {
        name: "Trà đào cam sả",
        image: "../images/products/fruit-tea/peach-tea.jpg",
        price: "49.000 đ",
        desc: "[content deleted]",
    },
    {
        name: "Trà vải dưa hấu",
        image: "../images/products/fruit-tea/lychee-melon-tea.jpg",
        price: "45.000 đ",
        desc: "[content deleted]",
    },{
        name: "Trà bưởi hồng thanh long",
        image: "../images/products/fruit-tea/dragon-tea.jpg",
        price: "45.000 đ",
        desc: "[content deleted]",
    },{
        name: "Trà táo bạc hà",
        image: "../images/products/fruit-tea/apple-mint.jpg",
        price: "47.000 đ",
        desc: "[content deleted]",
    },
]

let milkTea = [
    {
        name: "Sữa tươi chân trâu đường đen",
        image: "../images/products/milk-tea/black-bubble-milk.jpg",
        price: "49.000 đ",
        desc: "[content deleted]",
    },
]

let yogurt = [
    {
        name: "Sữa chua hoa quả",
        image: "../images/products/yogurt/fruit-yogurt.jpg",
        price: "47.000 đ",
        desc: "[content deleted]",
    },
]

let juice = [
    {
        name: "Nước chanh tươi",
        image: "../images/products/juice/lemonade.jpg",
        price: "42.000 đ",
        desc: "[content deleted]",
    },
    {
        name: "Nước ép cam cà rốt",
        image: "../images/products/juice/orange-carrot.jpg",
        price: "49.000 đ",
        desc: "[content deleted]",
    },
    {
        name: "Nước ép dưa hấu",
        image: "../images/products/juice/melon-juice.jpg",
        price: "49.000 đ",
        desc: "[content deleted]",
    },
    {
        name: "Nước ép ổi",
        image: "../images/products/juice/guava-juice.jpg",
        price: "49.000 đ",
        desc: "[content deleted]",
    },
]

let smoothie = [
    {
        name: "Sinh tố xoài",
        image: "../images/products/smoothie/mango-smoothie.jpg",
        price: "49.000 đ",
        desc: "[content deleted]",
    },
]

let blendedIce = [
    {
        name: "Cookie đá xay",
        image: "../images/products/blended-ice/cookie-ice.jpg",
        price: "49.000 đ",
        desc: "[content deleted]",
    },
    {
        name: "Matcha đá xay",
        image: "../images/products/blended-ice/iced-matcha.jpg",
        price: "49.000 đ",
        desc: "[content deleted]",
    },
]

let food = [
    {
        name: "Bánh mì bò kho",
        image: "../images/products/food/bread-and-beef.jpg",
        price: "55.000 đ",
        desc: "[content deleted]",
    },
]

let other = [
    {
        name: "Cà phê chai 330ml",
        image: "../images/products/special/special-1.jpg",
        price1: "99.000 đ",
        price2: "109.000 đ",
        price3: "99.000 đ",
        desc: "[content deleted]",
    },
    {
        name: "Cà phê chai 250ml",
        image: "../images/products/special/special-2.jpg",
        price1: "68.000 đ",
        price2: "80.000 đ",
        price3: "75.000 đ",
        desc: "[content deleted]",
    },
]


let categories = document.getElementsByClassName("category")
let productType = [coffee, fruitTea, milkTea, yogurt, juice, smoothie, blendedIce, food, other]

for (let index = 0; index < categories.length; index++) {
    let categoryPanel = categories[index].getElementsByClassName("product-panel")[0];
    let currentProductType = productType[index];

    for (let i = 0; i < currentProductType.length; i++) {

        let currentItem = currentProductType[i];            
        
        let productPane = document.createElement("div")
        productPane.classList.add("product-pane")

        if (index != 8) {
            productPane.innerHTML =
            `
                <img src="${currentItem.image}">
                <h3 class="desc">${currentItem.name}</h3>
                <p class="desc">${currentItem.price}</p>
            `

            categoryPanel.appendChild(productPane);
            
        } else {
            productPane.innerHTML =
            `
                <img src="${currentItem.image}">
                <h3 class="desc">${currentItem.name}</h3>
                
            `

            categoryPanel.appendChild(productPane);

        }
        

        

        if (index != 8) {
            productPane.addEventListener("click", (e)=>{
                showItem(currentItem.image, currentItem.name, currentItem.price);
            })
        } else {
            productPane.addEventListener("click", (e)=>{
                showSpecial(currentItem.image, currentItem.name, currentItem.price1, currentItem.price2, currentItem.price3);
            })
        }
        
    }      
}