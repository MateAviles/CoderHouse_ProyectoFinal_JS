let agenda = [];

const addContactBtn = document.getElementById("addContactBtn");
const updateContactBtn = document.getElementById("updateContactBtn");
const totalContacts = document.getElementById("totalContacts");

let contactToUpdate = null; // Variable para guardar el contacto que se va a actualizar

function isValidName(name) {
  const namePattern = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
  if (!name) return "Debe completar este campo.";
  if (!namePattern.test(name)) return "Nombre incorrecto, debe contener solo letras.";
  return true;
}

function isValidPhone(phone) {
  const phonePattern = /^\d+$/;
  if (!phone) return "Debe completar este campo.";
  if (!phonePattern.test(phone)) return "Teléfono incorrecto, debe contener solo números.";
  return true;
}

function contactoExist(name, phone) {
  return agenda.some(contacto => contacto.name === name && contacto.phone === phone);
}

function addContact(name, phone, observation) {
  const contactId = Date.now();
  const contactItem = { id: contactId, name, phone, observation };
  agenda.push(contactItem);
  saveToLocalStorage();
  return contactItem;
}

function deleteContact(contactId) {
  const index = agenda.findIndex(contact => contact.id === contactId);
  if (index !== -1) {
    agenda.splice(index, 1);
    saveToLocalStorage();
  }
}

function showObservation(contact) {
  Swal.fire({
    title: 'Observación',
    text: contact.observation || "Sin observación.",
    icon: 'info',
    confirmButtonText: 'Cerrar'
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
      <div>${contact.name} - ${contact.phone}</div>
      <div>
        <button class="show-observation-btn" onclick="showObservation(agenda.find(c => c.id === ${contact.id}))">Mostrar Observación</button>
        <button class="update-btn" onclick="showUpdateForm(${contact.id})">Actualizar</button>
        <button class="delete-btn" onclick="deleteContact(${contact.id})">Eliminar</button>
      </div>
    `;

    contactList.appendChild(li);
  });

  totalContacts.textContent = agenda.length;
}

addContactBtn.addEventListener("click", () => {
  const nameInput = document.getElementById("nameInput");
  const phoneInput = document.getElementById("phoneInput");
  const observationInput = document.getElementById("observationInput");
  const nameErrorMsg = document.getElementById("nombre-error-msg");
  const phoneErrorMsg = document.getElementById("number-error-msg");
  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();
  const observation = observationInput.value.trim();

  let isValidContact = true;
  const nameCheck = isValidName(name);
  const phoneCheck = isValidPhone(phone);

  if (typeof nameCheck === "string") {
    nameInput.classList.add("input-error");
    nameErrorMsg.innerText = nameCheck;
    isValidContact = false;
  } else {
    nameInput.classList.remove("input-error");
    nameErrorMsg.innerText = "";
  }

  if (typeof phoneCheck === "string") {
    phoneInput.classList.add("input-error");
    phoneErrorMsg.innerText = phoneCheck;
    isValidContact = false;
  } else {
    phoneInput.classList.remove("input-error");
    phoneErrorMsg.innerText = "";
  }

  if (isValidContact && !contactoExist(name, phone)) {
    addContact(name, phone, observation);
    renderContacts();
    nameInput.value = "";
    phoneInput.value = "";
    observationInput.value = "";
  } else if (contactoExist(name, phone)) {
    alert("Este contacto ya existe con el mismo número.");
  }
});

function showUpdateForm(contactId) {
  const contact = agenda.find(contact => contact.id === contactId);
  if (contact) {
    contactToUpdate = contact;

    document.getElementById("nameInput").value = contact.name;
    document.getElementById("phoneInput").value = contact.phone;
    document.getElementById("observationInput").value = contact.observation || '';

    addContactBtn.style.display = "none";
    updateContactBtn.style.display = "inline-block";
  }
}

updateContactBtn.addEventListener("click", () => {
  if (contactToUpdate) {
    const newName = document.getElementById("nameInput").value.trim();
    const newPhone = document.getElementById("phoneInput").value.trim();
    const newObservation = document.getElementById("observationInput").value.trim();

    if (isValidName(newName) === true && isValidPhone(newPhone) === true) {
      contactToUpdate.name = newName;
      contactToUpdate.phone = newPhone;
      contactToUpdate.observation = newObservation;

     saveToLocalStorage();

      document.getElementById("nameInput").value = "";
      document.getElementById("phoneInput").value = "";
      document.getElementById("observationInput").value = "";

      addContactBtn.style.display = "inline-block";
      updateContactBtn.style.display = "none";
    } else {
      alert("Por favor ingresa un nombre y teléfono válidos.");
    }

    contactToUpdate = null;
  }
});

function saveToLocalStorage() {
  localStorage.setItem("agenda", JSON.stringify(agenda));
  renderContacts();
}

function loadFromLocalStorage() {
  const storedAgenda = localStorage.getItem("agenda");
  if (storedAgenda) {
    agenda = JSON.parse(storedAgenda);
  }
  renderContacts();
}

loadFromLocalStorage();
