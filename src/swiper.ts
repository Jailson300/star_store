import Swiper from 'swiper'
console.log("swiper");

const swiper = new Swiper('.swiper', {
	direction: 'horizontal',
	loop: true,
	parallax: true,

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

// Turns out we don't need this
// We can use the same swiper instance for all swiper slides
// in the project
/*
const swiper2 = new Swiper('.swiper2', {
	wrapperClass: 'swiper-wrapper2',
	direction: 'horizontal',
	loop: true,
	loopAddBlankSlides: true,

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
*/
