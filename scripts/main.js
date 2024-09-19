const agenda = [];

function showMessage(message) {
    console.log(message);
    alert(message)
}

function searchContactByName(name){
    let serchedContact = agenda.find(contact => contact.name === name)

    if (serchedContact) {
        showMessage(`El número de teléfono de ${serchedContact.name} es ${serchedContact.phone}.`);
    } else {
        showMessage(`El contacto ${name} no existe.`);
    }
}

function insertContact(name,phone, printMessage) {
    if (/^\d{1,11}$/.test(phone)) {
        let newContact = {
            name,
            phone
        }
        
        agenda.push(newContact);

        if(printMessage){
            showMessage(`Contacto agregado. Nombre: ${newContact.name}, Número: ${newContact.phone}`);
        }
    } else {
        showMessage("Número de teléfono inválido.");
    }
}

function updateContact(name, contact){
    let searchedContact = agenda.find(contact => contact.name === name);
    
    if (searchedContact) {
        deleteContact(name, false);
    }

    insertContact(contact.name,contact.phone, false);

    showMessage(`Contacto actualizado. Nombre: ${contact.name}, Número: ${contact.phone}`);
}

function deleteContact(name, printMessage){
    let serchedContact = agenda.find(contact => contact.name === name);

    if (serchedContact) {
        const contactIndex = agenda.indexOf(serchedContact);
        
        if(contactIndex > -1){
            agenda.splice(contactIndex, 1);
        }

        if(printMessage){
            showMessage(`Contacto ${name} eliminado.`)
        }
    } else {
        showMessage(`El contacto ${name} no existe.`);
    }
}

function myAgenda() {
    let name;
    let phone;
    let newName;
    let newPhone;

    while (true) {
        
        let option = prompt(
            "Selecciona una opción:\n\n" +
            "1. Buscar un número de teléfono\n" +
            "2. Ingresar un número de teléfono\n" +
            "3. Actualizar un número de teléfono\n" +
            "4. Eliminar un número de teléfono\n" +
            "5. Finalizar"
        );


        switch (option) {
            case "1":
                name = prompt("Introduce el nombre del contacto: ");
                searchContactByName(name);
                break;

            case "2":
                name = prompt("Introduce el nombre del contacto: ");
                phone = prompt("Introduce el teléfono del contacto: ");

                insertContact(name,phone, true);
                break;

            case "3":
                name = prompt("Introduce el nombre del contacto a actualizar: ");
                newName = prompt("Introduce el nuevo nombre del contacto");
                newPhone = prompt("Introduce el nuevo numero del contacto");

                updateContact(name,{name:newName,phone:newPhone});
                break;

            case "4":
                name = prompt("Introduce el nombre del contacto a eliminar: ");
                deleteContact(name, true);
                break;

            case "5":
                showMessage("Saliendo de la agenda.");
                return; 
            default:
                showMessage("Opción inválida. Elige una opción del 1 al 5.");
        }
    }
}

myAgenda();
