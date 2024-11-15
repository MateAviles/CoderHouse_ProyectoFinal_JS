function saveToLocalStorage(agenda) {
  localStorage.setItem("agenda", JSON.stringify(agenda));
}

function loadFromLocalStorage() {
  const agenda = localStorage.getItem("agenda");
  return agenda ? JSON.parse(agenda) : [];
}

function isValidName(name) {
  if (!name) {
    return "El nombre no puede estar vacío.";
  }
  const regex = /^[a-zA-Z\s]+$/;
  if (!regex.test(name)) {
    return "El nombre solo debe contener letras.";
  }
  return true;
}

function isValidPhone(phone) {
  if (!phone) {
    return "El número no puede estar vacío.";
  }
  const regex = /^[0-9]{1,15}$/;
  if (!regex.test(phone)) {
    return "El número solo debe contener hasta 15 dígitos y solo números.";
  }
  return true;
}

function contactoExist(name, phone, agenda) {
  return agenda.some(contact => contact.name === name && contact.phone === phone);
}





