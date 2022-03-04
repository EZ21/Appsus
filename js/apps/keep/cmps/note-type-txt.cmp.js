
import noteControls from "./note-controls.cmp.js";

export default {
    props: ["note"],
    template: `
    <section class="note-preview">
        <p><span>Note:</span> {{note.info.txt}}</p>
        <note-controls></note-controls>
    
</section>
    `,
    components: {
        noteControls,
    },
};