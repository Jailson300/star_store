console.log("main.ts")

const gamesList = [
	{
		"name": "MLBB",
		"image": "assets/mlbb.jpg",
		"url": "mlbb.html"
	},
	{
		"name": "PUBG",
		"image": "assets/pubg.png",
		"url": "pubg.html"
	},
	{
		"name": "Free Fire",
		"image": "assets/freefire.png",
		"url": "freefire.html"
	},
	{
		"name": "Call of Duty Mobile",
		"image": "assets/cod.webp",
		"url": "cod.html"
	},
]

const gamesListContainer = document.querySelector("#games-list") as HTMLDivElement
if (!gamesListContainer) {
	throw new Error("Missing element: #games-list")
}

gamesList.forEach(game => {
	const gameElement = document.createElement("div")
	const imgUrl = new URL(`${game.image}`, import.meta.url).href;
	gameElement.innerHTML = `
		<a class="game" href="${game.url}">
			<div class="img-container">
				<img src="${imgUrl}">
			</div>
			<h3>${game.name}</h3>
		</a>
	`
	gamesListContainer.appendChild(gameElement)
})

