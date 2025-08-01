import { getApp, initializeApp } from "firebase/app";

// Add Firebase products that you want to use
import { getAuth, connectAuthEmulator } from 'firebase/auth'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'
import { getFunctions, connectFunctionsEmulator, httpsCallable } from 'firebase/functions'

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

export const functions = getFunctions(getApp());
export const db = getFirestore(app);
getAuth(app).tenantId = "star-store-lhgmd"
export const auth = getAuth(app);

// Emulators section
// Should only use emulators if, and only if the url is localhost
//if (window.location.hostname === "localhost") {
//	console.log("running in emulator mode");
//	connectAuthEmulator(auth, "http://localhost:9099");
//	connectFirestoreEmulator(db, "localhost", 8080);
//	connectFunctionsEmulator(functions, "localhost", 5001);
//}

