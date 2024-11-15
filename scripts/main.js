const addContactBtn = document.getElementById("addContactBtn");
const updateContactBtn = document.getElementById("updateContactBtn");
const totalContacts = document.getElementById("totalContacts");

let agenda = [];
let contactToUpdate = null;

async function loadInitialContacts() {
  try {
    const response = await fetch("contacts.json");
    if (!response.ok) throw new Error("Error al cargar contactos");
    const initialContacts = await response.json();
    agenda = [...agenda, ...initialContacts];
    sortAgenda();
    renderContacts();
  } catch (error) {
    console.error("Error:", error);
    Swal.fire("Error", "No se pudieron cargar los contactos iniciales.", "error");
  }
}

function addContact(name, phone, observation, rubro) {
  const contactId = Date.now();
  const contactItem = { id: contactId, name, phone, observation, rubro };
  agenda.push(contactItem);
  sortAgenda();
  saveToLocalStorage();
  renderContacts();
  return contactItem;
}

function sortAgenda() {
  agenda.sort((a, b) => a.name.localeCompare(b.name));
}

function deleteContact(contactId) {
  const index = agenda.findIndex(contact => contact.id === contactId);
  if (index !== -1) {
    agenda.splice(index, 1);
    saveToLocalStorage();
    renderContacts();
  }
}

function showObservation(contact) {
  Swal.fire({
    title: "Observación",
    text: contact.observation || "Sin observación.",
    icon: "info",
    confirmButtonText: "Cerrar"
  });
}

function renderContacts() {
  const contactList = document.getElementById("contactList");
  contactList.innerHTML = "";

  agenda.forEach(contact => {
    const li = document.createElement("li");
    li.className = "contact-item";
    li.id = contact.id;

    li.innerHTML = `
      <div>${contact.name} - <span class="phone-highlight">${contact.phone}</span> - ${contact.rubro || "Sin rubro"}</div>
      <div>
        <button class="show-observation-btn" onclick="showObservation(agenda.find(c => c.id === ${contact.id}))">Mostrar Observación</button>
        <button class="update-btn" onclick="showUpdateForm(${contact.id})">Actualizar</button>
        <button class="delete-btn" onclick="deleteContact(${contact.id})">Eliminar</button>
      </div>
    `;

    contactList.appendChild(li);
  });

  totalContacts.textContent = `Total de contactos: ${agenda.length}`;
}

addContactBtn.addEventListener("click", () => {
  const nameInput = document.getElementById("nameInput");
  const phoneInput = document.getElementById("phoneInput");
  const observationInput = document.getElementById("observationInput");
  const rubroInput = document.getElementById("rubroInput");
  
  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();
  const observation = observationInput.value.trim();
  const rubro = rubroInput.value.trim();

  let isValidContact = true;
  const nameCheck = isValidName(name);
  const phoneCheck = isValidPhone(phone);

  if (typeof nameCheck === "string") {
    Swal.fire("Error", nameCheck, "error");
    isValidContact = false;
  }

  if (typeof phoneCheck === "string") {
    Swal.fire("Error", phoneCheck, "error");
    isValidContact = false;
  }

  if (isValidContact && !contactoExist(name, phone)) {
    addContact(name, phone, observation, rubro);
    nameInput.value = "";
    phoneInput.value = "";
    observationInput.value = "";
    rubroInput.value = "";
  } else if (contactoExist(name, phone)) {
    Swal.fire("Error", "Este contacto ya existe con el mismo número.", "error");
  }
});

function contactoExist(name, phone) {
  return agenda.some(contact => contact.name === name && contact.phone === phone);
}

function saveToLocalStorage() {
  localStorage.setItem("agenda", JSON.stringify(agenda));
}

function showUpdateForm(contactId) {
  const contact = agenda.find(contact => contact.id === contactId);
  if (contact) {
    contactToUpdate = contact;
    document.getElementById("nameInput").value = contact.name;
    document.getElementById("phoneInput").value = contact.phone;
    document.getElementById("observationInput").value = contact.observation || "";
    document.getElementById("rubroInput").value = contact.rubro || "";
    addContactBtn.style.display = "none";
    updateContactBtn.style.display = "inline-block";
  }
}

updateContactBtn.addEventListener("click", () => {
  if (contactToUpdate) {
    const nameInput = document.getElementById("nameInput");
    const phoneInput = document.getElementById("phoneInput");
    const observationInput = document.getElementById("observationInput");
    const rubroInput = document.getElementById("rubroInput");

    contactToUpdate.name = nameInput.value.trim();
    contactToUpdate.phone = phoneInput.value.trim();
    contactToUpdate.observation = observationInput.value.trim();
    contactToUpdate.rubro = rubroInput.value.trim();

    saveToLocalStorage();
    sortAgenda();
    renderContacts();
    addContactBtn.style.display = "inline-block";
    updateContactBtn.style.display = "none";
  }
});


loadInitialContacts();
renderContacts();



 



