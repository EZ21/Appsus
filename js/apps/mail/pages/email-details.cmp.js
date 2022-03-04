import { emailService } from "../services/email-service.js";

export default {
  template: `
        <section v-if="email" class="email-details">
            <div class="details-container">
                <h3 class="details-subject">{{ email.subject }}</h3>
                <h5 class="details-address">{{ email.to }}</h5>
                <h6 class="details-date">{{ emailDateFormat(email) }}</h6>
                <article class="details-body">{{ email.body }}</article>
            </div>
            <router-link to="/email">Back</router-link>
        </section>
    `,

  data() {
    return {
       email: null // receives the email object to be displayed 
    };
  },

  created() {
      const { emailId } = this.$route.params;
      emailService.getEmailById(emailId).then((email) => this.email = email);
  },

  methods: {
    emailDateFormat(email) {
      const date = new Date(email.sentAt).toLocaleString();
      return date;
    },
  },

  computed: {},
};