import api from "../../api/index";

export default {
  state: {
    teams: [],
  },

  mutations: {
    add(state, item) {
      state.teams = item;
    },
  },

  actions: {
    async fetchTeams({ commit }) {
      let response = await api.getTeams();
      commit("add", response.data);
    },
  },
};
