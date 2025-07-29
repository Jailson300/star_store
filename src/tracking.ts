console.log("tracking.ts")
import { doc, getDoc, collection, getFirestore } from "firebase/firestore"
import { app } from "./firebase"
const db = getFirestore(app);
const orderTrackingContainer = document.querySelector(".order-tracking-container") as HTMLDivElement
const orderTrackingForm = document.querySelector(".order-tracking") as HTMLDivElement
const orderTrackingBg = document.querySelector(".order-tracking-background") as HTMLDivElement
const orderIdInput = document.querySelector("#order-id-input") as HTMLInputElement
if (!orderTrackingContainer || !orderTrackingForm || !orderTrackingBg || !orderIdInput) {
	throw new Error("Missing elements: .order-tracking-container, .order-tracking, .order-tracking-background, #order-id-input")
}

export const showTrackingForm = (orderId: string | undefined) => {
	if (orderId) {
		orderIdInput.value = orderId;
	}
	orderTrackingContainer.classList.replace("order-tracking-container-hide", "order-tracking-container-show")
	setTimeout(() => {
		orderTrackingForm.classList.replace("order-tracking-hide", "order-tracking-show")
	}, 300)
}

export const hideTrackingForm = () => {
	orderTrackingForm.classList.replace("order-tracking-show", "order-tracking-hide")
	setTimeout(() => {
		orderTrackingContainer.classList.replace("order-tracking-container-show", "order-tracking-container-hide")
	}, 300)
}

export const trackToggler = document.querySelector("#trackToggle")
if (!trackToggler) {
	throw new Error("Missing elements: #trackToggle")
}

trackToggler.addEventListener("click", () => {
	showTrackingForm(undefined)
})

orderTrackingBg.addEventListener('click', () => {
	hideTrackingForm()
})

const orderStatusBtn = document.querySelector("#track-button") as HTMLButtonElement
const orderResultHolder = document.querySelector("#order-status") as HTMLDivElement

orderStatusBtn.addEventListener("click", () => {
	// Get data from firestore
	// tenants->star-store-lhgmd->orders->order_id
	// order_id is in orderIdInput
	orderStatusBtn.disabled = true
	orderStatusBtn.innerHTML = "Checking..."
	const order_id = orderIdInput.value
	if (order_id == "") {
		orderStatusBtn.disabled = false
		orderStatusBtn.innerHTML = "Track"
		alert("Enter an order id")
	}

	const ordersColl = collection(db, "tenants", "star-store-lhgmd", "orders")

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

