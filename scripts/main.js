const addContactBtn = document.getElementById("addContactBtn");
const updateContactBtn = document.getElementById("updateContactBtn");
const totalContacts = document.getElementById("totalContacts");

const searchInput = document.getElementById("searchInput");
const searchSelect = document.getElementById("searchSelect");

let agenda = [];
let filteredAgenda = agenda;
let contactToUpdate = null;

// Functions

async function loadInitialContacts() {
  try {
    let initialContacts;

    if(localStorage.getItem('agenda')){
      initialContacts = JSON.parse(localStorage.getItem('agenda'))
    }else{
      const response = await fetch("data/contacts.json");
      if (!response.ok)
        throw new Error("Error al cargar contactos");
      initialContacts = await response.json();
    }

    initialContacts = initialContacts
      .map(initialContact => new Contact(
        initialContact.id,
        initialContact.name,
        initialContact.phone,
        initialContact.img,
        initialContact.observation,
        initialContact.rubro
      ));

    agenda = [...agenda, ...initialContacts];
    filteredAgenda = agenda;
    sortAgenda();
    renderContacts();
  } catch (error) {
    console.error("Error:", error);
    Swal.fire("Error", "No se pudieron cargar los contactos iniciales.", "error");
  }
}

function addContact(name, phone, img, observation, rubro) {
  const contactId = Date.now();
  const contactItem = new Contact(
    contactId,
    name,
    phone,
    img,
    observation,
    rubro
  );
  agenda.push(contactItem);
  filteredAgenda = agenda;
  sortAgenda();
  saveToLocalStorage();
  renderContacts();
  return contactItem;
}

function sortAgenda() {
  agenda.sort((a, b) => a.name > b.name);
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

  filteredAgenda.forEach(contact => {
    const li = document.createElement("li");
    li.className = "contact-item";
    li.id = contact.id;

    li.innerHTML = `
      <div>
        <img class="contact-img" src="${contact.img}" alt="Imagen contacto">
        ${contact.name} - <span class="phone-highlight">${contact.phone}</span> - ${contact.rubro || "Sin rubro"}
      </div>
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

function handleSearch(valueType, valueToSearch) {
  filteredAgenda = agenda.filter(contact => contact[valueType].toLowerCase().includes(valueToSearch.toLowerCase()));

  renderContacts();
}

// Events Listeners

addContactBtn.addEventListener("click", (evt) => {
  evt.preventDefault();
  evt.stopPropagation();

  const nameInput = document.getElementById("nameInput");
  const phoneInput = document.getElementById("phoneInput");
  const imgInput = document.getElementById("imgInput");
  const observationInput = document.getElementById("observationInput");
  const rubroInput = document.getElementById("rubroInput");
  
  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();
  const img = imgInput.value.trim();
  const rubro = rubroInput.value.trim();
  const observation = observationInput.value.trim();

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
    addContact(name, phone, img, observation, rubro);
    nameInput.value = "";
    phoneInput.value = "";
    imgInput.value = "";
    observationInput.value = "";
    rubroInput.value = "";
  } else if (contactoExist(name, phone)) {
    Swal.fire("Error", "Este contacto ya existe con el mismo número.", "error");
  }
});

updateContactBtn.addEventListener("click", (evt) => {
  evt.preventDefault();
  evt.stopPropagation();

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

    nameInput.value = "";
    phoneInput.value = "";
    observationInput.value = "";
    rubroInput.value = "";
  }
});

searchInput.addEventListener("input", (evt) => {
  evt.stopPropagation();

  handleSearch(searchSelect.value, evt.target.value);
});
searchSelect.addEventListener("change", (evt) =>{
  evt.stopPropagation();

  handleSearch(evt.target.value, searchInput.value);
})

loadInitialContacts();
renderContacts();