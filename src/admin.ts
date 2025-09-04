import { collection, query, where, orderBy, getDocs, getFirestore, onSnapshot, doc, updateDoc } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import { app, auth } from "./firebase"
import { showTrackingForm } from "./tracking"

const db = getFirestore(app);
const list = document.querySelector("#admin-list")
const btn = document.createElement("button");

const collRef = collection(db, "tenants", "star-store-lhgmd", "orders")

interface Order {
  cost: string;
  id: string;
  name: string;
  order_id: string;
  package: string;
  payment_id: string;
  server: string;
  status: string;
  timestamp: any;
  uuid: string;
}

let listItems: Order[] = []

let filteredListItems: Order[] = []

const searchInput = document.querySelector("#search-input") as HTMLInputElement | null
const filterSelect = document.querySelector("#filter-select") as HTMLSelectElement | null

const renderList = (items: Order[], term: string, term2?: string) => {
  if (!list) return
  list.innerHTML = ""
  items.forEach((data) => {
    const listItem = document.createElement("li")
    listItem.innerHTML = `
      <table>
        <tr>
          <td>Username</td>
          <td>${data.name}</td>
        </tr>
        <tr>
          <td>ID</td>
          <td>${data.id}</td>
        </tr>
        <tr>
          <td>Server</td>
          <td>${data.server}</td>
        </tr>
        <tr>
          <td>Package</td>
          <td>${data.package}</td>
        </tr>
        <tr>
          <td>Price</td>
          <td>${data.cost}</td>
        </tr>
        <tr>
          <td>PaymentID</td>
          <td>${data.payment_id}</td>
        </tr>
        <tr>
          <td>OrderID</td>
          <td>${data.order_id}</td>
        </tr>
        <tr>
          <td>Status</td>
          <td>${data.status}</td>
        </tr>
      </table>
      <div class="admin-buttons">
        <div>
          ${
            data.status === 'pending' ? `
              <button id="reject-button">Reject</button>
              <button id="accept-button">Done</button>
            ` : data.status === 'done' ? `
              <button id="reject-button">Reject</button>
              <button id="revoke-button">Revoke</button>
            ` : data.status === 'rejected' ? `
              <button id="revoke-button">Revoke</button>
              <button id="accept-button">Done</button>
            ` : ''
          }
        </div>
        <button id="delete-button">Delete</button>
      </div>
    `

    const deleteButton = listItem.querySelector("#delete-button")
    const acceptButton = listItem.querySelector("#accept-button")
    const rejectButton = listItem.querySelector("#reject-button")
    const revokeButton = listItem.querySelector("#revoke-button")

    acceptButton?.addEventListener('click', (e) => {
      e.preventDefault()
      const docRef = doc(db, "tenants", "star-store-lhgmd", "orders", data.order_id)
      updateDoc(docRef, { status: 'done' }).then(() => {
        listItem.remove()
      }).catch((error) => {
        console.error("Error updating document: ", error)
      })
    })

    rejectButton?.addEventListener('click', (e) => {
      e.preventDefault()
      const docRef = doc(db, "tenants", "star-store-lhgmd", "orders", data.order_id)
      updateDoc(docRef, { status: 'rejected' }).then(() => {
        listItem.remove()
      }).catch((error) => {
        console.error("Error updating document: ", error)
      })
    })

    revokeButton?.addEventListener('click', (e) => {
      e.preventDefault()
      const docRef = doc(db, "tenants", "star-store-lhgmd", "orders", data.order_id)
      updateDoc(docRef, { status: 'pending' }).then(() => {
        listItem.remove()
      }).catch((error) => {
        console.error("Error updating document: ", error)
      })
    })

    deleteButton?.addEventListener('click', (e) => {
      e.preventDefault()
      alert("Delete is disabled for safety. You can change the status to 'rejected' or 'pending' and filter them out.")
      //const docRef = doc(db, "tenants", "star-store-lhgmd", "orders", data.order_id)
      //updateDoc(docRef, { status: 'deleted' }).then(() => {
      //  listItem.remove()
      //}).catch((error) => {
      //  console.error("Error updating document: ", error)
      //})
    })

    // Highlight search term
    const searchables = listItem.querySelectorAll("td:nth-child(2)")
    if (term) {
      searchables.forEach((el) => {
        const regex = new RegExp(`(${term})`, "gi")
        el.innerHTML = el.innerHTML.replace(regex, `<span class="highlight">$1</span>`)
      })
    }
    if (term2 && term2 !== "all") {
      searchables.forEach((el) => {
        const regex = new RegExp(`(${term2})`, "gi")
        el.innerHTML = el.innerHTML.replace(regex, `<span class="highlight">$1</span>`)
      })
    }

    list?.appendChild(listItem)
  })
}

searchInput?.addEventListener("input", () => {
  applyFilters()
})
filterSelect?.addEventListener("change", () => {
  applyFilters()
})

const applyFilters = () => {
  const searchTerm = searchInput?.value.toLowerCase() || ""
  const filterValue = filterSelect?.value || "all"
  filteredListItems = listItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm) || item.id.toLowerCase().includes(searchTerm) || item.order_id.toLowerCase().includes(searchTerm)
      || item.package.toLowerCase().includes(searchTerm) || item.server.toLowerCase().includes(searchTerm) || item.status.toLowerCase().includes(searchTerm)
    const matchesFilter = filterValue === "all" || item.status === filterValue
    return matchesSearch && matchesFilter
  })
  renderList(filteredListItems, searchTerm, filterValue)
}

const unsubscribe = onSnapshot(collRef, (snapshot) => {
  listItems = []
  snapshot.forEach((doc) => {
    const data = doc.data() as Order
    listItems.push(data)
    applyFilters()
  })
})
