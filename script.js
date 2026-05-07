function addNote() {
    const noteInput = document.getElementById("noteInput");
    const notes = document.getElementById("notes");
    const inputValue = noteInput.value.trim();

    if (inputValue !== "") {
        const note = document.createElement("div");
        note.className = "note";
        note.textContent = inputValue;

        // Add a remove button
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.className = "remove-btn";
        removeButton.onclick = () => {
            notes.removeChild(noteContainer);
        };

        // Create a container for the note and button
        const noteContainer = document.createElement("div");
        noteContainer.className = "note-container";
        noteContainer.appendChild(note);
        noteContainer.appendChild(removeButton);

        if (inputValue.toLowerCase() === "/help") {
            const defaultResponse = document.createElement("div");
            defaultResponse.className = "note default-response";
            defaultResponse.textContent = "S3rv3r_S1d3_V@lid@ti0n_1s_B3st!";
            notes.appendChild(defaultResponse);
        }

        notes.appendChild(noteContainer);
        noteInput.value = "";
    } else {
        alert("Please enter a note.");
    }
}

function clearNotes() {
    const notes = document.getElementById("notes");
    notes.innerHTML = ""; // Clears all notes
}