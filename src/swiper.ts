import Swiper from 'swiper'
console.log("swiper");

const swiper = new Swiper('.swiper', {
	direction: 'horizontal',
	loop: true,
	parallax: true,

	autoplay: {
		delay: 2000,
		disableOnInteraction: false,
	},

	slidesPerView: 1,
});


