<template>
  <section>
    <b-field grouped group-multiline>
      <b-select v-model="defaultSortDirection">
        <option value="asc">Default sort direction: ASC</option>
        <option value="desc">Default sort direction: DESC</option>
      </b-select>
      <b-select v-model="perPage" :disabled="!isPaginated">
        <option value="5">5 per page</option>
        <option value="10">10 per page</option>
        <option value="15">15 per page</option>
        <option value="20">20 per page</option>
      </b-select>
      <div class="control">
        <button
          class="button"
          @click="currentPage = 2"
          :disabled="!isPaginated"
        >
          Set page to 2
        </button>
      </div>
      <div class="control is-flex">
        <b-switch v-model="isPaginated">Paginated</b-switch>
      </div>
      <div class="control is-flex">
        <b-switch v-model="isPaginationSimple" :disabled="!isPaginated"
          >Simple pagination</b-switch
        >
      </div>
      <b-select v-model="paginationPosition" :disabled="!isPaginated">
        <option value="bottom">bottom pagination</option>
        <option value="top">top pagination</option>
        <option value="both">both</option>
      </b-select>
      <b-select v-model="sortIcon">
        <option value="arrow-up">Arrow sort icon</option>
        <option value="menu-up">Caret sort icon</option>
        <option value="chevron-up">Chevron sort icon </option>
      </b-select>
      <b-select v-model="sortIconSize">
        <option value="is-small">Small sort icon</option>
        <option value="">Regular sort icon</option>
        <option value="is-medium">Medium sort icon</option>
        <option value="is-large">Large sort icon</option>
      </b-select>
    </b-field>

    <b-table
      :data="fixtures"
      :paginated="isPaginated"
      :per-page="perPage"
      :current-page.sync="currentPage"
      :pagination-simple="isPaginationSimple"
      :pagination-position="paginationPosition"
      :default-sort-direction="defaultSortDirection"
      :sort-icon="sortIcon"
      :sort-icon-size="sortIconSize"
      default-sort="date"
      aria-next-label="Next page"
      aria-previous-label="Previous page"
      aria-page-label="Page"
      aria-current-label="Current page"
    >
      <template slot-scope="props">
        <b-table-column label="Fixture" sortable>
          <div>
            {{ props.row.teamA.name }} <span class="tag is-info"> vs </span>
            {{ props.row.teamB.name }}
          </div>
        </b-table-column>

        <b-table-column field="date" label="Date" sortable centered>
          <span class="tag is-success">
            {{ props.row.date }}
          </span>
        </b-table-column>

        <b-table-column field="time" label="TIme" sortable>
          <span class="tag is-info"> {{ props.row.time }} GMT </span>
        </b-table-column>

        <b-table-column label="Stadium">
          <span class="tag is-dark">
            {{ props.row.location }}
          </span>
        </b-table-column>

        <b-table-column>
          <b-button @click="update(props.row)" type="is-light">Edit</b-button>
        </b-table-column>

        <b-table-column>
          <b-button type="is-dark">Delete</b-button>
        </b-table-column>
      </template>
    </b-table>

    <!-- Update Modal -->
    <div v-show="open" class="shadow">
      <div id="modal" class="container is-centered">
        <div class="modal-card" style="width: auto">
          <header class="modal-card-head">
            <p class="modal-card-title">Update Fixture</p>
          </header>
          <section class="modal-card-body">
            <b-field label="Home Team">
              <b-select v-model="input.teamA" placeholder="Select a team">
                <option
                  v-for="option in teams"
                  :value="option._id"
                  :key="option._id"
                >
                  {{ option.teamA.name }}
                </option>
              </b-select>
            </b-field>

            <b-field label="Away Team">
              <b-select v-model="input.teamB" placeholder="Select a team">
                <option
                  v-for="option in teams"
                  :value="option._id"
                  :key="option._id"
                >
                  {{ option }}
                </option>
              </b-select>
            </b-field>

            <b-field label="Select Date and Time">
              <b-datetimepicker
                placeholder="Type or select a date..."
                v-model="date_time"
                icon="calendar-today"
                :timepicker="{ enableSeconds, hourFormat: format }"
                horizontal-time-picker
              >
              </b-datetimepicker>
            </b-field>

            <div class="level">
              <div class="level-left">
                <button @click="close()" class="button" type="button">
                  Close
                </button>
              </div>
              <div class="level-right">
                <button
                  @click="updateFixture()"
                  class="button is-primary"
                  type="button"
                >
                  Update
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  mounted() {
    this.$store.dispatch("fetchFixtures");
  },
  data() {
    return {
      isPaginated: true,
      isPaginationSimple: false,
      paginationPosition: "bottom",
      defaultSortDirection: "asc",
      sortIcon: "arrow-up",
      sortIconSize: "is-small",
      currentPage: 1,
      perPage: 5,
      open: false,
      input: {
        id: null,
        teamA: null,
        teamB: null,
        date: null,
        time: null,
        token: null,
      },
      date_time: null,
      formatAmPm: false,
      enableSeconds: false,
    };
  },
  computed: {
    fixtures() {
      return this.$store.state.fixtureStore.fixtures;
    },
    teams() {
      return this.$store.state.teamStore.teams;
    },
    format() {
      return this.formatAmPm ? "12" : "24";
    },
  },
  methods: {
    async update(record) {
      this.input.id = record._id;
      this.input.token = this.$store.state.admin.token;
      console.log(this.$store.state.teamStore.teams);
      this.open = true;
    },

    async updateFixture() {
      this.input.date =
        this.date_time.getUTCMonth() +
        1 +
        "/" +
        this.date_time.getUTCDate() +
        "/" +
        this.date_time.getFullYear();
      this.input.time =
        this.date_time.getUTCHours() + 1 + ":" + this.date_time.getUTCMinutes();
      const res = await this.$store.dispatch("updateFixture", this.input);
      if (res.status === 200) {
        alert(res.message);
        this.open = false;
        this.$store.dispatch("fetchTeams");
      } else alert(res.message);
    },

    close() {
      this.open = false;
    },
  },
};
</script>
<style scoped></style>
