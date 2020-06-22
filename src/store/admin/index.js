import api from "../../api/index";

export const admin = {
  state: {
    details: {
      email: null,
      username: null,
    },
    token: localStorage.getItem("token") || null,
    isLoggedIn: localStorage.getItem("isLoggedIn") || false,
    nothing: null,
  },

  mutations: {
    setToken(state, item) {
      localStorage.setItem("token", item);
      state.token = item;
    },

    setAdmin(state, item) {
      if (item !== null) {
        state.details.username = item.username;
        state.details.email = item.email;
      } else {
        state.details.username = null;
        state.details.email = null;
      }
    },

    setLogIn(state, item) {
      localStorage.setItem("isLoggedIn", item);
      state.isLoggedIn = item;
    },

    nothing(state, item) {
      state.nothing = item;
    },
  },

  actions: {
    async signUp({ dispatch }, data) {
      const { username, email, password } = data;
      let response = await api.authSignUp({ username, email, password });
      console.log(response);
      if (response.data.status === 201) {
        return dispatch("login", { email, password });
      }
      return { status: response.data.status, message: response.data.message };
    },

    async login({ dispatch }, data) {
      const { email, password } = data;
      let response = await api.authLogin({ email, password });
      if (response.data.status === 200) {
        dispatch("verifyToken", response.data.token);
      }
      return { status: response.data.status, message: response.data.message };
    },

    async logout({ commit }) {
      commit("setToken", null);
      localStorage.removeItem("token");
      commit("setAdmin", null);
      commit("setLogIn", false);
    },

    async verifyToken({ commit }, token) {
      let response = await api.authVerifyToken({ token });
      if (response.data.status === 200) {
        commit("setToken", response.data.token);
        commit("setAdmin", response.data.admin);
        commit("setLogIn", true);
      }
      return response.data.status;
    },

    async createTeam({ commit }, data) {
      const { name, location, token } = data;
      let response = await api.createTeam(token, { name, location });
      commit("nothing", null);
      return { status: response.data.status, message: response.data.message };
    },

    async updateTeam({ commit }, data) {
      const { name, location, id, token } = data;
      let response = await api.updateTeam(token, { name, location, id });
      commit("nothing", null);
      return { status: response.data.status, message: response.data.message };
    },

    async deleteTeam({ commit }, data) {
      const { id, token } = data;
      let response = await api.deleteTeam(token, { id });
      commit("nothing", null);
      return { status: response.data.status, message: response.data.message };
    },

    async createFixture({ commit }, data) {
      const { teamA, teamB, date, time, token } = data;
      let response = await api.createFixture(token, {
        teamA,
        teamB,
        date,
        time,
      });
      console.log(response);
      commit("nothing", null);
      return { status: response.data.status, message: response.data.message };
    },

    async updateFixture({ commit }, data) {
      const { teamA, teamB, date, time, id, token } = data;
      let response = await api.updateFixture(token, {
        teamA,
        teamB,
        date,
        time,
        id,
      });
      commit("nothing", null);
      return { status: response.data.status, message: response.data.message };
    },

    async deleteFixture({ commit }, data) {
      const { id, token } = data;
      let response = await api.deleteFixture(token, { id });
      commit("nothing", null);
      return { status: response.data.status, message: response.data.message };
    },
  },
};
