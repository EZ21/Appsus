import notesService from "../../services/note.service.js";
import { eventBus } from "../../../../services/eventBus-service.js";

export default {
    props: ["noteTypes"],
    template: `
    
    <input autocomplete="off" v-model="userData"
	    @keyup.enter="addNote" ref="newNoteEl"/>

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
        addNote() {
            console.log(
                "1==== ADD NOTE: newNote",
                this.newNote,
                "\n || userData:",
                this.userData
            );
            // eventBus.$emit('evNoteAdd', this.userData)
            eventBus.emit("evNoteAdd", this.newNote, this.userData);
            // eventBus.emit("evNoteAdd", newNote, userData);

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
