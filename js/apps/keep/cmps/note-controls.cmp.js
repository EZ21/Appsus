import { eventBus } from "../../../services/eventBus-service.js";

export default {
    props: ["note"],
    template: `
		<div class="note-controls ">
            <!-- del note  -->
    <i class="fas fa-trash-alt danger" title="Delete note" @click="removeNote(note.id)" ></i>
    <!-- <button>color</button> -->
    <!-- colors inpot -->
    <i class="fas fa-palette info colors dropdown" title="Change note color">
				<div class="dropdown-content">
					<template v-for="color in availableColors">
						<span :style="{'background-color': color.value}"
							:class="getBgColorClass(color.value)"
							@click="styleNote(color.value)"> &nbsp; </span>
					</template>
				</div>
			</i>
    <i class="fas fa-thumbtack"></i>
    <span> &nbsp; </span>
    <!-- clone  -->
    <i class="fas fa-clone"></i>
    <!-- update  -->
    <i class="fas fa-edit" @click="updateNote(note.id)" title="Update note" :class="{marked: note.isUpdating}"></i>
    
    <i class="fa-duotone fa-paper-plane"></i>

			
</div>
	`,

    methods: {
        removeNote(noteId) {
            //let noteId = "5";
            console.log(
                "In removeNote(noteId). noteId: ",
                noteId,
                "\n note: ",
                this.note
            );
            eventBus.emit("removeNote", noteId);
        },
        updateNote(noteId) {
            console.log(
                "updateNote(noteId). noteId: ",
                noteId,
                "\n note: ",
                this.note
            );
            eventBus.emit("evNoteUpdateService", noteId);
        },
        
        getBgColorClass(color) {
            // return this.note.styles.backgroundColor === color ? "selected" : "";
        },
        styleNote(newBgColor) {
            // eventBus.$emit(EVENT_NOTE_STYLED, this.note.id, newBgColor);
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
