import { closeMenu, openMenu } from "./menu.js"
const orderTrackingContainer = document.querySelector(".order-tracking-container")
const orderTrackingForm = document.querySelector(".order-tracking")
const orderTrackingBg = document.querySelector(".order-tracking-background")

const showTrackingForm = () => {
	orderTrackingContainer.classList.replace("order-tracking-container-hide", "order-tracking-container-show")
	setTimeout(() => {
		orderTrackingForm.classList.replace("order-tracking-hide", "order-tracking-show")
	}, 300)
}

const hideTrackingForm = () => {
	orderTrackingForm.classList.replace("order-tracking-show", "order-tracking-hide")
	setTimeout(() => {
		orderTrackingContainer.classList.replace("order-tracking-container-show", "order-tracking-container-hide")
	}, 300)
}

const trackToggler = document.querySelector("#trackToggle")

trackToggler.addEventListener("click", () => {
	closeMenu()
	setTimeout(() => {
		showTrackingForm()
	}, 300)
})

orderTrackingBg.addEventListener('click', () => {
	hideTrackingForm()
	setTimeout(() => {
		openMenu()
	}, 300)
})
