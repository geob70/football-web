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
      </template>
    </b-table>
  </section>
</template>
<script>
export default {
  mounted() {
    this.$store.dispatch("fetchFixtures");
  },
  data() {
    return {
      data: [],
      isPaginated: true,
      isPaginationSimple: false,
      paginationPosition: "bottom",
      defaultSortDirection: "asc",
      sortIcon: "arrow-up",
      sortIconSize: "is-small",
      currentPage: 1,
      perPage: 5,
    };
  },
  computed: {
    fixtures() {
      return this.$store.state.fixtureStore.fixtures;
    },
  },
};
</script>
<style scoped></style>
