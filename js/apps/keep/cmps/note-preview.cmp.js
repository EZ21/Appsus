import noteText from "./note-type-txt.cmp.js";
import noteService from "../services/note.service.js";

export default {
    props: ["note"],
    template: `
        <component :is="cmp" :note="note"></component>
    `,
    data() {
        return { cmp: "notetext" };
    },
    components: {
        notetext: noteText,
    },
    computed: {
        pinnedNotesToShow() {
            return;
            //
        },
        notesToShow() {
            return;
            //
        },
    },
};
