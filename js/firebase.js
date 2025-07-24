// Import the functions you need from the SDKs you need
import { getApp, initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Add Firebase products that you want to use
import { getAuth, connectAuthEmulator } from 'https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js'
import { getFirestore, connectFirestoreEmulator } from 'https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js'
import { getFunctions, connectFunctionsEmulator, httpsCallable } from 'https://www.gstatic.com/firebasejs/12.0.0/firebase-functions.js'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyAKgw2wBBhvaBXBpiB_4-rDWDon1JTDr2c",
	authDomain: "winter-f3cb5.firebaseapp.com",
	projectId: "winter-f3cb5",
	storageBucket: "winter-f3cb5.firebasestorage.app",
	messagingSenderId: "548025054656",
	appId: "1:548025054656:web:b79ac1e4202b416e58c425",
	measurementId: "G-T0SEWLNBV4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const functions = getFunctions(getApp());
export const db = getFirestore(app);
getAuth(app).tenantId = "star-store"

// Emulators section
// Should only use emulators if, and only if the url is localhost
if (window.location.hostname === "localhost") {
	console.log("running in emulator mode");
	connectAuthEmulator(getAuth(app), "http://localhost:9099");
	connectFirestoreEmulator(db, "localhost", 8080);
	connectFunctionsEmulator(functions, "localhost", 5001);
}
