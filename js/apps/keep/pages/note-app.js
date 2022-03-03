import noteService from "../services/note.service.js";
import noteList from "../cmps/note-list.cmp.js";
import noteAdd from "../cmps/crud/note-add.cmp.js";

export default {
    template: `
        
        <section class="note-app app-main">
            <note-add> </note-add>
            <note-list :notes="notesToShow"></note-list> 
        </section>
    `,

    components: {
        noteList,
        noteAdd,
        // noteFilter,
    },
    data() {
        return {
            noteTypes: {
                txt: {
                    fieldType: "text",
                    icon: "📝",
                    placeholder: "add Text Note ",
                },
            },
            notes: [],
            filterBy: null,
        };
    },
    methods: {
        setFilter(filterBy) {
            this.filterBy = filterBy;
        },
    },

    created() {
        noteService.saveNotes();
        noteService.query().then((notes) => (this.notes = notes));
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
