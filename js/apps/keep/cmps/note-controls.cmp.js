import { eventBus } from "../../../services/eventBus-service.js";

export default {
    props: ["note", "noteTypesInfo"],
    template: `
		<div class="note-item-actions flex space-between">
    <button title="Delete note" @click="removeNote" >Delate</button>
    <button>clone</button>
    <button>send email</button>
    <button>Edit</button>
    <button>color</button>
    <button>pin</button>

			
</div>
	`,

    methods: {
        removeNote() {
            eventBus.emit("removeNote", this.removeNote.id);
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
