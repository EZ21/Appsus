
// <email-folder-list>: Allow filtering by different folders: inbox / sent / trash/ draft
export default {
  props: ['isDisplayed'],

  template: `
    <!-- TODO -->
  `,

  methods: {
    filter() {
      this.$emit('filtered', { ...this.filterBy});
    },

    sort() {
      this.$emit('sorted', this.sort);
    }


  },
};