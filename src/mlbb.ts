import Swiper from "swiper"

const smallPacks = [
	{
		"price": 105,
		"image": "1.png",
		"bestseller": false,
		"package": 86,
	},
	{
		"price": 220,
		"image": "1.png",
		"bestseller": true,
		"package": 172
	},
	{ 
		"price": 330,
		"image": "2.png",
		"bestseller": false,
		"package": 257
	},
	{ 
		"price": 440,
		"image": "2.png",
		"bestseller": false,
		"package": 344
	},
	{ 
		"price": 550,
		"image": "3.png",
		"bestseller": false,
		"package": 429
	},
	{ 
		"price": 660,
		"image": "3.png",
		"bestseller": false,
		"package": 514
	},
	{ 
		"price": 770,
		"image": "4.png",
		"bestseller": false,
		"package": 600
	},
	{ 
		"price": 880,
		"image": "4.png",
		"bestseller": false,
		"package": 706
	},
	{ 
		"price": 1300,
		"image": "5.png",
		"bestseller": false,
		"package": 1050
	},
	{ 
		"price": 1750,
		"image": "5.png",
		"bestseller": false,
		"package": 1406
	},
	{ 
		"price": 2650,
		"image": "6.png",
		"bestseller": false,
		"package": 2195
	},
	{ 
		"price": 4400,
		"image": "6.png",
		"bestseller": false,
		"package": 3688
	},
]

const largePacks = [
	{ 
		"price": 770,
		"image": "6.png",
		"bestseller": false,
		"package": 600
	},
	{ 
		"price": 880,
		"image": "6.png",
		"bestseller": false,
		"package": 706
	},
	{ 
		"price": 1300,
		"image": "6.png",
		"bestseller": false,
		"package": 1050
	},
	{ 
		"price": 1750,
		"image": "6.png",
		"bestseller": false,
		"package": 1406
	},
	{ 
		"price": 2650,
		"image": "6.png",
		"bestseller": false,
		"package": 2195
	},
	{ 
		"price": 4400,
		"image": "6.png",
		"bestseller": false,
		"package": 3688
	},
]

const cardsContainer = document.querySelector("#cards") as HTMLDivElement
if (!cardsContainer) {
	throw new Error("Missing element: #cards")
}

smallPacks.forEach(card => {
	const cardElement = document.createElement("div")
	cardElement.classList.add("swiper-slide");
	const imgUrl = new URL(`./assets/${card.image}`, import.meta.url);
	console.log(imgUrl)
	cardElement.innerHTML = `
		<div class="card">
			${
				card.bestseller ? `<div class="bestseller">Top Deal</div>` : ""
			}
			<div class="img-container">
				<img src="${imgUrl}">
			</div>
			<div class="buy-me">
				<h4>${card.package} Diamonds</h4>
				<button>Rs. ${card.price}</button>
			</div>
		</div>
	`
	cardsContainer.appendChild(cardElement)
})

const cardsContainer1 = document.querySelector("#cards1") as HTMLDivElement
if (!cardsContainer1) {
	throw new Error("Missing element: #cards1")
}

largePacks.forEach(card => {
	const cardElement = document.createElement("div")
	cardElement.classList.add("swiper-slide");
	const imgUrl = new URL(`./assets/${card.image}`, import.meta.url).href;
	cardElement.innerHTML = `
		<div class="card">
			${
				card.bestseller ? `<div class="bestseller">Top Deal</div>` : ""
			}
			<div class="img-container">
				<img src="${imgUrl}">
			</div>
			<div class="buy-me">
				<h4>${card.package} Diamonds</h4>
				<button>Rs. ${card.price}</button>
			</div>
		</div>
	`
	cardsContainer1.appendChild(cardElement)
})

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

const userIdInput = document.querySelector("#userId") as HTMLInputElement
const userZnInput = document.querySelector("#userZn") as HTMLInputElement
const checkButton = document.querySelector("#checkButton") as HTMLButtonElement
const result = document.querySelector("#result");

if (!userIdInput || !userZnInput || !checkButton || !result) {
	throw new Error("Elements missing: userIdInput, userZnInput, checkButton, result");
}

checkButton.addEventListener("click", () => {
	console.log("Checking nickname")
	checkButton.disabled = true;
	checkButton.innerHTML = "Checking";
	const userId = userIdInput.value;
	const userZn = userZnInput.value;
	const url = `https://api.isan.eu.org/nickname/ml?id=${userId}&zone=${userZn}`;
	fetch(url)
		.then(response => response.json())
		.then(data => {
			// result structure
			/* 
			{
				success: boolean,
				game: string,
				id: number,
				server: number,
				name: string
			}
			 */
			console.log(data);
			if (data.success == true) {
				result.textContent = data.name;
			} else {
				result.textContent = "Unable to get nickname";
			}
			checkButton.disabled = false;
			checkButton.innerHTML = "Check";
		})
		.catch(error => {
			console.error(error);
			result.textContent = "Error: " + error.message;
			checkButton.disabled = false;
			checkButton.innerHTML = "Check";
		});
})

