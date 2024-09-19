let agenda = {};

function showMessage(message) {
    console.log(message);
    alert(message)
}

function searchContactByName(name){
    if (name in agenda) {
        showMessage(`El número de teléfono de ${name} es ${agenda[name]}.`);
    } else {
        showMessage(`El contacto ${name} no existe.`);
    }
}

function insertContact(name,phone) {  
    if (/^\d{1,11}$/.test(phone)) {
        agenda[name] = phone;
    } else {
        showMessage("Número de teléfono inválido.");
    }

    return agenda;
}

function updateContact(name, contact){
    if (name in agenda) {
        deleteContact(name)
    } 
    insertContact(contact.name,contact.phone);
}

function deleteContact(name){
    if (name in agenda) {
        delete agenda[name];
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

                insertContact(name,phone);
                break;

            case "3":
                name = prompt("Introduce el nombre del contacto a actualizar: ");
                newName = prompt("Introduce el nuevo nombre del contacto")
                newPhone = prompt("Introduce el nuevo numero del contacto")
                updateContact(name,{name:newName,phone:newPhone})
                break;

            case "4":
                name = prompt("Introduce el nombre del contacto a eliminar: ");
                deleteContact(name)
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
