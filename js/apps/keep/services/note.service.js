import { storageService } from "../../../services/storage.service.js";
import { utilService } from "../../../services/util.service.js";

const STORAGE_KEY = "notesApp";

const notes = [
    {
        id: "n110",
        type: "txt",
        isUpdating: false,
        isPinned: true,
        info: { txt: " 110 Fullstack Me Baby!" },
    },
    {
        id: "n111",
        type: "txt",
        isUpdating: false,
        isPinned: true,
        info: { txt: "111 Fullstack Me Baby!" },
    },
    {
        id: "n112",
        type: "txt",
        isUpdating: false,
        isPinned: true,
        info: { txt: "112 Fullstack Me Baby!" },
    },
    {
        id: "n120",
        type: "img",
        isUpdating: false,
        info: {
            url: "https://cdn.pixabay.com/photo/2016/01/16/17/43/contact-us-1143659_960_720.jpg",
            title: "Bobi and Me",
        },
        style: { backgroundColor: "#00d" },
    },
    {
        id: "n130",
        type: "todos",
        isUpdating: false,
        info: {
            label: "Get my stuff together",
            todos: [
                { txt: "Driving liscence", doneAt: null, isDone: false },
                { txt: "Coding power", doneAt: 187111111, isDone: false },
            ],
        },
    },
    {
        id: "n140",
        type: "vid",
        isUpdating: false,
        info: {
            url:
                "//www.youtube.com/embed/" +
                _youtube_parser(
                    "https://www.youtube.com/watch?v=1yaegczSeGw&list=RD1yaegczSeGw&start_radio=1"
                ),
            title: "Bobi and Me",
        },
        style: { backgroundColor: "#00d" },
    },
];

function saveNotes() {
    // storageService.postMany(STORAGE_KEY, notes);
    console.log("saveNotes", STORAGE_KEY, notes);
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
    console.log("saveNote(note, data)", note, "|||", data);
    if (!note) Promise.reject();
    // console.log("2saveNote note.type", note.type);

    switch (note.type) {
        case "txt":
            console.log("switch (note.type) =  txt");
            note.info.txt = data;
            break;
        case "img":
            note.info.url = data;
        case "vid":
            note.info.url = data;
        // case "audio":
        //     note.data.url = data;
        //     break;
        case "todos":
            let todosArray = data.split(",");
            note.data.todos = todosArray.map((item) => {
                return { text: item, completed: false };
            });
            break;

        // return Promise.reject();
    }

    // Save data
    if (note.id !== "StartID") {
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
        id: "StartID",
        type: "txt",
        isUpdating: false,
        isPinned: false,
        info: { txt: "starter note" },
        style: { backgroundColor: "" },
        data: {},
    };
}
function removeNote(id) {
    return new Promise((resolve, reject) => {
        let noteIdx = notes.findIndex((note) => note.id === id);
        notes.splice(noteIdx, 1);
        saveNotes();
        resolve();
    });
}

function updateNoteOpenInput(id) {
    return getNoteById(id).then((note) => {
        note.isUpdating = !note.isUpdating;
        saveNotes();
    });
}
function updateTodosStatus(id, listIdx) {
    return getNoteById(id).then((note) => {
        // note.info.todos[listIdx].isDone = !note.info.todos[listIdx].isDone;
        console.log("updateTodosStatus id :", id, "listIdx:", listIdx);
        // saveNotes();
    });
}
function _youtube_parser(url) {
    var regExp =
        /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return match && match[7].length == 11 ? match[7] : false;
}

export default {
    emptyNote,
    query,
    getNoteById,
    saveNote,
    saveNotes,
    removeNote,
    updateNoteOpenInput,
    STORAGE_KEY,
    updateTodosStatus,
};
