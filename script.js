const MAX_VISIBLE_ENTRIES = 5;
let allEntries = [];
let showingAll = false;

document.getElementById("addButton").addEventListener("click", function() {
    const nameInput = document.getElementById("name");
    const amountInput = document.getElementById("amount");

    const name = nameInput.value;
    const amount = amountInput.value;

    if (name && amount) {
        addEntry(`${name} - $${amount}`);

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

        dateInput.value = "";
    } else {
        alert("Por favor selecciona una fecha.");
    }
});

document.getElementById("generatePDFButton").addEventListener("click", function() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    allEntries.forEach((entry, index) => {
        doc.text(entry.textContent, 10, 10 + (10 * index));
    });

    doc.save('reporte.pdf');
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
        allEntries = allEntries.filter(e => e !== entryDiv);
        entryDiv.remove();
        updateEntries();
    });

    const editButton = document.createElement("button");
    editButton.textContent = "Editar";
    editButton.classList.add("edit-button");
    editButton.addEventListener("click", function() {
        const newName = prompt("Nuevo nombre o fecha:", text.split(" - $")[0]);
        const newAmount = text.includes("- $") ? prompt("Nuevo importe:", text.split(" - $")[1]) : null;
        if (newName && (newAmount || newAmount === null)) {
            entryText.textContent = newAmount ? `${newName} - $${newAmount}` : `Fecha: ${newName}`;
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
