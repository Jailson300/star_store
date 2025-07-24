/**
* Import function triggers from their respective submodules:
*
* import {onCall} from "firebase-functions/v2/https";
* import {onDocumentWritten} from "firebase-functions/v2/firestore";
*
* See a full list of supported triggers at https://firebase.google.com/docs/functions
*/

// import {onRequest} from "firebase-functions/v2/https";
// import * as logger from "firebase-functions/logger";

import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { onCall } from "firebase-functions/v2/https";
import { defineSecret } from "firebase-functions/params";
import axios from "axios";
import Razorpay from "razorpay";
import {validatePaymentVerification} from "razorpay/dist/utils/razorpay-utils";

const keyId = defineSecret("RAZORPAY_KEY_ID");
const keySecret = defineSecret("RAZORPAY_KEY_SECRET");
const botToken = defineSecret("TELEGRAM_TOKEN");
const chatId = defineSecret("TELEGRAM_CHAT_ID");
initializeApp()
const db = getFirestore();

export const createStarStoreOrder = onCall({
	cors: ["http://localhost", "https://jailson300.github.io", "https://star-store.web.app", "*"],
	secrets: [keyId, keySecret],
}, async (request) => {
	const instance = new Razorpay({
		key_id: keyId.value(),
		key_secret: keySecret.value(),
	});
	const options = {
		amount: request.data.amount,
		currency: "INR",
	};

	try {
		const order = await new Promise((resolve, reject) => {
			instance.orders.create(options, (err, order) => {
				if (err) {
					console.log(err);
					reject(err);
				}
				resolve(order);
			});
		});
		return order;
	} catch (error) {
		console.log(error);
		return error;
	}
})

export const sendOrderNotification = onCall({
	cors: ["http://localhost", "https://jailson300.github.io", "https://star-store.web.app", "*"],
	secrets: [keySecret, botToken, chatId],
}, async (request) => {
	console.log(request.data);
	if (!keySecret || !botToken || !chatId) {
		console.error("Missing environment variables");
		return {
			success: false,
			message: "Missing environment variables",
		};
	}
	if (validatePaymentVerification({
		"order_id": request.data.razorpay_order_id,
		"payment_id": request.data.razorpay_payment_id,
	}, request.data.razorpay_signature, keySecret.value()) == false) {
		console.log("Payment verification failed");
		return {
			success: false,
			message: "Payment verification failed",
			order_id: request.data.razorpay_order_id,
		};
	}

	const url = `https://api.telegram.org/bot${botToken.value()}/sendMessage`;
	const orderId = (request.data.razorpay_order_id);
	const paymentId = (request.data.razorpay_payment_id);
	const name = (request.data.name);
	const userId = (request.data.id);
	const server = (request.data.server);
	const packageName = (request.data.package);
	const cost = (request.data.cost);

	const message = `
	*New Order Placed!* 🔥

	*Order Details:*
			- Order ID: \`${orderId}\`
			- Payment ID: \`${paymentId}\`

	*User Details:*
			- Name: ${name}
			- User ID: \`${userId}\`
			- Server: \`${server}\`

	*Package Details:*
			- Package: ${packageName}
			- Cost: ${cost}
	`;


	try {
		const response = await axios.post(url, {
			chat_id: chatId.value(),
			text: message,
			parse_mode: "Markdown",
		})
		const resData = await response.data;
		if (!resData.ok) {
			console.error("Error sending message:", resData.description);
			return {
				success: false,
				message: "Payment verified successfully, but unable to notify the administrators",
				order_id: request.data.razorpay_order_id,
			};
		}

		// Add to cloud firestore
		const data = {
			order_id: request.data.razorpay_order_id,
			payment_id: request.data.razorpay_payment_id,
			name: request.data.name,
			id: request.data.id,
			server: request.data.server,
			package: request.data.package,
			cost: request.data.cost,
			status: "pending",
		}

		const firestoreRes = await db.collection("tenants").doc("star-store").collection("orders").doc(request.data.razorpay_order_id).set(data);
		if (!firestoreRes) {
			console.error("Error adding to firestore:", firestoreRes);
			return {
				success: false,
				message: "Payment verified successfully, but unable to add to firestore",
				order_id: request.data.razorpay_order_id,
			};
		}

		return {
			success: true,
			message: "Payment verified successfully",
			...data
		};

	} catch (error) {
		console.error("Error sending message:", error);
		return {
			success: false,
			message: "Payment verified, but unable to notify the administrators",
			order_id: request.data.razorpay_order_id,
		};
	}

	return;
})

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
