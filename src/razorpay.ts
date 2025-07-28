import { httpsCallable } from 'firebase/functions'
import { successModalFunc } from './warningmodal';
import { functions } from "./firebase"
import { auth } from './firebase';
import { hideLoadingModal, showLoadingModal } from './loadingmodal';

let options: any  = {
	"key": "rzp_test_Clqdrw9cYS8CDc", // Enter the Key ID generated from the Dashboard
	"amount": "1000",
	"currency": "INR",
	"description": "Star Store",
	"image": "./star_logo.png",
	"order_id": "",
	"prefill":
		{
			"email": "gaurav.kumar@example.com",
			"contact": +919876543210,
		},
	config: {
		display: {
			blocks: {
				upi: { //name for UPI block
					name: "Pay Using UPI",
					instruments: [
						{
							method: "upi"
						}
					]
				},
				utib: { //name for Axis block
					name: "Pay Using Axis Bank",
					instruments: [
						{
							method: "card",
							issuers: ["UTIB"]
						},
						{
							method: "netbanking",
							banks: ["UTIB"]
						},
					]
				},
				other: { //  name for other block
					name: "Other Payment Methods",
					instruments: [
						{
							method: "card",
							issuers: ["ICIC"]
						},
						{
							method: 'netbanking',
						}
					]
				}
			},
			sequence: ["block.upi", "block.utib", "block.other"],
			preferences: {
				show_default_blocks: false // Should Checkout show its default blocks?
			}
		}
	},
	"handler": (response: any) => {},
	"modal": {
		"ondismiss": function () {
			if (confirm("Are you sure, you want to close the form?")) {
				//txt = "You pressed OK!";
				console.log("Checkout form closed by the user");
			} else {
				//txt = "You pressed Cancel!";
				console.log("Complete the Payment")
			}
		}
	}
};

const cards = document.querySelectorAll('.card') as NodeListOf<HTMLDivElement>
const userNameContainer = document.querySelector('#result') as HTMLDivElement
const userIdInput = document.querySelector("#userId") as HTMLInputElement
const userZnInput = document.querySelector("#userZn") as HTMLInputElement
const resultSpan = document.querySelector("#result") as HTMLSpanElement
if (!cards || !userNameContainer || !userIdInput || !userZnInput || !resultSpan) {
	throw new Error("Missing elements: .card, #result, #userId, #userZn, #create-order-loading-modal, #result")
}

cards.forEach(card => {
	card.addEventListener('click', (e) => {
		// First check if results.textContent is filled
		if (userNameContainer.textContent == "Unable to get nickname" || userNameContainer.textContent == "") {
			alert("Please enter a valid User ID and Server ID")
			return
		}
		showLoadingModal()

		// This next line of code will not work if a "Card" does not have a "h4" element
		const costText = card.querySelector('button')!.textContent as string
		// Extract integer from costText. The string will be of the form "Rs. [number of any length]"
		const cost = parseInt(costText.substring(3)) * 100 as unknown
		options.amount = cost as string
		// the file script.js will have a global variable called userName which will be either undefined or a string
		if (resultSpan.textContent) {
			options.prefill.email = resultSpan.textContent
		}
		const createOrder = httpsCallable(functions, 'createStarStoreOrder');
		createOrder(options).then((result: any) => {
			hideLoadingModal()
			if (result.data.id) {
				options.order_id = result.data.id
				options.handler = (response: any) => {
					showLoadingModal()
					const sendOrderNotification = httpsCallable(functions, 'sendOrderNotification');
					const detailsForServer = {
						...response,
						name: userNameContainer.textContent,
						id: userIdInput.value,
						server: userZnInput.value,
						package: card.querySelector('h4')!.textContent as string,
						cost: card.querySelector('button')!.textContent as string,
						uuid: auth.currentUser ? auth.currentUser.uid : undefined
					}
					console.log(detailsForServer);
					sendOrderNotification(detailsForServer).then((result: any) => {
						console.log(result)
						const details = `${result.data.cost} for ${result.data.package}`
						hideLoadingModal()
						successModalFunc(result.data.message, details, result.data.order_id);
					}).catch((error) => {
						hideLoadingModal()
						console.log(error)
					})
				}
				const rzp1 = new (window as any).Razorpay(options) as any
				rzp1.open()
			} else {
				alert("Unable to create order")
			}
		}).catch((error) => {
			showLoadingModal()
			console.error(error)
		})
	})
})

