let titleArray = [] // titel array
let noteArray = []   // notizen array
let deletedTitlesArray = [] // gelöschte notizen array
let deletedNotesArray = [] 

function initArrays() {
    if (JSON.parse(localStorage.getItem('titleArray')) == null){
        localStorage.setItem('titleArray', JSON.stringify(titleArray))
        localStorage.setItem('noteArray', JSON.stringify(noteArray))
        localStorage.setItem('deletedTitlesArray', JSON.stringify(deletedTitlesArray))
        localStorage.setItem('deletedNotesArray', JSON.stringify(deletedNotesArray))
    } else {
        loadNotes()
        loadDeletedNotes()
    }
}

function addNote() {   //name der addNote funktion
    let title = document.getElementById('note-title'); // variable des titel inputs
    let note = document.getElementById('note-content'); // variable des note inputs

    if(title.value == `` && note.value == ``){
        alert('Deine Notiz hat noch keinen Titel und auch keinen Inhalt :D');
    } else if (title.value == ``) {
        alert('Deine Notiz hat noch keinen Titel :D');
    } else if (note.value == ``) {
        alert('Deine Notiz hat noch keinen Inhalt :D');
    } else{

        titleArray.push(title.value); // titleinput value wird in das titleArray geschoben
        noteArray.push(note.value); // noteinput wird ind das noteArray geschoben
        save(); 
        title.value = ``;
        note.value = ``;
    }
}

function addDeletedNote(i) { // gibt an mit wlecher stelle des arrays die funktion geöffnet wird
    let deletedTitel = titleArray[i] // speichert die ausgewählte titel in einer variable
    let deletedNote = noteArray[i] // speichert die ausgewählte note in einer variable

     saveDeletedNotes();
     deletedTitlesArray.push(deletedTitel); // fügt die variable dem deleted titel array hinzu
     deletedNotesArray.push(deletedNote); // fügt die note variable dem deleted note array hinzu
     saveDeletedNotes();

    deleteNote(i);

    loadDeletedNotes();
}

function save() {
    localStorage.setItem('titleArray', JSON.stringify(titleArray));
    localStorage.setItem('noteArray', JSON.stringify(noteArray));
    loadNotes();
}

function saveDeletedNotes() {
    localStorage.setItem('deletedTitlesArray', JSON.stringify(deletedTitlesArray));
    localStorage.setItem('deletedNotesArray', JSON.stringify(deletedNotesArray));
}

function newNote() {
    let title = document.getElementById('note-title');
    let note = document.getElementById('note-content');
    currentNote();
    title.value = ``;
    note.value = ``;
}

function showBoard() {
    let board = document.getElementById('note-board'); //variable für das notizen board
    let deletedNotesBoard = document.getElementById('deleted-notes-board');

    if (deletedNotesBoard.classList.contains('slideIn')) {
        deletedNotesBoard.classList.remove('slideIn');
        deletedNotesBoard.classList.add('slideOut');
    }

    board.classList.remove('slideOut');
    board.classList.add('slideIn');
    selectRubrik('notizboard-button');
}

function showDeletedNotesBoard() {
    let board = document.getElementById('deleted-notes-board'); //variable für das notizen board

    loadDeletedNotes()
    board.classList.remove('slideOut');
    board.classList.add('slideIn');
    selectRubrik('geloeschte-notiz-button');
}

function showMenuMobile() {
    let menuMobile = document.getElementById('mobile-menu-div'); //variable für das notizen board

    if(menuMobile.classList.contains('slideInMobile')){
        menuMobile.classList.remove('slideInMobile');
        menuMobile.classList.add('slideOutMobile');
    } else{
        menuMobile.classList.remove('slideOutMobile');
        menuMobile.classList.add('slideInMobile');
    }

}

