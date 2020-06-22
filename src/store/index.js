import Vue from "vue";
import Vuex from "vuex";

import teamStore from "./team/index";
import fixtureStore from "./fixture/index";
import admin from "./admin/index";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    teamStore,
    fixtureStore,
    admin,
  },
});
