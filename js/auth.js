import { signInWithPopup, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider } from 'https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js'
import { auth } from './firebase.js';

const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const signInButtonMobile = document.getElementById('signInMobile');
const signUpButtonMobile = document.getElementById('signUpMobile');
const container = document.getElementById('container');
const googleProvider = new GoogleAuthProvider();

// Check for screen width to apply different logic for mobile
if (window.innerWidth > 768) {
	// --- Desktop Logic ---
	// Event listener to switch to the "Sign Up" panel
	signUpButton.addEventListener('click', () => {
		container.classList.add("right-panel-active");
	});

	// Event listener to switch back to the "Sign In" panel
	signInButton.addEventListener('click', () => {
		container.classList.remove("right-panel-active");
	});
} else {
	// --- Mobile Logic ---
	const signUpContainer = document.querySelector('.sign-up-container');
	const signInContainer = document.querySelector('.sign-in-container');

	// Hide sign-in, show sign-up
	signUpButtonMobile.addEventListener('click', () => {
		signInContainer.style.opacity = '0';
		signInContainer.style.transform = 'translateX(-100%)';

		signUpContainer.style.opacity = '1';
		signUpContainer.style.transform = 'translateX(0%)';
	});

	// Hide sign-up, show sign-in
		signInButtonMobile.addEventListener('click', () => {
			signInContainer.style.opacity = '1';
			signInContainer.style.transform = 'translateX(0%)';

			signUpContainer.style.opacity = '0';
			signUpContainer.style.transform = 'translateX(100%)';
		});
}

// Re-check on resize to switch between mobile and desktop logic if needed
window.addEventListener('resize', () => {
	// This is a simple implementation. For production, you might want a more robust solution
	// to avoid re-attaching listeners multiple times, but this works for a demo.
		//location.reload(); 
});

const signInForm = document.querySelector("#signInForm")
const signUpForm = document.querySelector("#signUpForm")

if (auth.currentUser) {
	alert("Already signed in")
	window.location.href = "index.html";
}

signInForm.addEventListener("submit", (e) => {
	e.preventDefault()
	const formData = new FormData(signInForm)
	const email = formData.get("email")
	const pass = formData.get("pass")
	if (!email || !pass) {
		alert("Please enter email and password")
		return
	}
	// TODO: Send email and pass to backend
	signInWithEmailAndPassword(auth, email, pass)
	.then((userCredential) => {
		console.log(userCredential)
		alert("Signed In")
		window.location.reload();
	})
	.catch((error) => {
		console.log(error)
		alert("Unable to sign in: " + error.message)
	})
})

signUpForm.addEventListener("submit", (e) => {
	e.preventDefault()
	const formData = new FormData(signUpForm)
	const email = formData.get("email")
	const pass = formData.get("pass")
	const conf = formData.get("conf")
	if (!email || !pass || !conf) {
		alert("Please enter email, password and name")
		return
	}
	if (pass !== conf) {
		alert("Passwords do not match")
		return
	}
	// TODO: Send email, pass and name to backend
	createUserWithEmailAndPassword(auth, email, pass)
	.then((userCredential) => {
		console.log(userCredential)
		alert("Signed Up")
		window.location.reload();
	})
	.catch((error) => {
		console.log(error)
		alert("Unable to sign up: " + error.message)
	})
})

const socialButtons = document.querySelectorAll('.social-container')
socialButtons.forEach(button => {
	button.addEventListener('click', () => {
		signInWithPopup(auth, googleProvider)
		.then((result) => {
			console.log(result)
			alert("Signed In")
		})
		.catch((error) => {
			console.log(error)
			alert("Unable to sign in: " + error.message)
		})
	})
})
