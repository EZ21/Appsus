import notesService from "../../services/note.service.js";
import { eventBus } from "../../../../services/eventBus-service.js";

export default {
    props: ["noteTypes"],
    template: `
    
    <input autocomplete="off" v-model="userData"
	    @keyup.enter="addNote( this.newNote, this.userData)" ref="newNoteElement"/>

        <div class="note-add-icons">
            <template v-for="(noteType, idx) in noteTypes">
            <!-- <i setSelectedType(noteType, noteType.icon) @click="updateSelectedType(idx)" ></i> -->
            
        <p >{{setSelectedType(noteType, noteType.icon)}}</p>    
        </template>

            
        </div>
    
     
    `,
    //@click="updateSelectedType(idx)"
    data() {
        return {
            newNote: notesService.emptyNote(),
            userData: "",
        };
    },
    // created() {
    //     const noteTypesCon = this.noteTypes

    //         console.log("noteTypes", noteTypesCon);

    // },
    computed: {},

    methods: {
        create() {
            const fullName = `${this.last}, ${this.first}`;
            if (!this.names.includes(fullName)) {
                this.names.push(fullName);
                this.first = this.last = "";
            }
        },
        addNote(newNote, userData) {
            console.log(
                "1==== ADD NOTE: newNote",
                newNote,
                "\n || userData:",
                userData
            );
            // eventBus.$emit('evNoteAdd', this.userData)
            // eventBus.emit("evNoteAdd", this.newNote, this.userData);

            eventBus.emit("evNoteAdd", { note: newNote, data: userData });
            // this.$emit("noteAddUpdate", );
            // eventBus.emit("evNoteAdd", this.userData);
            this.newNote = notesService.emptyNote();
            this.userData = "";
        },
        setSelectedType(noteType, noteIcon) {
            // console.log(
            //     "setSelectedType(noteType, noteIcon)",
            //     noteType,
            //     "||||",
            //     noteIcon
            // );
            return this.newNote.type === noteType ? noteIcon : noteIcon;
        },
        updateSelectedType(noteType) {},
    },
};
