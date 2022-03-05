export default {
  props: ["email"],
  template: `
        <section class="email-preview">

            <span @click.stop="toggleMarkedWithStar(email)" :class="{star: isStar}"><i class="fa-solid fa-star"></i></span><!-- star -->

            <span class="email-prev-to">{{ email.to }}</span>

            <span class="subject">{{ email.subject }}</span>

            <span class="email-content">{{ email.body }}</span>

            <span class="email-date">{{ emailDateFormat(email) }}</span>

            <div class="email-btns">
              <span class="email-btn" @click.stop="toggleEmailRead(email)"><i class="fa-solid fa-envelope" v-if="!email.isRead"></i><i class="fa-solid fa-envelope-open" v-if="email.isRead"></i></span><!-- unread mail -->
              <span class="email-btn" @click.stop="deleteEmail(email.id)"><i class="fa-solid fa-trash"></i></span><!-- delete mail -->
            </div>
        </section>
    `,

  data() {
    return {
      isStar: this.email.isStar,
    };
  },

  methods: {
    toggleMarkedWithStar(email) {
      this.isStar = !this.isStar;
      this.$emit("star", email);
    },

    emailDateFormat(email) {
      const date = new Date(email.sentAt).toLocaleString();
      return date;
    },

    toggleEmailRead(email) {
      this.$emit("read", email);
    },

    deleteEmail(emailId) {
      this.$emit("remove", emailId);
    },
  },

  computed: {
    isRead() {
      return this.email.isRead ? "unread" : "read";
    },
  },
};