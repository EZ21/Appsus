import noteText from "./note-type-txt.cmp.js";
import noteTodos from "./note-type-todo.cmp.js";
import noteImg from "./note-type-img.cmp.js";
import noteVid from "./note-type-video.js";



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
        img: noteImg,
        vid: noteVid,
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
