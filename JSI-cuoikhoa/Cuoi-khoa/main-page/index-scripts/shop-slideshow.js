//shop slideshow
// var slides = document.getElementsByClassName("slide")
var currentSlide_id = 1
var previousSlide_id
var previousSlide
var currentSlide

function moveShopSlide(a) {
    previousSlide_id = currentSlide_id
    currentSlide_id = currentSlide_id+a

    if (currentSlide_id<1) {
        currentSlide_id = 6
        console.log(currentSlide_id)
    } else if (currentSlide_id>6) {
        currentSlide_id = 1
        console.log(currentSlide_id)
    }

    previousSlide = document.getElementById("shop-slide"+previousSlide_id.toString()) 
    previousSlide.style.display = "none"

    currentSlide = document.getElementById("shop-slide"+currentSlide_id.toString())
    currentSlide.style.display = "block"
}