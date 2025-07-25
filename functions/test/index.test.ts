//const test = require("firebase-functions-test")({
//  apiKey: "AIzaSyAKgw2wBBhvaBXBpiB_4-rDWDon1JTDr2c",
//  authDomain: "winter-f3cb5.firebaseapp.com",
//  projectId: "winter-f3cb5",
//  storageBucket: "winter-f3cb5.firebasestorage.app",
//  messagingSenderId: "548025054656",
//  appId: "1:548025054656:web:b79ac1e4202b416e58c425",
//  measurementId: "G-T0SEWLNBV4"
//}, '/home/autumn/Downloads/winter-f3cb5-7a8c82e25a10.json')

import { describe, it, expect, beforeAll, afterAll, vi } from "vitest"
import fft from "firebase-functions-test"
import admin from "firebase-admin"
import axios from "axios"

import { createStarStoreOrder, sendOrderNotification } from "../src/index"
import { CallableRequest } from "firebase-functions/https"

const testEnv = fft()

describe("Cloud Functions: Callable", () => {
	vi.mock('axios')

	beforeAll(() => {
		vi.spyOn(admin, "initializeApp").mockImplementation(() => {})
	})

	afterAll(() => {
		vi.restoreAllMocks()
		testEnv.cleanup()
	})


	it("Should send order notification", async () => {
		console.log("Hello")
		const testData = {
			razorpay_order_id: "order_Qx1zCJ2DqUd4re",
			razorpay_payment_id: "pay_Qx1zO05Vlw4sZ0",
			razorpay_signature: "76b7cfee6ebab1b6d7eee397347d92e40d529508e397e1af3dfb836f757bcc65",
			id: "454855763",
			name: "ᖇᗩᎥᑎ",
			package: "Diamond 257",
			server: "2321",
			cost: "Rs. 330"
		}

		const callableReq: CallableRequest<any> = {
			data: testData
		}

		vi.mocked(axios.post).mockResolvedValue({ status: 200, data: { ok: true } });

		const wrapped = testEnv.wrap(sendOrderNotification)
		const result = await wrapped(callableReq)

		console.log(result)
		expect(result).to.be.an("object")
		expect(result?.success).to.equal(true)
		expect(axios.post).toHaveBeenCalledOnce();

	})
})
