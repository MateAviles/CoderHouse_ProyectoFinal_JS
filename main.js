document.addEventListener("DOMContentLoaded", function () {
    let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

    const nameInput = document.getElementById("name");
    const phoneInput = document.getElementById("phone");
    const contactList = document.getElementById("contactList");
    const totalContactsElement = document.getElementById("totalContacts");
    const addContactBtn = document.getElementById("addContact");
    const updateContactBtn = document.getElementById("updateContact");

    
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

        
        document.querySelectorAll(".delete").forEach(button => {
            button.addEventListener("click", function () {
                const contactName = this.getAttribute("data-name");
                deleteContact(contactName);
            });
        });

        updateTotalContacts();
    }

   
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

    // Funcion de eliminación (si ve esto, lo puse para enlazar los cambios y no esten por separado)
    function deleteContact(name) {
        contacts = contacts.filter(contact => contact.name !== name);
        localStorage.setItem("contacts", JSON.stringify(contacts));
        renderContacts();
    }

   
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

    
    function updateTotalContacts() {
        const total = contacts.reduce((acc, contact) => acc + 1, 0);
        totalContactsElement.innerText = total;
    }

    
    function clearForm() {
        nameInput.value = "";
        phoneInput.value = "";
    }

    
    addContactBtn.addEventListener("click", addContact);
    updateContactBtn.addEventListener("click", updateContact);

    
    renderContacts();
});