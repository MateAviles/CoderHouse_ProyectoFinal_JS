let agenda = [];

function isValidName(name) {
  const namePattern = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/; 
  return namePattern.test(name);
}

function isValidPhone(phone) {
  const phonePattern = /^\d+$/; 
  return phonePattern.test(phone);
}

function addContact(name, phone) {
  const contactId = Date.now(); // id unico
  const contactItem = { id: contactId, name, phone };
  agenda.push(contactItem);
  saveToLocalStorage(); 
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
      <button class="update-btn" onclick="showUpdateForm(${contact.id})">Actualizar</button>
      <button class="delete-btn" onclick="deleteContact(${contact.id})">Eliminar</button>`;
    contactList.appendChild(li);
  });
  document.getElementById("totalContacts").textContent = agenda.length;
}

document.getElementById("addContactBtn").addEventListener("click" , () => {
  const nameInput = document.getElementById("nameInput");
  const phoneInput = document.getElementById("phoneInput");
  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();

  if (!isValidName(name)) {
    alert("El nombre solo debe tener letras");
    return;
  }

  if (!isValidPhone(phone)) {
    alert("El número de teléfono solo debe tener numeros");
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

function showUpdateForm(contactId) {
  const contact = agenda.find(contact => contact.id === contactId);
  const newName = prompt("Introduce el nuevo nombre:", contact.name);
  const newPhone = prompt("Introduce el nuevo número de teléfono:", contact.phone);

  if (newName && newPhone && nameRegex.test(newName) && phoneRegex.test(newPhone)) {
    updateContact(contactId, newName, newPhone);
  } else {
    alert("Por favor ingresa un nombre válido y un número de teléfono válido.");
  }
}

function saveToLocalStorage() {
  localStorage.setItem("agenda", JSON.stringify(agenda));
}

function loadFromLocalStorage() {
  const storedAgenda = localStorage.getItem("agenda");
  if (storedAgenda) {
    agenda = JSON.parse(storedAgenda);
  }
  renderContacts();
}


loadFromLocalStorage();


