
// <email-folder-list>: Allow filtering by different folders: inbox / sent / trash/ draft
export default {
  props: ["isDisplayed"],

  template: `
    <section class="folder-list">
      <button @click="composeNewEmail" class="compose-email-btn">Compose</button>

      <nav class="folder-list-nav" :class="{ displayNav:isDisplayed }">
        <ul>
          <li @click="displayBy('inbox')">Inbox</li>
          <li @click="displayBy('star')">Starred</li>
          <li @click="displayBy('sent')">Sent</li>
          <li @click="displayBy('draft')">Drafts</li>
          <li @click="displayBy('trash')">Trash</li>
        </ul>
      </nav>
    </section>
  `,

  methods: {
    composeNewEmail() {
      this.$emit("compose");
    },

    filter() {
      this.$emit("filtered", { ...this.filterBy });
    },

    onSort() {
      this.$emit("sorted", this.sort);
    },

    displayBy(folder) {
      this.$emit("display", folder);
      this.$emit("hide");
    },
  },
};