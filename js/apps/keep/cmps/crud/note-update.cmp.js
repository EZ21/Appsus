import { eventBus } from "../../../../services/eventBus-service.js";
export default {
    props: ["note"],
    template: `
		<section class="notes-update">
   			<input type="txt" autocomplete="off" v-model="newData" />
			<button @click="saveUpdate(this.note, this.newData)">Update</button>

		</section>
	`,
    data() {
        return {
            newData: "",
        };
    },
    created() {
        this.newData = this.getNoteData();
    },
    methods: {
        getNoteData() {
            let strValue = "";
            switch (this.note.type) {
                case "txt":
                    strValue = this.note.info.txt;
                    break;
            }
            return strValue;
        },
        saveUpdate(newNote, userData) {
            eventBus.emit("evNoteUpdateOpenInput", this.note.id);
            eventBus.emit("evNoteUpdateDom", {
                note: newNote,
                data: userData,
            });
        },
    },
};
