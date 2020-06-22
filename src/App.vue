<template>
  <div>
    <div class="columns is-gapless">
      <div id="left" class="column is-one-fifth">
        <div class="sidebar">
          <button v-show="isAdmin" class="button block" disabled>
            Welcome {{ admin.username }}
          </button>
          <b-menu>
            <b-menu-list label="FOOTBALL LIVE">
              <b-menu-item
                label="Teams"
                v-show="!isAdmin"
                :active="isActive"
                @click="goTo('/')"
              ></b-menu-item>
              <b-menu-item
                v-show="!isAdmin"
                @click="goTo('fixture')"
                label="Fixtures"
              ></b-menu-item>
              <b-menu-item
                label="Teams"
                @click="goTo('/admin-team')"
                v-show="isAdmin"
              ></b-menu-item>
              <b-menu-item
                v-show="isAdmin"
                @click="goTo('/admin-fixture')"
                label="Fixtures"
              ></b-menu-item>
              <b-menu-item
                label="Create team"
                @click="goTo('/create-team')"
                v-show="isAdmin"
              ></b-menu-item>
              <b-menu-item
                v-show="isAdmin"
                @click="goTo('/create-fixture')"
                label="Create fixture"
              ></b-menu-item>
            </b-menu-list>
            <b-menu-list label="ACTIONS">
              <b-menu-item
                v-show="!isAdmin"
                label="Login"
                @click="goTo('/login')"
              ></b-menu-item>
              <b-menu-item
                @click="logout()"
                v-show="isAdmin"
                label="Logout"
              ></b-menu-item>
            </b-menu-list>
          </b-menu>
        </div>
      </div>
      <div id="right" class="column">
        <div class="notification">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isActive: true,
    };
  },
  methods: {
    goTo(route) {
      this.$router.push({
        path: route,
      });
    },
    async logout() {
      await this.$store.dispatch("logout");
      this.$router.push({
        path: "/",
      });
    },
  },
  computed: {
    isAdmin() {
      return this.$store.state.admin.isLoggedIn;
    },
    admin() {
      return this.$store.state.admin.details;
    },
  },
};
</script>
<style scoped>
#left {
  background-color: darkgray;
  height: 100vh;
}
#right {
  height: 100vh;
}
.sidebar {
  padding: 10%;
}
</style>
