import api from "../../api/index";

export default {
  state: {
    fixtures: [],
  },

  mutations: {
    add(state, item) {
      state.fixtures = item;
    },
  },

  actions: {
    async fetchFixtures({ commit }) {
      let response = await api.getFixtures();
      commit("add", response.data);
    },
  },
};
