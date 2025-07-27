const headerButtons = document.querySelectorAll(".header-button")
const mobileMenu = document.querySelector(".mobile-menu")
const mobileMenuList = document.querySelector(".mobile-menu-list")

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

