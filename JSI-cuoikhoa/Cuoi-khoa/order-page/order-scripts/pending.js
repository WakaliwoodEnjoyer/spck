let button = document.getElementById("order-button");

button.addEventListener("click", (e) => {

    let productName = document.getElementById("title").innerHTML;
    let productPrice = parseInt(document.getElementById("price").innerHTML);
    let quantity = parseInt(document.getElementById("quantity").value);

    if (quantity != 0) {
        if (localStorage.orderedItems){
            let dupeDetect = false
            let orderedItems = JSON.parse(localStorage.orderedItems);
            orderedItems.forEach(element => {
                if (element.name == productName) {
                    let a = parseInt(element.quantity)
                    element.quantity = a + quantity
                    dupeDetect = true
                }
            });

            if (!dupeDetect) {
                orderedItems.push({
                    name: productName,
                    price: productPrice,
                    quantity: quantity,
                })
            }
            


            localStorage.setItem("orderedItems", JSON.stringify(orderedItems))
        }else{
            localStorage.setItem("orderedItems", JSON.stringify([{
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