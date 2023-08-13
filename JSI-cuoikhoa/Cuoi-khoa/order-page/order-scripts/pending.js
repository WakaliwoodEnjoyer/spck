let button = document.getElementById("order-button");

button.addEventListener("click", (e) => {

    let productImage = document.getElementById("image").src;
    let productName = document.getElementById("title").innerHTML;
    let productPrice = parseInt(document.getElementById("price").innerHTML);
    let quantity = document.getElementById("quantity").value;

    if (quantity != 0) {
        if (localStorage.orderedItems){
            let orderedItems = JSON.parse(localStorage.orderedItems);
            orderedItems.push({
                image: productImage,
                name: productName,
                price: productPrice,
                quantity: quantity,
            })
            localStorage.setItem("orderedItems", JSON.stringify(orderedItems))
        }else{
            localStorage.setItem("orderedItems", JSON.stringify([{
                image: productImage,
                name: productName,
                price: productPrice,
                quantity: quantity,
            }]))
        }
        
    }
    else {
        console.log("lolk")
    }
    

})