import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs'

const swiper = new Swiper('.swiper', {
	direction: 'horizontal',
	loop: true,

	autoplay: {
		delay: 5000,
		disableOnInteraction: false,
	},

	slidesPerView: 2,
	spaceBetween: 20,
	centeredSlides: true,
	breakpoints: {
		640: {
			slidesPerView: 4,
		},
		1880: {
			slidesPerView: 6,
		},
	}

});

