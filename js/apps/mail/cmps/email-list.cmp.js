import emailPreview from "./email-preview.cmp.js";

export default {
  props: ["emails"],
  template: `
        <section class="email-list">
            <div v-for="email in emails" :key="email.id" :class="[email.isRead ? 'read' : '']" class="email-previews">
                <!-- :email is v-bind:email -->
                <!-- @click is v-on:click -->
                <email-preview :email="email" @click.native="select(email)" @star="toggleMarkedWithStar" @read="toggleEmailRead" @remove="remove(email)" class="email-preview"></email-preview>
            </div>
        </section>
    `,

  methods: {
    remove(email) {
      this.$emit("remove", email);
    },

    select(email) {
      this.$emit("selected", email);
    },

    toggleMarkedWithStar(email) {
      this.$emit("star", email);
    },

    toggleEmailRead(email) {
      this.$emit("read", email);
    },
  },

  components: {
    emailPreview,
  },
};