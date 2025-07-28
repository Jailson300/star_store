import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

const clicker = document.querySelector(".mobile-menu-header > .clicker") as HTMLDivElement
const btn = document.createElement("button");

btn.classList.add("clicker")
btn.addEventListener("click", () => {
	console.log("signing out")
	auth.signOut();
	window.location.reload();
})

onAuthStateChanged(auth, (user) => {
	console.log("Auth state is changed");
	if (user) {
		btn.textContent = user.displayName ?? user.email;
		clicker.replaceWith(btn)
	} else {
		clicker.replaceWith(btn)
	}
});

const headerButtons = document.querySelectorAll(".header-button") as NodeListOf<HTMLButtonElement>
const mobileMenu = document.querySelector(".mobile-menu")
const mobileMenuList = document.querySelector(".mobile-menu-list")
console.log("hello")

if (!headerButtons || !mobileMenuList || !mobileMenu) {
	throw new Error("Missing elements: .header-button, .mobile-menu, .mobile-menu-list")
}

export const openMenu = () => {
	mobileMenu.classList.toggle("mobile-menu-hidden")
	mobileMenu.classList.toggle("mobile-menu-shown")

	setTimeout(() => {
		mobileMenuList.classList.toggle("mobile-menu-list-hidden")
		mobileMenuList.classList.toggle("mobile-menu-list-shown")
	}, 300)
}

export const closeMenu = () => {
	mobileMenuList.classList.toggle("mobile-menu-list-hidden")
	mobileMenuList.classList.toggle("mobile-menu-list-shown")

	setTimeout(() => {
		mobileMenu.classList.toggle("mobile-menu-hidden")
		mobileMenu.classList.toggle("mobile-menu-shown")
	}, 300)
}

export const toggleMenu = () => {
	if (mobileMenu.classList.contains("mobile-menu-hidden")) {
		openMenu()
	} else {
		closeMenu()
	}
}

headerButtons.forEach(button => {
	button.addEventListener("click", () => {
		toggleMenu()
	})
})

