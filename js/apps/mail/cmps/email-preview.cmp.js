export default {
  props: ["email"],
  template: `
        <section class="email-preview">

            <span @click.stop="toggleMarkedWithStar(email)" :class="{star: isStar}"><i class="fa-solid fa-star"></i></span><!-- star -->

            <span class="email-prev-to">{{ email.to }}</span>

            <span class="subject">{{ email.subject }}</span>

            <span class="email-content">{{ email.body }}</span>

            <span class="email-date">{{ emailDateFormat(email) }}</span>

            <ul class="email-btns">
              <li><span @click.stop="toggleMarkedWithStar(email)" :class="{star: isStar}"><i class="fa-solid fa-star"></i></span></li><!-- star -->

              <li><span @click.stop="toggleEmailRead(email)"><i class="fa-solid fa-envelope" v-if="!email.isRead"></i><i class="fa-solid fa-envelope-open" v-if="email.isRead"></i></span></li><!-- unread mail -->

              <li><span @click.stop="deleteEmail(email.id)"><i class="fa-solid fa-trash"></i></span></li><!-- delete mail -->
            </ul>
        </section>
    `,

  data() {
    // return {
    //   isActive: this.email.isStar,
    // };
    return {
      isStar: this.email.isStar,
    };
  },

  methods: {
    toggleMarkedWithStar(email) {
      // this.isActive = !this.isActive;
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