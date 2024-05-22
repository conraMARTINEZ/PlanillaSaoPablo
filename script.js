document.getElementById("addButton").addEventListener("click", function() {
    const nameInput = document.getElementById("name");
    const amountInput = document.getElementById("amount");

    const name = nameInput.value;
    const amount = amountInput.value;

    if (name && amount) {
        const entryDiv = document.createElement("div");
        entryDiv.classList.add("entry");

        const entryText = document.createElement("span");
        entryText.textContent = `${name} - $${amount}`;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Eliminar";
        deleteButton.addEventListener("click", function() {
            entryDiv.remove();
        });

        const editButton = document.createElement("button");
        editButton.textContent = "Editar";
        editButton.classList.add("edit-button");
        editButton.addEventListener("click", function() {
            const newName = prompt("Nuevo nombre:", name);
            const newAmount = prompt("Nuevo importe:", amount);
            if (newName && newAmount) {
                entryText.textContent = `${newName} - $${newAmount}`;
            } else {
                alert("Por favor llena todos los campos.");
            }
        });

        entryDiv.appendChild(entryText);
        entryDiv.appendChild(editButton);
        entryDiv.appendChild(deleteButton);

        document.getElementById("entries").appendChild(entryDiv);

        nameInput.value = "";
        amountInput.value = "";
    } else {
        alert("Por favor llena todos los campos.");
    }
});

document.getElementById("addDateButton").addEventListener("click", function() {
    const dateInput = document.getElementById("date");
    const date = dateInput.value;

    if (date) {
        const entryDiv = document.createElement("div");
        entryDiv.classList.add("entry");

        const entryText = document.createElement("span");
        entryText.textContent = `Fecha: ${date}`;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Eliminar";
        deleteButton.addEventListener("click", function() {
            entryDiv.remove();
        });

        entryDiv.appendChild(entryText);
        entryDiv.appendChild(deleteButton);

        document.getElementById("entries").appendChild(entryDiv);

        dateInput.value = "";
    } else {
        alert("Por favor selecciona una fecha.");
    }
});

document.getElementById("generatePDFButton").addEventListener("click", function() {
    const { jsPDF } = window.jspdf;
    const entries = document.querySelectorAll(".entry span");
    const doc = new jsPDF();

    entries.forEach((entry, index) => {
        doc.text(entry.textContent, 10, 10 + (10 * index));
    });

    doc.save('reporte.pdf');
});
