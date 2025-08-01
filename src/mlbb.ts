import Swiper from "swiper"

const smallPacks = [
	{
		"price": 110,
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
		"price": 325,
		"image": "2.png",
		"bestseller": false,
		"package": 257
	},
	{ 
		"price": 435,
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
		"price": 650,
		"image": "3.png",
		"bestseller": false,
		"package": 514
	},
	{ 
		"price": 750,
		"image": "4.png",
		"bestseller": false,
		"package": 600
	},
	{ 
		"price": 850,
		"image": "4.png",
		"bestseller": false,
		"package": 706
	},
	{
		"price": 950,
		"image": "4.png",
		"bestseller": false,
		"package": 871
	},
	{ 
		"price": 1070,
		"image": "5.png",
		"bestseller": false,
		"package": 964
	},
]

const largePacks = [
	{ 
		"price": 1270,
		"image": "5.png",
		"bestseller": false,
		"package": 1050
	},
	{ 
		"price": 1400,
		"image": "6.png",
		"bestseller": false,
		"package": 1136
	},
	{ 
		"price": 1700,
		"image": "6.png",
		"bestseller": false,
		"package": 1412
	},
	{ 
		"price": 2580,
		"image": "6.png",
		"bestseller": false,
		"package": 2195
	},
	{ 
		"price": 4300,
		"image": "6.png",
		"bestseller": false,
		"package": 3688
	},
	{ 
		"price": 6500,
		"image": "6.png",
		"bestseller": false,
		"package": 5532
	},
	{ 
		"price": 10500,
		"image": "6.png",
		"bestseller": false,
		"package": 9288
	},
]

const weeklyPass = [
	{
		"price": 130,
		"image": "weekly-pass.jpeg",
		"bestseller": false,
		"package": 1
	},
	{
		"price": 260,
		"image": "weekly-pass.jpeg",
		"bestseller": false,
		"package": 2
	},
	{
		"price": 390,
		"image": "weekly-pass.jpeg",
		"bestseller": false,
		"package": 3
	},
	{
		"price": 520,
		"image": "weekly-pass.jpeg",
		"bestseller": false,
		"package": 4
	},
	{
		"price": 650,
		"image": "weekly-pass.jpeg",
		"bestseller": false,
		"package": 5
	},
	{
		"price": 1299,
		"image": "weekly-pass.jpeg",
		"bestseller": false,
		"package": 10
	},
]

const cardsGrid = document.querySelector("#cards-grid") as HTMLDivElement
const viewAllBtns = document.querySelectorAll(".view-all-btn") as NodeListOf<HTMLButtonElement>
const largeCardsGrid = document.querySelector("#large-cards-grid") as HTMLDivElement
const weeklyPassGrid = document.querySelector("#weekly-pass-grid") as HTMLDivElement

const cardComponent = (type: 'small' | 'large' | 'weekly' ,cardData: {price: number, image: string, bestseller: boolean, package: number}): HTMLDivElement => {
	const div = document.createElement("div")
	const imgUrl = new URL(`./assets/${cardData.image}`, import.meta.url);
	div.classList.add("grid-item");
	div.innerHTML = `
		<div class="card">
			${
				cardData.bestseller ? `<div class="bestseller">Top Deal</div>` : ""
			}
			<div class="img-container">
				<img src="${imgUrl}">
			</div>
			<div class="buy-me">
				<h4>${cardData.package} ${type == "weekly" ? " x Weekly Pass" : "Diamonds"}</h4>
				<button>Rs. ${cardData.price}</button>
			</div>
		</div>
	`
	return div
}

smallPacks.forEach(card => {
	cardsGrid.appendChild(cardComponent("small", card))
})

largePacks.forEach(card => {
	largeCardsGrid.appendChild(cardComponent("large", card))
})

weeklyPass.forEach(card => {
	weeklyPassGrid.appendChild(cardComponent("weekly", card))
})

const closeGrid = (id: string) => {
	const grid = document.querySelector(`#${id}`) as HTMLDivElement
	grid.dataset.state = "closed"
	const oneCard = document.querySelector(".grid-item") as HTMLDivElement
	const rowHeight = oneCard.offsetHeight;
	const paddingOfGrid = window.getComputedStyle(grid).padding;
	grid.style.height = `${(rowHeight * 1) + (parseInt(paddingOfGrid) * 2)}px`;
}

const openGrid = (id: string) => {
	const grid = document.querySelector(`#${id}`) as HTMLDivElement
	grid.dataset.state = "open"
	grid.style.height = (grid.scrollHeight + "px");
}

const resizeAfterWindowEvent = (id: string) => {
	const grid = document.querySelector(`#${id}`) as HTMLDivElement
	if (grid.dataset.state == "open") {
		openGrid(id)
	} else {
		closeGrid(id)
	}
}

closeGrid("cards-grid")
closeGrid("large-cards-grid")
closeGrid("weekly-pass-grid")

window.addEventListener("resize", () => {
	resizeAfterWindowEvent("cards-grid")
	resizeAfterWindowEvent("large-cards-grid")
	resizeAfterWindowEvent("weekly-pass-grid")
})

viewAllBtns.forEach(button => {
	button.addEventListener("click", () => {
		console.log("view all clicked")
		const id = button.dataset.id as string;
		const grid = document.querySelector(`#${id}`) as HTMLDivElement
		if (grid.style.height == (grid.scrollHeight + "px")) {
			closeGrid(id)
			button.innerHTML = "View all"
		} else {
			openGrid(id)
			button.innerHTML = "Close"
		}
	})
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
