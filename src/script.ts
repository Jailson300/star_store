import { collection, query, where, orderBy, getDocs, getFirestore } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import { app, auth } from "./firebase"
import { showTrackingForm } from "./tracking"

const db = getFirestore(app);
const history = document.querySelector("#history") as HTMLDivElement
const btn = document.createElement("button") as HTMLButtonElement

onAuthStateChanged(auth, (user) => {
	console.log("Auth state is changed");
	if (user) {
		// User is signed in, see docs for a list of available properties
		// https://firebase.google.com/docs/reference/js/firebase.User

		const uid = user.uid;
		const list = document.createElement("ul")

		const collRef = collection(db, "tenants", "star-store-lhgmd", "orders")
		const q = query(collRef, where("uuid", "==", uid), orderBy("timestamp", "desc"));
		btn.textContent = user.displayName ?? user.email;

		getDocs(q).then((querySnapshot) => {
			querySnapshot.forEach((doc) => {
				const data = doc.data()
				console.log(data.order_id);
				if (!data.cost || !data.id || !data.name || !data.order_id || !data.package || !data.server || !data.status) {
					console.log("Invalid data!!")
					console.log(data);
					return;
				}
				const li = document.createElement("li")
				li.style.cursor = "pointer"
				li.innerHTML = `
					<div>
						<h3>${data.name}</h3>
						<p>${data.id} (${data.server})</p>
					</div>
					<div>
						<h4>${data.package} for <span class=${data.status =='done' ? 'green': 'red'}>${data.cost}</span></h4>
						<p>${data.order_id}</p>
					</div>
				`
				list.appendChild(li)
				li.addEventListener("click", () => {
					console.log("Hello there")
					showTrackingForm(data.order_id)
				})
			})
			history.innerHTML = `
			<div class="history">
				<h2>Order History</h2>
				${list.outerHTML}
			</div>
			`

		}).catch((error) => {
			console.log(error)
		})
	} else {
		// User is signed out
		// ...
		console.log("signed out")
	}
});
