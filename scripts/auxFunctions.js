
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
  
  function contactoExist(name, phone, agenda) {
    return agenda.some(contacto => contacto.name === name && contacto.phone === phone);
  }
  
  function saveToLocalStorage(agenda) {
    localStorage.setItem("agenda", JSON.stringify(agenda));
  }
  
  function loadFromLocalStorage() {
    const storedAgenda = localStorage.getItem("agenda");
    return storedAgenda ? JSON.parse(storedAgenda) : [];
  }
  