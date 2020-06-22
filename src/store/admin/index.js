import api from "../../api/index";

export default {
  state: {
    admin: {},
    token: null,
    isLoggedIn: false,
    nothing: null,
  },

  mutations: {
    setToken(state, item) {
      state.token = item;
    },

    setAdmin(state, item) {
      state.admin = item;
    },

    setLogIn(state, item) {
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

    async login({ commit, dispatch }, data) {
      const { email, password } = data;
      let response = await api.authLogin({ email, password });
      if (response.data.status === 200) {
        commit("setToken", response.data.token);
        commit("setLogIn", true);
        dispatch("getToken", response.data.token);
      }
      return { status: response.data.status, message: response.data.message };
    },

    async getToken({ commit }, token) {
      let response = await api.authVerifyToken({ token });
      commit("setAdmin", response.data.admin);
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
  },
};
