import noteControls from "./note-controls.cmp.js";
import noteUpdate from "./crud/note-update.cmp.js";
import noteService from "../services/note.service.js";


export default {
    props: ["note"],
    template: `
    <section class="note-preview">
        <p><span>Note:</span> {{note.info.txt}}</p>
        <note-controls :note="note" :noteTypesInfo="note.isUpdating"></note-controls>
        <note-update :note="note"   ></note-update>
    
</section>
    `,
    components: {
        noteControls,
        noteUpdate,
    },
};

//v-if=" note.settings.editMode"
//v-if="noteService.note"