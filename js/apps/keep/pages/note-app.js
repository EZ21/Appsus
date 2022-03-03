import noteService from "../services/note.service.js";
import noteList from "../cmps/note-list.cmp.js";
import noteAdd from "../cmps/crud/note-add.cmp.js";
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
                    placeholder: "add Text Note ",
                },
            },
            filterBy: null,
        };
    },
    methods: {
        setFilter(filterBy) {
            this.filterBy = filterBy;
        },
        addNote({ note, data }) {
            console.log("methods: addNote(note, data)", note, "\n data", data);
            noteService.saveNote(note, data);
        },
    },

    created() {
        noteService.query().then((notes) => (this.notes = notes));
        eventBus.on("evNoteAdd", ({ note, data }) => this.addNote({ note, data }));
        
        // eventBus.on("evNoteAdd", busTest(note, data));
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


function busTest(note, data) {
    this.addNote(note, data);
}