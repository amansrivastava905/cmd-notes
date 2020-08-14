const fs = require("fs");


const getNotes = function () {
    return "welcome to cmd notes...";
}




const addNote = function (title, body) {
    const notes = loadNotes();
    const duplicateNotes = notes.filter(function (note) {
        return note.title === title;
    });

    if (duplicateNotes.length === 0) {
        notes.push({
            title: title,
            body: body
        });
        saveNotes(notes);
        console.log("A new note added");
    } else {
        console.log("note title taken, use some other title")
    }
}

const saveNotes = function (notes) {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync("notes.json", dataJSON);
}

const loadNotes = function () {

    try {
        const dataBuffer = fs.readFileSync("notes.json");
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }

}


const removeNote = function(title) {
    const notes = loadNotes();
    const reqNotes= notes.filter(function(note){
        if(note.title!=title)
        {
            return {
                title:note.title,
                body:note.body
            };
        }
    });
    saveNotes(reqNotes);
    if(reqNotes.length===notes.length)
    {
        console.log("No such note existed.");
    }
    else{
        console.log("requested note deleted");
    }
}

const listNotes= function (){
    const notes = loadNotes();
    console.log("The notes You Created till now......");
    console.log("to view details, use cmd --read='title'");
    notes.forEach(function(note){
        console.log(note.title);
    });
}

const readNote= function (title){
    const notes=loadNotes();
    console.log("****"+title+"***");
    const reqNote=notes.filter(function(note){
        if(note.title===title)
        {
            return note;
        }
    });

    if(reqNote.length===0)
    {
        console.log("no such note exist. Maybe its been deleted or some error occured in writing like body field may be empty string");
    }
    else{
        console.log(reqNote[0].body);
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote:removeNote,
    listNotes:listNotes,
    readNote:readNote
};