function currentNote() {
    let board = document.getElementById('note-board');
    let deletedNotesBoard = document.getElementById('deleted-notes-board');

    board.classList.remove('slidIn');
    board.classList.add('slideOut');
    deletedNotesBoard.classList.remove('slideIn');
    deletedNotesBoard.classList.add('slideOut');
    selectRubrik('aktuelle-notiz-button');
}

function selectRubrik(p) {
    let boardButton = document.getElementById('notizboard-button');
    let aktuelleNotizButton = document.getElementById('aktuelle-notiz-button');
    let geloeschteNotizButton = document.getElementById('geloeschte-notiz-button');

    if(p === 'notizboard-button') {
        aktuelleNotizButton.classList.remove('selected-rubrik');
        geloeschteNotizButton.classList.remove('selected-rubrik');
        boardButton.classList.add('selected-rubrik');
    } else if(p === 'aktuelle-notiz-button'){
        boardButton.classList.remove('selected-rubrik');
        geloeschteNotizButton.classList.remove('selected-rubrik');
        aktuelleNotizButton.classList.add('selected-rubrik');
    } else if(p === 'geloeschte-notiz-button') {
        aktuelleNotizButton.classList.remove('selected-rubrik');
        boardButton.classList.remove('selected-rubrik');
        geloeschteNotizButton.classList.add('selected-rubrik');
    }
}

function editNote(i) {
    let title = document.getElementById('note-title');
    let note = document.getElementById('note-content');

    title.value = `${titleArray[i]}`;
    note.value = `${noteArray[i]}`;
    currentNote();
}

function editDeletedNote(i) {
    let title = document.getElementById('note-title');
    let note = document.getElementById('note-content');

    title.value = `${deletedTitlesArray[i]}`
    note.value = `${deletedNotesArray[i]}`
    currentNote()
}

function deleteNote(i) { 
    titleArray.splice(i, 1);
    noteArray.splice(i, 1);
    save(); 
    loadNotes();
}

function deleteDeletedNote(i) {
    deletedTitlesArray.splice(i, 1);
    deletedNotesArray.splice(i, 1);
    saveDeletedNotes();
    loadDeletedNotes();
}

function loadNotes() {
    titleArray = JSON.parse(localStorage.getItem('titleArray'));
    noteArray = JSON.parse(localStorage.getItem('noteArray'));
    let board = document.getElementById('note-board');
    board.innerHTML = ''

    if (localStorage.getItem('titleArray') === null) {
        board.innerHTML = `Keine gespeicherten Notizen vorhanden.`
    } else {
        for (i = 0; i < titleArray.length; i++) {
            board.innerHTML +=
        `           
            <div id="mini-note-div" class="miniNote-div z-index1">
                <div onClick="editNote(${i})" class="miniNote-title"><h3>${titleArray[i]}</h3></div>
                <div onClick="editNote(${i})" class="miniNote-content fill-height">${noteArray[i]}</div>
            </div>
            <div onclick="addDeletedNote(${i})" class="trashcan-div">
            </div>
        `;
        }
    }
}

function loadDeletedNotes() {
    deletedTitlesArray = JSON.parse(localStorage.getItem('deletedTitlesArray'));
    deletedNotesArray = JSON.parse(localStorage.getItem('deletedNotesArray'));
    let board = document.getElementById('deleted-notes-board');
    
    board.innerHTML = ''

    if (localStorage.getItem("deletedTitlesArray") === null) {
        board.innerHTML = `Keine Gelöschten Notizen vorhanden.`
    } else {
        for (i = 0; i < deletedTitlesArray.length; i++) {
            board.innerHTML +=
        `           
            <div id="mini-note-div" class="miniNote-div z-index1">
                <div onClick="editDeletedNote(${i})" class="miniNote-title"><h3>${deletedTitlesArray[i]}</h3></div>
                <div onClick="editDeletedNote(${i})" class="miniNote-content fill-height">${deletedNotesArray[i]}</div>
            </div>
            <div onclick="deleteDeletedNote(${i})" class="deletecan-div">
            </div>
        `;
        }
    }
}