const fs = require('fs');

// add note
const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find((note) => note.title === title);

    if(!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes);
        console.log("New note added!")
    }else {
        console.log('Note title taken!')
    }
}


// remove note
const removeNote = (title) => {
    const notes = loadNotes();
    const notesToKeep = notes.filter((note) => note.title !== title);

    if(notes.length > notesToKeep.length) {
        console.log("note removed");
        saveNotes(notesToKeep)
    }else {
        console.log("No note found !")
    }

}

// list note
const listNotes = () => {
    const notes = loadNotes();
    console.log("Your notes");

    notes.forEach((note) => {
        console.log(note);
    })
}

// read note 
const readNote = (title) => {
    const notes = loadNotes();
    const note = notes.find((note) => note.title === title);

    if(note) {
        console.log(note);
    }else {
        console.log('Note not found!');
    }
}

// save notes
const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}


// load notes
const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    }catch(e){
        return [];
    }
}

module.exports = {
    addNote,
    removeNote,
    listNotes,
    readNote
}
