import noteControls from "./note-controls.cmp.js";
import noteUpdate from "./crud/note-update.cmp.js";

export default {
    props: ["note"],
    template: `
    <section class="note-preview note-type-video">
        <h4>{{this.note.info.title}}</h4>
        <iframe
        title="this.note.info.title"
        width="100%"
        height="100%"
        :src="this.note.info.url"
        frameborder="0"
        allowfullscreen
        >
    </iframe>
    <note-controls :note="note"  ></note-controls>
 <note-update :note="note" v-if="note.isUpdating === true" > </note-update>
    
</section>
    `,

    components: {
        noteControls,
        noteUpdate,
    },
};
