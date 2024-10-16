let agenda = JSON.parse(localStorage.getItem("agenda")) || [];

function saveToStorage() {
  localStorage.setItem("agenda", JSON.stringify(agenda));
}

function isValidName(name) {
  const namePattern = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/; 
  return namePattern.test(name);
}

function isValidPhone(phone) {
  const phonePattern = /^\d+$/; 
  return phonePattern.test(phone);
}

function addContact(name, phone) {
  const contactId = Date.now(); 
  const contactItem = { id: contactId, name, phone };
  agenda.push(contactItem);
  saveToStorage(); 
  return contactItem;
}

function deleteContact(contactId) {
  const index = agenda.findIndex(contact => contact.id === contactId);
  if (index !== -1) {
    agenda.splice(index, 1);
    saveToStorage(); 
  }
}


function updateContact(contactId, newName, newPhone) {
  const contact = agenda.find(contact => contact.id === contactId);
  if (contact) {
    contact.name = newName;
    contact.phone = newPhone;
    saveToStorage(); 
  }
}

function renderContacts() {
  const contactList = document.getElementById("contactList");
  contactList.innerHTML = ""; 
  agenda.forEach(contact => {
    const li = document.createElement("li");
    li.className = "contact-item";
    li.innerHTML = `${contact.name} - ${contact.phone} 
      <button class="update-btn" onclick="populateUpdateForm(${contact.id})">Actualizar</button>
      <button onclick="deleteContact(${contact.id}); renderContacts();">Eliminar</button>`;
    contactList.appendChild(li);
  });
}

document.getElementById("addContactBtn").addEventListener("click", () => {
  const nameInput = document.getElementById("nameInput");
  const phoneInput = document.getElementById("phoneInput");
  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();

  if (!isValidName(name)) {
    alert("El nombre solo debe contener letras y espacios.");
    return;
  }

  if (!isValidPhone(phone)) {
    alert("El número de teléfono solo debe contener dígitos.");
    return;
  }

  if (name && phone) {
    const addContactBtn = document.getElementById("addContactBtn");

    if (addContactBtn.dataset.mode === "update") {
      const contactId = parseInt(addContactBtn.dataset.contactId);
      updateContact(contactId, name, phone);
      addContactBtn.innerText = "Agregar Contacto"; 
      delete addContactBtn.dataset.mode; 
      delete addContactBtn.dataset.contactId; 
    } else {
      
      addContact(name, phone);
    }

    renderContacts(); 
    nameInput.value = ""; 
    phoneInput.value = ""; 
  }
});

function populateUpdateForm(contactId) {
  const contact = agenda.find(contact => contact.id === contactId);

  document.getElementById("nameInput").value = contact.name;
  document.getElementById("phoneInput").value = contact.phone;

  const addContactBtn = document.getElementById("addContactBtn");
  addContactBtn.innerText = "Actualizar Contacto";
  addContactBtn.dataset.mode = "update"; 
  addContactBtn.dataset.contactId = contactId; 
}

document.addEventListener("DOMContentLoaded", renderContacts);

