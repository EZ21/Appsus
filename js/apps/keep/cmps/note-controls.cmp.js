import { eventBus } from "../../../services/eventBus-service.js";

export default {
    props: ["note", "noteTypesInfo"],
    template: `
		<div class="note-item-actions flex space-between">
    <button title="Delete note" @click="removeNote(note.id)" >Delate</button>
    <button>color</button>
    <button>pin</button>
    <button>Edit</button>
    <button>clone</button>
    <button>send email</button>

			
</div>
	`,

    methods: {
        removeNote(noteId) {
            //let noteId = "5";
            console.log("In removeNote(noteId). noteId: ", noteId, "\n note: ", this.note);
            eventBus.emit("removeNote", noteId);
        },
    },
    data() {
        return {
            availableColors: [
                { value: "#ffffff", name: "white" },
                { value: "#ff8888", name: "red" },
                { value: "#ffcc88", name: "orange" },
                { value: "#ffff88", name: "yellow" },
                { value: "#ccff99", name: "green" },
                { value: "#aaffee", name: "turquoise" },
                { value: "#88ddff", name: "sky" },
                { value: "#88bbff", name: "blue" },
                { value: "#ddbbff", name: "purple" },
                { value: "#dddddd", name: "grey" },
            ],
        };
    },
};
