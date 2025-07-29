const loadingModal = document.querySelector("#loading-modal") as HTMLDivElement

export const showLoadingModal = () => {
	loadingModal.style.display = "flex"
}

export const hideLoadingModal = () => {
	loadingModal.style.display = "none"
}

