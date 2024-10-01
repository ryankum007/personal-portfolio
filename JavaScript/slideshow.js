let slideIndex = 0;
let slides = document.getElementsByClassName("mySlides");
let dots;
let slideInterval;

function createDots() {
    const dotContainer = document.getElementById("dotContainer");
    dotContainer.innerHTML = ''; // Clear existing dots
    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement("span");
        dot.className = "dot";
        dot.dataset.index = i;
        dot.onclick = function () {
            currentSlide(i);
        };
        dotContainer.appendChild(dot);
    }
    dots = document.getElementsByClassName("dot");
    updateDots();
}

function updateDots() {
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    dots[slideIndex].className += " active";

    // Display only 5 dots at a time
    const start = Math.max(0, slideIndex - 2);
    const end = Math.min(slides.length, start + 5);
    for (let i = 0; i < dots.length; i++) {
        dots[i].style.display = i >= start && i < end ? "inline-block" : "none";
    }
}

function showSlides(n) {
    if (n >= slides.length) { slideIndex = 0; } // Wrap around to the first slide
    if (n < 0) { slideIndex = slides.length - 1; } // Wrap around to the last slide
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none"; // Hide all slides
    }
    slides[slideIndex].style.display = "block"; // Show the current slide
    updateDots();
}

function plusSlides(n) {
    clearInterval(slideInterval); // Clear the interval
    slideIndex += n; // Adjust the slideIndex by n
    showSlides(slideIndex); // Show the new slide
    slideInterval = setInterval(autoSlides, 3000); // Restart the interval
}

function currentSlide(n) {
    clearInterval(slideInterval); // Clear the interval
    slideIndex = n; // Set the slideIndex to the clicked dot
    showSlides(slideIndex); // Show the new slide
    slideInterval = setInterval(autoSlides, 3000); // Restart the interval
}

function autoSlides() {
    slideIndex++; // Increment the slideIndex
    showSlides(slideIndex); // Show the next slide
}

function initSlides() {
    createDots();
    showSlides(slideIndex); // Show the first slide immediately
    slideInterval = setInterval(autoSlides, 5000); // Change slide every 5 seconds
}

document.addEventListener("DOMContentLoaded", initSlides); // Initialize the slideshow when the document is loaded
