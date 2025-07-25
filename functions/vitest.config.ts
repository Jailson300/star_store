import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		env: {
			"TELEGRAM_CHAT_ID":"-1002899365337",
			"TELEGRAM_TOKEN":"7808533785:AAH2EsUcFbPiK2uymDHXMSUUeNTcnSUP4KA",
			"RAZORPAY_KEY_ID":"rzp_test_Clqdrw9cYS8CDc",
			"RAZORPAY_KEY_SECRET":"rNAmQZin4N09QdA4NQmsTXtg"
		}
	},
});
