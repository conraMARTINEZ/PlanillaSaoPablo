const MAX_VISIBLE_ENTRIES = 3;
let allEntries = [];
let showingAll = false;
let totalAmount = 0;
let pdfFileName = "reporte";

document.getElementById("addButton").addEventListener("click", function() {
    const nameInput = document.getElementById("name");
    const amountInput = document.getElementById("amount");

    const name = nameInput.value;
    const amount = parseFloat(amountInput.value);

    if (name && !isNaN(amount)) {
        addEntry(`${name} - $${amount}`);
        updateTotalAmount(amount);

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
        addEntry(`Fecha: ${date}`);
        pdfFileName = date;  // Actualizamos el nombre del archivo PDF con la fecha ingresada
        dateInput.value = "";
    } else {
        alert("Por favor selecciona una fecha.");
    }
});

document.getElementById("generatePDFButton").addEventListener("click", function() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    let lineHeight = 10;
    allEntries.forEach((entry, index) => {
        const entryText = entry.querySelector('span').textContent;
        if (!entryText.startsWith('Fecha:')) {
            doc.text(entryText, 10, lineHeight);
            lineHeight += 10;
        }
    });

    doc.save(`${pdfFileName}.pdf`);
});

document.getElementById("toggleButton").addEventListener("click", function() {
    showingAll = !showingAll;
    updateEntries();
    this.textContent = showingAll ? "Ocultar" : "Mostrar más";
});

function addEntry(text) {
    const entryDiv = document.createElement("div");
    entryDiv.classList.add("entry");

    const entryText = document.createElement("span");
    entryText.textContent = text;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Eliminar";
    deleteButton.addEventListener("click", function() {
        const amountToRemove = parseFloat(entryText.textContent.split("$")[1]);
        if (!isNaN(amountToRemove)) {
            updateTotalAmount(-amountToRemove);
        }
        allEntries = allEntries.filter(e => e !== entryDiv);
        entryDiv.remove();
        updateEntries();
    });

    const editButton = document.createElement("button");
    editButton.textContent = "Editar";
    editButton.classList.add("edit-button");
    editButton.addEventListener("click", function() {
        const currentText = entryText.textContent;
        const newNameOrDate = prompt("Nuevo nombre o fecha:", currentText.split(" - $")[0]);
        const newAmount = currentText.includes("- $") ? prompt("Nuevo importe:", currentText.split(" - $")[1]) : null;
        if (newNameOrDate && (newAmount || newAmount === null)) {
            if (newAmount) {
                const oldAmount = parseFloat(currentText.split(" - $")[1]);
                updateTotalAmount(parseFloat(newAmount) - oldAmount);
                entryText.textContent = `${newNameOrDate} - $${newAmount}`;
            } else {
                entryText.textContent = `Fecha: ${newNameOrDate}`;
                pdfFileName = newNameOrDate; // Actualizamos el nombre del archivo PDF si se edita la fecha
            }
        } else {
            alert("Por favor llena todos los campos.");
        }
    });

    entryDiv.appendChild(entryText);
    entryDiv.appendChild(editButton);
    entryDiv.appendChild(deleteButton);

    allEntries.push(entryDiv);
    updateEntries();
}

function updateEntries() {
    const entriesDiv = document.getElementById("entries");
    entriesDiv.innerHTML = "";
    allEntries.forEach((entry, index) => {
        if (showingAll || index < MAX_VISIBLE_ENTRIES) {
            entry.classList.remove("hidden");
        } else {
            entry.classList.add("hidden");
        }
        entriesDiv.appendChild(entry);
    });
    document.getElementById("toggleButton").style.display = allEntries.length > MAX_VISIBLE_ENTRIES ? "block" : "none";
}

function updateTotalAmount(amount) {
    totalAmount += amount;
    document.getElementById("totalAmount").textContent = totalAmount.toFixed(2);
}
