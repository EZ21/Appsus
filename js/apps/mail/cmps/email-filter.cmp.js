export default {
    template: `
        <section class="email-filter">
            <label for="">Search</label>
            <input @input="setSearchBarFilter" v-model="filterBy.text" type="text" class="search-input" placeholder="Enter text here">
        </section>
    `,

    data() {
      return {
        filterBy: {
            read: 'all',
            text: ''
        },
        sort: 'date'
      };
    },

    methods: {
        setSearchBarFilter() {

        }
    }
}