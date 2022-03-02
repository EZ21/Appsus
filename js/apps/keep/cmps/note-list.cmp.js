import notePreview from "./note-preview.cmp.js";

export default {
    props: ["notes"],
    template: `
     <section>
      <div v-if="notesToShow">
          <note-preview v-for="note in notesToShow" :key="note.id" :note="note">
                </note-preview>
            </div>

		</section>
`,
    data() {
        return {};
    },
    components: {
        notePreview,
    },
    computed: {
        notesToShow() {
            return this.notes;
        },
    },
};
