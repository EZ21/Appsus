import notesService from "../services/note.service.js";
export default {
    props: ["noteTypes"],
    template: `
    <section class="note-add">
    <input :type="fieldType" autocomplete="off" v-model="userData"
	    :placeholder="placeholder" @keyup.enter="addNote" ref="newNoteEl" />

    </section>   
    `,
    data() {
        return {
            
        }
    },
    computed: {
        
    },
    methods: {
        
    }
};
