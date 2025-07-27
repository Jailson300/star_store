import { collection, doc, getDoc, getDocs, getFirestore, connectFirestoreEmulator } from 'https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js'
import { db } from "./firebase.js"

const userIdInput = document.querySelector("#userId");
const userZnInput = document.querySelector("#userZn");
const checkButton = document.querySelector("#checkButton");
const result = document.querySelector("#result");

let userName;

checkButton.addEventListener("click", () => {
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
				userName = data.name;
			} else {
				result.textContent = "Unable to get nickname";
				userName = undefined;
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

const smallPacks = [
	{
		"price": 105,
		"image": "assets/1.png",
		"bestseller": false,
		"package": 86,
	},
	{
		"price": 220,
		"image": "assets/1.png",
		"bestseller": true,
		"package": 172
	},
	{ 
		"price": 330,
		"image": "assets/2.png",
		"bestseller": false,
		"package": 257
	},
	{ 
		"price": 440,
		"image": "assets/2.png",
		"bestseller": false,
		"package": 344
	},
	{ 
		"price": 550,
		"image": "assets/3.png",
		"bestseller": false,
		"package": 429
	},
	{ 
		"price": 660,
		"image": "assets/3.png",
		"bestseller": false,
		"package": 514
	},
	{ 
		"price": 770,
		"image": "assets/4.png",
		"bestseller": false,
		"package": 600
	},
	{ 
		"price": 880,
		"image": "assets/4.png",
		"bestseller": false,
		"package": 706
	},
	{ 
		"price": 1300,
		"image": "assets/5.png",
		"bestseller": false,
		"package": 1050
	},
	{ 
		"price": 1750,
		"image": "assets/5.png",
		"bestseller": false,
		"package": 1406
	},
	{ 
		"price": 2650,
		"image": "assets/6.png",
		"bestseller": false,
		"package": 2195
	},
	{ 
		"price": 4400,
		"image": "assets/6.png",
		"bestseller": false,
		"package": 3688
	},
]

const largePacks = [
	{ 
		"price": 770,
		"package": 600
	},
	{ 
		"price": 880,
		"package": 706
	},
	{ 
		"price": 1300,
		"package": 1050
	},
	{ 
		"price": 1750,
		"package": 1406
	},
	{ 
		"price": 2650,
		"package": 2195
	},
	{ 
		"price": 4400,
		"package": 3688
	},
]

const cardsContainer = document.querySelector("#cards")
smallPacks.forEach(card => {
	const cardElement = document.createElement("div")
	cardElement.classList.add("swiper-slide");
	cardElement.innerHTML = `
		<div class="card">
			${
				card.bestseller ? `<div class="bestseller">Top Deal</div>` : ""
			}
			<div class="img-container">
				<img src="${card.image}">
			</div>
			<div class="buy-me">
				<h4>${card.package} Diamonds</h4>
				<button>Rs. ${card.price}</button>
			</div>
		</div>
	`
	cardsContainer.appendChild(cardElement)
})

const successModal = document.querySelector("#success-modal")
const orderDetails = document.querySelector("#order-details")
const orderId = document.querySelector("#order-id")
const copyBtn = document.querySelector("#copy-button")
const closeModalBtn = document.querySelector("#close-modal")
const orderStatusBtn = document.querySelector("#track-button")
const orderIdInput = document.querySelector("#order-id-input")
const orderResultHolder = document.querySelector("#order-status")

closeModalBtn.addEventListener("click", () => {
	successModal.style.display = "none"
})

export const successModalFunc = (message, details, order_id) => {
	successModal.style.display = "flex"
	successModal.querySelector("h2").textContent = message
	orderDetails.innerHTML = details
	orderId.value = order_id
	orderIdInput.value = order_id
	copyBtn.addEventListener("click", () => {
		navigator.clipboard.writeText(orderId.value)
		console.log("copied" + orderId.value)
	})
}

orderStatusBtn.addEventListener("click", () => {
	// Get data from firestore
	// tenants->star-store->orders->order_id
	// order_id is in orderIdInput
	orderStatusBtn.disabled = true
	orderStatusBtn.innerHTML = "Checking..."
	const order_id = orderIdInput.value
	console.log(order_id)
	const ordersColl = collection(db, "tenants", "star-store", "orders")
	const docRef = doc(ordersColl, order_id)
	getDoc(docRef).then((docSnap) => {
		if (docSnap.exists()) {
			const data = docSnap.data()
			if (data.status == "pending") {
				orderResultHolder.innerHTML = `Your order of <b>${data.package}</b> for <b>${data.cost}</b> will be delivered within 2 hours. <br> Thank you for your trust!`
			} else if (data.status == "done") {
				orderResultHolder.textContent = "Your order has been delivered!"
			} else if (data.status == "rejected") {
				orderResultHolder.textContent = "Your order has been rejected. Please contact support."
			} else {
				orderResultHolder.textContent = "An error occured while processing your order. Please contact support."
			}
		} else {
			console.log("No such document!")
		}
		orderStatusBtn.disabled = false
		orderStatusBtn.innerHTML = "Track"
	}).catch((error) => {
		console.log(error)
		orderStatusBtn.disabled = false
		orderStatusBtn.innerHTML = "Track"
	})
})

const headerButtons = document.querySelectorAll(".header-button")
const mobileMenu = document.querySelector(".mobile-menu")
const mobileMenuList = document.querySelector(".mobile-menu-list")
headerButtons.forEach(button => {
	button.addEventListener("click", () => {
		mobileMenu.classList.toggle("mobile-menu-hidden")
		mobileMenu.classList.toggle("mobile-menu-shown")
		mobileMenuList.classList.toggle("mobile-menu-list-hidden")
		mobileMenuList.classList.toggle("mobile-menu-list-shown")
	})
})
