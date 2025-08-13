
document.addEventListener("DOMContentLoaded", function () {
    const slider = document.querySelector(".slider-wrapper");
    const slides = document.querySelectorAll(".slider-wrapper img");
    let index = 0;

    function showSlide(i) {
        slider.style.transform = `translateX(-${i * 100}%)`;
    }

    function nextSlide() {
        index = (index + 1) % slides.length;
        showSlide(index);
    }

    setInterval(nextSlide, 5000);
});
