import notesService from "../services/note.service.js";
import eventBus from "../services/eventBus-service.js";

export default {
    props: ["noteTypes"],
    template: `
    <section class="note-add">
   
    <input autocomplete="off" v-model="userData"
	    @keyup.enter="addNote"/>
    
    </section>   
    `,
    data() {
        return {
            newNote: notesService.emptyNote(),
            userData: "",
        };
    },
    computed: {},
    methods: {
        addNote() {
            console.log("==== ADD NOTE: ", this.userData);
        },
    },
};

// export default {
//     // props: ["noteTypes"],
//     template: `
//     <section class="note-add">
//     <input :type="fieldType" autocomplete="off" v-model="userData"
// 	    :placeholder="placeholder" @keyup.enter="addNote" ref="newNoteEl" />

//     </section>
//     `,
//     data() {
//         return {
//             newNote: notesService.emptyNote(),
//             userData: "",
//         };
//     },
//     computed: {},
//     methods: {
//         addNote() {
//             eventBus.emit(EVENT_NOTE_ADDED, this.newNote, this.userData);
//             this.newNote = notesService.emptyNote();
//             this.userData = "";
//         },
//     },
// };
