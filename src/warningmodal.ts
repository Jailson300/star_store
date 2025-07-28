import { showTrackingForm } from "./tracking"
const successModal = document.querySelector("#success-modal") as HTMLDivElement
const orderDetails = document.querySelector("#order-details") as HTMLDivElement
const orderId = document.querySelector("#order-id") as HTMLInputElement
const orderIdInput = document.querySelector("#order-id-input") as HTMLInputElement
const copyBtn = document.querySelector("#copy-button") as HTMLButtonElement
const closeModalBtn = document.querySelector("#close-modal") as HTMLButtonElement

export const successModalFunc = (message: string, details: string, order_id: string) => {
	successModal.style.display = "flex"
	successModal.querySelector("h2")!.textContent = message
	orderDetails.innerHTML = details
	orderId.value = order_id
	orderIdInput.value = order_id
	copyBtn.addEventListener("click", () => {
		navigator.clipboard.writeText(orderId.value)
		console.log("copied" + orderId.value)
	})
}

closeModalBtn.addEventListener("click", () => {
	successModal.style.display = "none"
	showTrackingForm(undefined);
})

