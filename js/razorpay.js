import { getApp, initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getFunctions, connectFunctionsEmulator, httpsCallable } from 'https://www.gstatic.com/firebasejs/12.0.0/firebase-functions.js'

const functions = getFunctions(getApp());

let options = {
	"key": "rzp_test_Clqdrw9cYS8CDc", // Enter the Key ID generated from the Dashboard
	"amount": "1000",
	"currency": "INR",
	"description": "Acme Corp",
	"image": "example.com/image/rzp.jpg",
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
	"handler": () => {},
	"modal": {
		"ondismiss": function () {
			if (confirm("Are you sure, you want to close the form?")) {
				txt = "You pressed OK!";
				console.log("Checkout form closed by the user");
			} else {
				txt = "You pressed Cancel!";
				console.log("Complete the Payment")
			}
		}
	}
};

const cards = document.querySelectorAll('.cardReady')
const userNameContainer = document.querySelector('#result')
const userIdInput = document.querySelector("#userId");
const userZnInput = document.querySelector("#userZn");
cards.forEach(card => {
	card.addEventListener('click', (e) => {
		// First check if results.textContent is filled
		if (userNameContainer.textContent == "Unable to get nickname" || userNameContainer.textContent == "") {
			alert("Please enter a valid User ID and Server ID")
			return
		}

		// This next line of code will not work if a "Card" does not have a "h4" element
		const costText = card.querySelector('h4').textContent
		// Extract integer from costText. The string will be of the form "Rs. [number of any length]"
		const cost = parseInt(costText.substring(3)) * 100
		options.amount = cost
		// the file script.js will have a global variable called userName which will be either undefined or a string
		if (result.textContent) {
			options.prefill.name = result.textContent
		}
		const createOrder = httpsCallable(functions, 'createStarStoreOrder');
		createOrder(options).then((result) => {
			if (result.data.id) {
				options.order_id = result.data.id
				options.handler = (response) => {
					const sendOrderNotification = httpsCallable(functions, 'sendOrderNotification');
					const detailsForServer = {
						...response,
						name: userNameContainer.textContent,
						id: userIdInput.value,
						server: userZnInput.value,
						package: card.querySelector('p').textContent,
						cost: card.querySelector('h4').textContent
					}
					sendOrderNotification(detailsForServer).then((result) => {
						console.log(result)
					}).catch((error) => {
						console.log(error)
					})
				}
				const rzp1 = new Razorpay(options)
				rzp1.open()
			} else {
				alert("Unable to create order")
			}
		})
	})
})

