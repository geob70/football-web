import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import { teamStore } from "./team/index";
import { fixtureStore } from "./fixture/index";
import { admin } from "./admin/index";

Vue.use(Vuex);

const teamState = new createPersistedState({
  paths: ["teams"],
});

export default new Vuex.Store({
  modules: {
    teamStore,
    fixtureStore,
    admin,
  },
  plugins: [teamState],
});
