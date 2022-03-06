import noteText from "./note-type-txt.cmp.js";
import noteTodos from "./note-type-todo.cmp.js";

//?
import noteService from "../services/note.service.js";

export default {
    props: ["note"],
    template: `
        <component :is="note.type" :note="note"></component>
        
    `,
    // data() {
    //     return { cmp: "noteText" };
    // },
    components: {
        txt: noteText,
        todos: noteTodos,
        img: noteText,
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
