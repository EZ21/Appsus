export default {
  props: ["email"],
  template: `
        <section class="email-preview">
            <span class="email-prev-to">{{ email.to }}</span>
            <span class="subject">{{ email.subject }}</span>
            <div class="email-prev-content">
            </div>
        </section>
    `,

  data() {
    return {
      isActive: this.email.isStar,
    };
  },

  methods: {
    toggleMarkedWithStar(email) {
      this.isActive = !this.isActive;
      this.$emit("star", email);
    },

    toggleEmailRead(email) {
      this.$emit("read", email);
    },

    remove(emailId) {
      this.$emit("remove", emailId);
    },
  },

  computed: {
    isRead() {
      return this.email.isRead ? "unRead" : "Read";
    },

    // getQueryString() {
    //   let qString;
    //   const { subject, to, sentAt, body } = this.email;
    //   qString = `?subject=${subject}&body=${body}&to=${to}&sentAt=${sentAt}`;
    //   return qString;
    // },
  },
};