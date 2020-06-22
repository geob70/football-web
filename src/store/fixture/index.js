import api from "../../api/index";

export const fixtureStore = {
  state: {
    fixtures: JSON.parse(localStorage.getItem("fixtures")) || [],
  },

  mutations: {
    addFixtures(state, item) {
      localStorage.setItem("fixtures", JSON.stringify(item));
      state.fixtures = item;
    },
  },

  actions: {
    async fetchFixtures({ commit }) {
      let response = await api.getFixtures();
      commit("addFixtures", response.data);
    },
  },
};
