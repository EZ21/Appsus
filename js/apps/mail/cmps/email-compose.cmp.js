import { emailService } from "../services/email-service.js";
import { eventBus } from "../../../services/eventBus-service.js";

export default {
  template: `
        <section class="compose-new-email">
            <div class="main-screen" @click="closeCompose"></div>
            <div class="compose-email-modal">
                <h4>New Message</h4>
                <input type="text" v-model="newEmail.to" placeholder="To:">
                <input type="text" v-model="newEmail.cc" placeholder="Cc:">
                <input type="text" v-model="newEmail.subject" placeholder="Subject:">
                <textarea v-model="newEmail.body" rows="10"></textarea>
                <div class="compose-control-panel">
                    <button @click="sendComposedEmail" class="send-btn">Send</button>
                </div>
            </div>
        </section>
    `,

  data() {
    return {
      newEmail: {
        to: "",
        cc: "",
        subject: "",
        body: "",
      },

      isComposeOpen: true,
      saveComposedEmailInterval: null,
    };
  },

  created() {
    eventBus.on("emailDraft", this.saveDraft); // save the composed email as a draft to newEmail object (in data)

    this.saveComposedEmailInterval = setInterval(() => {
      if (
        this.newEmail.to ||
        this.newEmail.cc ||
        this.newEmail.subject ||
        this.newEmail.body
      ) {
        emailService.saveEmailDraft(this.newEmail).then(() => {
          console.log("Email was saved as a draft");
        });
      } else {
        this.newEmail = {
          to: "",
          cc: "",
          subject: "",
          body: "",
        };
      }
    }, 5000);
  },

  methods: {
    sendComposedEmail() {
      emailService.addEmail(this.newEmail).then((email) => {
        console.log("Email was sent");
        if (this.newEmail.isDraft) {
          emailService.removeEmailDraft(email.id).then(() => {
            this.$emit("deleteEmailDraft");
            this.closeCompose();
          });
        } else {
          this.newEmail = {
            to: "",
            cc: "",
            subject: "",
            body: "",
          };
          this.closeCompose();
        }
      });
    },

    saveDraft(draft) {
      // save the composed email as a draft to newEmail object (in data):
      this.newEmail = draft;
    },

    closeCompose() {
      this.isComposeOpen = false;
      this.$emit("closed");
    },
  },

  unmounted() {
    clearInterval(this.saveComposedEmailInterval);
  },
};