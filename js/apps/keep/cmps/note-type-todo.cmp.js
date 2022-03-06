import noteControls from "./note-controls.cmp.js";
import noteUpdate from "./crud/note-update.cmp.js";
import { eventBus } from "../../../services/eventBus-service.js";


export default {
    props: ["note"],
    template: `
		<section class="note-preview note-type-todo">

            <h2>{{note.info.label}}</h2>
			<ul>
				<li v-for="(todoItem, idx) in note.info.todos"
                :class="statusClass(todoItem.completed)"
					@click="updateStatus(this.note.id,idx)">    
                {{todoItem.txt}}

					
				</li>
			</ul>

			

		</section>
	`,

    components: {
        noteControls,
        noteUpdate,
    },
    methods: {
        statusClass(status) {
            return status ? "completed" : "";
        },
        updateStatus(id, listIdx) {
            eventBus.emit("evTodosStatus", {
                id,
                listIdx,
            });
            // console.log("change status", id, listIdx);
        },
    },
};


//:class="{marked: note.settings.marked}"
			// :style="{'background-color': note.styles.backgroundColor }"