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
      :data="teams"
      :paginated="isPaginated"
      :per-page="perPage"
      :current-page.sync="currentPage"
      :pagination-simple="isPaginationSimple"
      :pagination-position="paginationPosition"
      :default-sort-direction="defaultSortDirection"
      :sort-icon="sortIcon"
      :sort-icon-size="sortIconSize"
      default-sort="name"
      aria-next-label="Next page"
      aria-previous-label="Previous page"
      aria-page-label="Page"
      aria-current-label="Current page"
    >
      <template slot-scope="props">
        <b-table-column field="name" label="Club Name" sortable>
          {{ props.row.name }}
        </b-table-column>

        <b-table-column field="location" label="Stadium" sortable>
          {{ props.row.location }}
        </b-table-column>

        <b-table-column>
          <b-button @click="update(props.row)" type="is-light">Edit</b-button>
        </b-table-column>

        <b-table-column>
          <b-button @click="deleteRow(props.row)" type="is-dark" disabled
            >Delete</b-button
          >
        </b-table-column>
      </template>
    </b-table>

    <!-- // Update modal -->
    <div v-show="open" class="shadow">
      <div id="modal" class="container is-centered">
        <div class="modal-card" style="width: auto">
          <header class="modal-card-head">
            <p class="modal-card-title">Update Team</p>
          </header>
          <section class="modal-card-body">
            <b-field label="Name">
              <b-input type="text" v-model="input.name" required> </b-input>
            </b-field>

            <b-field label="Stadium">
              <b-input type="text" v-model="input.location" required> </b-input>
            </b-field>

            <div class="level">
              <div class="level-left">
                <button @click="close()" class="button" type="button">
                  Close
                </button>
              </div>
              <div class="level-right">
                <button
                  @click="updateTeam()"
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

    <!-- Delete modal -->
    <div v-show="opendel" class="shadow">
      <div id="modal" class="container is-centered">
        <div class="modal-card" style="width: auto">
          <header class="modal-card-head">
            <p class="modal-card-title">Delete Team</p>
          </header>
          <section class="modal-card-body">
            <p>Do you wish to continue?</p>
            <div class="level">
              <div class="level-left">
                <button @click="closedel()" class="button" type="button">
                  no
                </button>
              </div>
              <div class="level-right">
                <button
                  @click="delTeam()"
                  class="button is-primary"
                  type="button"
                >
                  yes
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
  async mounted() {
    if (localStorage.getItem("token") === null) this.$store.dispatch("logout");
    else if (
      (await this.$store.dispatch(
        "verifyToken",
        localStorage.getItem("token")
      )) !== 200
    ) {
      this.$store.dispatch("logout");
    }
    this.$store.dispatch("fetchTeams");
  },
  data() {
    return {
      data: [],
      isPaginated: true,
      isPaginationSimple: false,
      paginationPosition: "both",
      defaultSortDirection: "asc",
      sortIcon: "arrow-up",
      sortIconSize: "is-small",
      currentPage: 1,
      perPage: 5,
      open: false,
      opendel: false,
      input: {
        id: null,
        name: null,
        location: null,
        token: null,
      },
      detail: {},
    };
  },
  computed: {
    teams() {
      return this.$store.state.teamStore.teams;
    },
  },
  methods: {
    async update(record) {
      this.input.id = record._id;
      this.input.name = record.name;
      this.input.location = record.location;
      this.input.token = this.$store.state.admin.token;
      this.open = true;
    },

    async updateTeam() {
      const res = await this.$store.dispatch("updateTeam", this.input);
      if (res.status === 200) {
        alert(res.message);
        this.open = false;
        this.$store.dispatch("fetchTeams");
      } else alert(res.message);
    },

    async deleteRow(record) {
      const data = {
        id: record._id,
        token: this.$store.state.admin.token,
      };
      this.detail = data;
      this.opendel = true;
    },

    close() {
      this.open = false;
    },

    closedel() {
      this.opendel = false;
    },

    async delTeam() {
      const res = await this.$store.dispatch("deleteTeam", this.detail);
      if (res.status === undefined) {
        alert("Deleted");
        this.opendel = false;
        this.$store.dispatch("fetchTeams");
      } else alert(res.message);
    },
  },
};
</script>
<style>
#modal {
  position: relative;
  z-index: 6;
  width: 30%;
}
.shadow {
  background-color: rgba(85, 80, 80, 0.5);
  position: absolute;
  top: 0%;
  z-index: 4;
  width: 100vw;
  height: 100vh;
}
</style>
