//const test = require("firebase-functions-test")({
//  apiKey: "AIzaSyAKgw2wBBhvaBXBpiB_4-rDWDon1JTDr2c",
//  authDomain: "winter-f3cb5.firebaseapp.com",
//  projectId: "winter-f3cb5",
//  storageBucket: "winter-f3cb5.firebasestorage.app",
//  messagingSenderId: "548025054656",
//  appId: "1:548025054656:web:b79ac1e4202b416e58c425",
//  measurementId: "G-T0SEWLNBV4"
//}, '/home/autumn/Downloads/winter-f3cb5-7a8c82e25a10.json')

import "mocha"
import { expect } from "chai"
import * as sinon from "sinon"
import * as fft from "firebase-functions-test"

import { createStarStoreOrder, sendOrderNotification } from "../src/index"

const testEnv = fft()
