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

import * as functions from "firebase-functions";
import axios from "axios";
import Razorpay from "razorpay";
import {validatePaymentVerification} from "razorpay/dist/utils/razorpay-utils";

export const createStarStoreOrder = functions.https.onCall({
  cors: ["http://localhost", "https://jailson300.github.io", "https://star-store.web.app"],
}, async (request) => {
  // const keyId = functions.config().razorpay.keyid;
  // const keySecret = functions.config().razorpay.keysecret;
  const keyId = "rzp_test_Clqdrw9cYS8CDc";
  const keySecret = "rNAmQZin4N09QdA4NQmsTXtg";
  const instance = new Razorpay({
    key_id: keyId,
    key_secret: keySecret,
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
});


export const sendOrderNotification = functions.https.onCall({
  cors: ["http://localhost", "https://jailson300.github.io", "https://star-store.web.app"],
}, (request) => {
  // const keyId = functions.config().razorpay.keyid;
  // const keySecret = functions.config().razorpay.keysecret;
  const keySecret = "rNAmQZin4N09QdA4NQmsTXtg";
  const botToken = functions.config().telegram.token;
  const chatId = functions.config().telegram.chatid;

  console.log(request.data);
  if (validatePaymentVerification({
    "order_id": request.data.razorpay_order_id,
    "payment_id": request.data.razorpay_payment_id,
  }, request.data.razorpay_signature, keySecret) == false) {
    console.log("Payment verification failed");
    return {
      success: false,
      message: "Payment verification failed",
      order_id: request.data.razorpay_order_id,
    };
  }

  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
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
    axios.post(url, {
      chat_id: chatId,
      text: message,
      parse_mode: "Markdown",
    }).then((response) => {
      console.log("Message sent successfully:", response.data);
      return {
        success: true,
        message: "Payment verified successfully",
        order_id: request.data.razorpay_order_id,
      };
    });
  } catch (error) {
    console.error("Error sending message:", error);
    return {
      success: false,
      message: "Payment verified, but unable to notify the administrators",
      order_id: request.data.razorpay_order_id,
    };
  }

  return;
});

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
