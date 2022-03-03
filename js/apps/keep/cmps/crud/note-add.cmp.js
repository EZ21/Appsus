import notesService from "../../services/note.service.js";
// import ;

export default {
    props: ["noteTypes"],
    template: `
    <section class="note-add">
   
    <input autocomplete="off" v-model="userData"
	    @keyup.enter="addNote"/>
        <div class="note-add-icons">
            <!-- <template v-for="(noteType, idx) in noteTypes"> -->
            <!-- <i :class="setSelectedType(idx, noteType.icon)"@click="updateSelectedType(idx)"></i> -->
            <!-- </template> -->

            
        </div>
    
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
        setSelectedType(noteType, noteIcon) {
            return this.newNote.settings.noteType === noteType
                ? noteIcon + " fa-lg selected"
                : noteIcon + " fa-lg";
        },
        updateSelectedType(noteType) {
            // this.newNote.settings.noteType = noteType;
            // this.$refs.newNoteEl.focus();
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
