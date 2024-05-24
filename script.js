let notes = [];
function NotesLocalStorage(){
    let savedNotes = localStorage.getItem('notes');
    if (savedNotes){
        notes = JSON.parse(savedNotes);
        displayNotes();
    }
}
NotesLocalStorage();

function addNote(){
    let noteInput = document.getElementById('noteInput');
    let noteText = noteInput.value.trim();
    if (noteText !== ''){
        let note ={
            id: Date.now(),
            text: noteText
        };
        notes.push(note);
        localStorage.setItem('notes', JSON.stringify(notes));
        displayNotes();
        noteInput.value = '';
    }
    else{
        alert('Please enter a note.');
    }
}

function displayNotes(){
    let notesContainer = document.getElementById('notesContainer');
    notesContainer.innerHTML = '';
    for (let note of notes){
        let noteElement = document.createElement('div');
        noteElement.classList.add('note');
        noteElement.innerHTML = `
            <p>${note.text}</p>
            <div class="time">${getTime()}</div>
            <button onclick="deleteNote(${note.id})">Delete</button>
        `;
        notesContainer.appendChild(noteElement);
    }
}

function deleteNote(id){
    notes = notes.filter(note => note.id !== id);
    localStorage.setItem('notes', JSON.stringify(notes));
    displayNotes();
}

function getTime(){
    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let hour = hours.toString().padStart(2, '0');
    let minute = minutes.toString().padStart(2, '0');
    return `${hour}:${minute}`;
}
