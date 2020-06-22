import api from "../../api/index";

export const teamStore = {
  state: {
    teams: JSON.parse(localStorage.getItem("teams")) || [],
  },

  mutations: {
    addTeams(state, item) {
      localStorage.setItem("teams", JSON.stringify(item));
      state.teams = item;
    },
  },

  actions: {
    async fetchTeams({ commit }) {
      let response = await api.getTeams();
      commit("addTeams", response.data);
    },
  },
};
