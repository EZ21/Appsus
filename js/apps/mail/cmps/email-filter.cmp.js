export default {
  template: `
        <section class="email-filter">
            <label for="">Search</label>
            <input @input="setSearchBarFilter" v-model="filterBy.text" type="text" class="search-input" placeholder="Enter text here">

            <div class="sort-panel-container">
                <label for="">Sort</label>
                <select name="" id="" @change="sortSubjectDate" v-model="sort">
                    <option value="subject" selected>Subject</option>
                    <option value="date">Date</option>
                </select>

                <label for="">Filter</label>
                <select name="" id="" @change="filterReadUreadEmails" v-model="filterBy.read">
                    <option value="all" selected>All</option>
                    <option value="read">Read</option>
                    <option value="unread">Unread</option>
                </select>

            </div>
        </section>
    `,

  data() {
    return {
      filterBy: {
        read: "all",
        text: "",
      },
      sort: "date",
    };
  },

  methods: {
    setSearchBarFilter() {
      this.$emit('filtered', { ...this.filterBy });
    },

    sortSubjectDate() {
        this.$emit('sort', this.sort);
    },

    filterReadUreadEmails() {

    },
  },
};