export default {
  template: `
        <section class="email-filter">
            <label for="">Search</label>
            <input @input="setFilter" v-model="filterBy.text" type="text" class="search-input" placeholder="Enter text here">

            <button class="menu-btn" @click="toggleMenuDisplay"><i class="fa-solid fa-bars"></i></button>

            <div class="sort-panel-container">
                <label for="">Sort</label>
                <select @change="sortSubjectDate" v-model="sort">
                    <option value="subject" selected>Subject</option>
                    <option value="date">Date</option>
                </select>

                <label for="">Filter</label>
                <select @change="setFilter" v-model="filterBy.read">
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
    toggleMenuDisplay() {
      this.$emit("toggled");
    },

    setFilter() {
      this.$emit("filtered", { ...this.filterBy });
    },

    sortSubjectDate() {
      this.$emit("sorted", this.sort);
    },
  },
};