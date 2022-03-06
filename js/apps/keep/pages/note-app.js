import noteService from "../services/note.service.js";
import noteList from "../cmps/note-list.cmp.js";
import noteAdd from "../cmps/crud/note-add.cmp.js";

import { storageService } from "../../../services/storage.service.js";

import { eventBus } from "../../../services/eventBus-service.js";

export default {
    template: `
    <div class="add-note-container">
        <note-add :noteTypes="noteTypes"> </note-add>
</div>       
        <section class="note-app app-main">
            <note-list :notes="notesToShow"></note-list> 
        </section>
    `,

    components: {
        noteList,
        noteAdd,
        noteService,
        // noteFilter,
    },
    data() {
        return {
            notes: [],
            noteTypes: {
                txt: {
                    fieldType: "text",
                    icon: "📝",
                    placeholder: "add Text Note ",
                },
                img: {
                    fieldType: "img",
                    icon: "🖼️",
                    // placeholder: "add Text Note ",
                },
                todos: {
                    fieldType: "todos",
                    icon: "📝",
                },
                vid: {
                    fieldType: "vid",
                    icon: "📝",
                },
            },
            filterBy: null,
        };
    },

    methods: {
        setFilter(filterBy) {
            this.filterBy = filterBy;
        },
        //STORAGE_KEY
        loadNotes() {
            storageService
                .query(noteService.STORAGE_KEY)
                .then((notes) => (this.notes = notes));
        },
        addNote({ note, data }) {
            console.log("addNote({ note, data })", { note, data });
            noteService.saveNote(note, data);
            this.loadNotes();
        },
        removeNote(noteId) {
            // console.log(noteId);
            noteService.removeNote(noteId).then(() => this.loadNotes());
            this.loadNotes();
        },
        updateNoteOpenInput(noteId) {
            noteService.updateNoteOpenInput(noteId);
            this.loadNotes();
        },
        updateTodosStatus({noteId, listIdx}) {
            console.log("app updateTodosStatus", noteId, listIdx);
            noteService.updateTodosStatus(noteId, listIdx);
            // this.loadNotes();

        },
    },

    created() {
        if (this.notes.length <= 0) {
            noteService.saveNotes();
            this.loadNotes();
        }

        // event bus emits

        //event bus listeners
        eventBus.on("evNoteAdd", ({ note, data }) =>
            this.addNote({ note, data })
        );
        //
        eventBus.on("removeNote", (noteId) => this.removeNote(noteId));
        eventBus.on("evNoteUpdateOpenInput", (noteId) =>
            this.updateNoteOpenInput(noteId)
        );
        eventBus.on("evNoteUpdateDom", (note, data) =>
            this.addNote(note, data)
        );
        eventBus.on("evTodosStatus", ({ noteId, listIdx }) =>
            this.updateTodosStatus({ noteId, listIdx })
        );

        //
        // this.loadNotes();
    },
    computed: {
        notesToShow() {
            if (!this.filterBy) return this.notes;
            const regex = new RegExp(this.filterBy.title, "i");
            return this.notes.filter(
                (book) => regex.test(note.title)
                // &&
                // this.filterBy.price > book.listPrice.amount
            );
        },
    },
};
