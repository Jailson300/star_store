const userIdInput = document.querySelector("#userId");
const userZnInput = document.querySelector("#userZn");
const checkButton = document.querySelector("#checkButton");
const result = document.querySelector("#result");

let userName;

checkButton.addEventListener("click", () => {
	const userId = userIdInput.value;
	const userZn = userZnInput.value;
	const url = `https://api.isan.eu.org/nickname/ml?id=${userId}&zone=${userZn}`;
	fetch(url)
		.then(response => response.json())
		.then(data => {
			// result structure
			/* 
			{
				success: boolean,
				game: string,
				id: number,
				server: number,
				name: string
			}
			 */
			console.log(data);
			if (data.success == true) {
				result.textContent = data.name;
				userName = data.name;
			} else {
				result.textContent = "Unable to get nickname";
				userName = undefined;
			}
		})
		.catch(error => {
			console.error(error);
			result.textContent = "Error: " + error.message;
		});
})
