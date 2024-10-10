document.addEventListener("DOMContentLoaded", function () {
    let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

    const nameInput = document.getElementById("name");
    const phoneInput = document.getElementById("phone");
    const contactList = document.getElementById("contactList");
    const totalContactsElement = document.getElementById("totalContacts");
    const addContactBtn = document.getElementById("addContact");
    const updateContactBtn = document.getElementById("updateContact");

    // Función para renderizar los contactos
    function renderContacts() {
        contactList.innerHTML = "";
        contacts.map(contact => {
            const contactElement = document.createElement("div");
            contactElement.className = "contact";
            contactElement.innerHTML = `
                <span>${contact.name} - ${contact.phone}</span>
                <button class="delete" data-name="${contact.name}">Eliminar</button>
            `;
            contactList.appendChild(contactElement);
        });

        //  evento de los botones de eliminar
        document.querySelectorAll(".delete").forEach(button => {
            button.addEventListener("click", function () {
                const contactName = this.getAttribute("data-name");
                deleteContact(contactName);
            });
        });

        updateTotalContacts();
    }

    // Función para agregar contacto
    function addContact() {
        const name = nameInput.value.trim();
        const phone = phoneInput.value.trim();

        if (name === "" || phone === "") return;

        let newContact = { name, phone };
        contacts.push(newContact);
        localStorage.setItem("contacts", JSON.stringify(contacts));
        renderContacts();
        clearForm();
    }

    // Función para eliminar contacto
    function deleteContact(name) {
        contacts = contacts.filter(contact => contact.name !== name);
        localStorage.setItem("contacts", JSON.stringify(contacts));
        renderContacts();
    }

    // Función para actualizar contacto
    function updateContact() {
        const name = nameInput.value.trim();
        const phone = phoneInput.value.trim();

        if (name === "" || phone === "") return;

        const contactIndex = contacts.findIndex(contact => contact.name === name);
        if (contactIndex > -1) {
            contacts[contactIndex].phone = phone;
            localStorage.setItem("contacts", JSON.stringify(contacts));
            renderContacts();
            clearForm();
        }
    }

    // Función para actualizar el total de contactos usando reduce
    function updateTotalContacts() {
        const total = contacts.reduce((acc, contact) => acc + 1, 0);
        totalContactsElement.innerText = total;
    }

    // Función para limpiar el formulario
    function clearForm() {
        nameInput.value = "";
        phoneInput.value = "";
    }

    // Asignar eventos a los botones
    addContactBtn.addEventListener("click", addContact);
    updateContactBtn.addEventListener("click", updateContact);

    // Renderizar la lista de contactos al cargar la página
    renderContacts();
});