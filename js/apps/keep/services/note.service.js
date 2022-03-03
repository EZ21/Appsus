import { storageService } from "../../../services/storage.service.js";
import { utilService } from "../../../services/util.service.js";


const STORAGE_KEY = "notesApp";

const notes = [
    {
        id: "n110",
        type: "note-txt",
        isPinned: true,
        info: { txt: " 110 Fullstack Me Baby!" },
    },
    {
        id: "n111",
        type: "note-txt",
        isPinned: true,
        info: { txt: "111 Fullstack Me Baby!" },
    },
    {
        id: "n112",
        type: "note-txt",
        isPinned: true,
        info: { txt: "112 Fullstack Me Baby!" },
    },
    {
        id: "n120",
        type: "note-img",
        info: { url: "http://some-img/me", title: "Bobi and Me" },
        style: { backgroundColor: "#00d" },
    },
    {
        id: "n130",
        type: "note-todos",
        info: {
            label: "Get my stuff together",
            todos: [
                { txt: "Driving liscence", doneAt: null },
                { txt: "Coding power", doneAt: 187111111 },
            ],
        },
    },
];

function saveNotes() {
    //storageService.postMany(STORAGE_KEY, notes);
    storageService.saveAll(STORAGE_KEY, notes);
}

function query() {
    return Promise.resolve(notes);
}

function getNoteById(id) {
    let note = notes.find((note) => note.id === id);
    return Promise.resolve(note);
}

function saveNote(note, data) {
    if (!note) Promise.reject();

    switch (note.settings.noteType) {
        case "text":
            note.data.text = data;
            break;
        case "image":
        case "video":
        case "audio":
            note.data.src = data;
            break;
        case "list":
            let listArr = data.split(",");
            note.data.list = listArr.map((item) => {
                return { text: item, completed: false };
            });
            break;

        // 	return Promise.reject();
    }

    // Save data
    if (note.id) {
        // Update existing note
        let noteIdx = notes.findIndex((currNote) => currNote.id === note.id);
        notes.splice(noteIdx, 1, note);
    } else {
        // Add new note
        note.id = utilService.makeId();
        notes.unshift(note);
    }

    saveNotes();
    return Promise.resolve(note);
}

function emptyNote() {
    return {
        id: utilService.makeId(),
        type: "note-txt",
        isPinned: false,
        info: { txt: " 110 Fullstack Me Baby!" },
        style: { backgroundColor: "" },
        data: {},
    };
}

export default {
    emptyNote,
    query,
    getNoteById,
    saveNote,
    saveNotes,
};
