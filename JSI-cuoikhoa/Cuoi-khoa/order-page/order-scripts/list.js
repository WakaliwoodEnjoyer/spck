let category = document.getElementsByClassName("category");


function show(a) {
    if (a == "all") {
        
        for(var i = 0; i < category.length; i++){
            category[i].style.display = "block";
        }

    } else {
        
        for(var i = 0; i < category.length; i++){
            category[i].style.display = "none";
        }

        var type = document.getElementById(a);
        type.style.display = "block";
    }

}

let selections = document.getElementsByClassName("selection");

function removeAllMain() {
    for (let index = 0; index < selections.length; index++) {
        let selection = selections[index];
        if (selection.classList.contains("main-selection")) {
            selection.classList.remove("main-selection");
        }   
    }
}

for (let index = 0; index < selections.length; index++) {
    let selected = selections[index];
    selected.addEventListener("click", (e)=>{
        removeAllMain();
        e.target.classList.add("main-selection");
    })
    
}
