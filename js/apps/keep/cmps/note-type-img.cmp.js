import noteControls from "./note-controls.cmp.js";
import noteUpdate from "./crud/note-update.cmp.js";

export default {
    props: ["note"],
    template: `
    <section class="note-preview note-type-image">
    <!-- test  -->
    <h4>{{note.info.title}}</h4>
    <img :src="note.info.url" alt="" />
     <note-controls :note="note"  ></note-controls>
        <note-update :note="note" v-if="note.isUpdating === true" > </note-update>
      
    
</section>
    `,

    components: {
        noteControls,
        noteUpdate,
    },
};
