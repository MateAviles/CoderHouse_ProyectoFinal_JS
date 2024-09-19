
function insertContact(name) {
    let phone = prompt("Introduce el teléfono del contacto: ");
    if (/^\d{1,11}$/.test(phone)) {
        agenda[name] = phone;
    } else {
        alert("Número de teléfono inválido.");
    }
}

function myAgenda() {
    let agenda = {};
    while (true) {
        
        let option = prompt(
            "Selecciona una opción:\n\n" +
            "1. Buscar un número de teléfono\n" +
            "2. Ingresar un número de teléfono\n" +
            "3. Actualizar un número de teléfono\n" +
            "4. Eliminar un número de teléfono\n" +
            "5. Finalizar"
        );

        let name; 

        switch (option) {
            case "1":
                name = prompt("Introduce el nombre del contacto: ");
                if (name in agenda) {
                    alert(`El número de teléfono de ${name} es ${agenda[name]}.`);
                } else {
                    alert(`El contacto ${name} no existe.`);
                }
                break;

            case "2":
                name = prompt("Introduce el nombre del contacto: ");
                insertContact(name);
                break;

            case "3":
                name = prompt("Introduce el nombre del contacto a actualizar: ");
                if (name in agenda) {
                    insertContact(name);
                } else {
                    alert(`El contacto ${name} no existe.`);
                }
                break;

            case "4":
                name = prompt("Introduce el nombre del contacto a eliminar: ");
                if (name in agenda) {
                    delete agenda[name];
                } else {
                    alert(`El contacto ${name} no existe.`);
                }
                break;

            case "5":
                alert("Saliendo de la agenda.");
                return; // Termina el programa

            default:
                alert("Opción inválida. Elige una opción del 1 al 5.");
        }
    }
}

myAgenda();
