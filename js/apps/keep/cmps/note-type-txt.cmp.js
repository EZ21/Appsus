import noteControls from "./note-controls.cmp.js";
import noteUpdate from "./crud/note-update.cmp.js";


export default {
    props: ["note"],
    template: `
    <section class="note-preview">
        <p :note="note"  >{{note.id }} {{note.isUpdating}}</p>
        <p><span >Note:</span> {{note.info.txt}}</p>
        
        <note-controls :note="note"  ></note-controls>
        <note-update :note="note" v-if="note.isUpdating === true" > </note-update>
      
    
</section>
    `,

    components: {
        noteControls,
        noteUpdate,
    },
};

//v-if=" note.settings.editMode"
//v-if="noteService.note"
//{{note.isUpdating}}
//v-if=" note.isUpdating"
//<p>test</p>
// v-if="note.isUpdating === true"