import { emailService } from '../services/email-service.js';
import emailList from '../cmps/email-list.cmp.js';
import emailFilter from '../cmps/email-filter.cmp.js';
import emailDetails from './email-details.cmp.js';
import emailFilterList from '../cmps/email-filter-list.cmp.js';
import emailCompose from '../cmps/email-compose.cmp.js';
// import { eventBus } from '../../../services/eventBus-service.js'

export default {
  template: `
        <section class="email-app">
            <div class="email-layout">
                <div class="email-container">
                    <!-- <h1>WELLCOME TO MAIL APP</h1> -->

                <!-- :email is v-bind:email -->
                <!-- @click is v-on:click -->
                    <email-filter @filter="setFilter" @sort="sortEmails" @toggle="toggleDisplay"/>
                    <email-list :emails="emailsForDisplay" @selected="selectEmail" @star="toggleMarkedWithStar" @toggle="toggleEmailRead" @delete="deleteEmail"/>
                </div>

                <aside class="side-bar">
                    <email-filter-list @hide="toggleDisplay" :isDisplayed="isDisplayed" @display="displayFolder" @compose="openComposeEmail"/>

                    <p class="unread-emails">Unread Emails: {{ getUnreadCounter }}</p>
                </aside>
            </div>

            <email-details v-if="emailSelected" :email="emailSelected"/>
            <email-compose @close="closeEMailCompose" v-if="isCompose" @deleteEmailDraft="updateEmailsDraft"/>
        </section>  
    `,

  data() {
    return {
      emails: null,
      filterBy: null,
      isDisplayed: false,
      emailSelected: null,
      folder: null,
      isCompose: false,
    };
  },

  created() {
    this.displayFolder("inbox");
  },

  methods: {
    setFilter(filterBy) {
        this.filterBy = filterBy;
    },

    sortEmails(sortBy) {
        // sort by date or email's title
        if('date' === sortBy) {
            return this.emails.sort((email1, email2) => email2.sentAt - email1.sentAt);
        } else {
            return(this.emails.sort((email1, email2)=>{
                email1.subject.toLowerCase() > email2.subject.toLowerCase() ? 1 : -1;
            }));
        };
    },

    displayFolder(folderName) {
      this.folder = folderName;
      emailService
        .getEmailsByFolder(this.folder)
        .then((emails) => (this.emails = emails));
    },

    toggleDisplay() {
      this.isDisplayed = !this.isDisplayed;
    },

    toggleMarkedWithStar(email) {
        emailService.toggleStarIcon(email).then(this.emailSelected = email);
    },

    toggleEmailRead(email) {
        emailService.toggleMarkReadEmail(email).then((this.emailSelected = email));
    },

    deleteEmail(id) {
        emailService.remove(id).then(()=>{
            const idx = this.emails.findIndex((email) => email.id === id);
            this.emails.splice(idx, 1);
        })
        .catch((err) => console.error(err));
    },

    closeEMailCompose() {
      // TODO
    },


    emailSelected() {
        // TODO
    },
  },

  computed: {
    getUnreadCounter() {
      // displays how many unread emails are there:
      let counter = 0;
      if (!this.emails) return;
      this.emails.filter((email) => {
        if (!email.isRead) counter++;
      });
      return counter;
    },

    emailsForDisplay() {
      if (!this.filterBy) return this.emails;
      const searchInput = this.filterBy.word.toLowerCase();
      if (!searchInput || "all" === this.filterBy.read) return this.emails;

      const isSearchRead = this.filterBy.read === "read" ? true : false;
      // const displayedEmails = this.emails.filter((email) => {
      //     return ((isSearchRead === email.isRead) && (email.subject));
      // })

      const displayedEmails = this.emails.filter((email) => {
        const searchWord = this.filterBy.text.toLowerCase();
        const emailSubject = email.subject.toLowerCase();
        const emailBody = email.body.toLowerCase();

        return (
          isSearchRead === email.isRead &&
          (emailSubject.includes(searchWord) || emailBody.includes(searchWord))
        );
      });
      return displayedEmails;
    },
  },

  components: {
    emailList,
    emailFilterList, // Allow filtering by different folders: inbox / sent / trash/ draft
    emailFilter,
    emailDetails,
    emailCompose,
  },
};