import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

// console.log(process.env.VUE_APP_API_URL);
const myAxios = axios.create({
  baseURL: process.env.VUE_APP_API_URL || "http://localhost:3000",
});

export default {
  async getTeams() {
    const response = await myAxios.get("/teams");
    return response;
  },

  async getFixtures() {
    const response = await myAxios.get("/fixtures");
    return response;
  },

  async authLogin(data) {
    const response = await myAxios.post("/admin/login", data);
    return response;
  },

  async authSignUp(data) {
    const response = await myAxios.post("/admin/sign-up", data);
    return response;
  },

  async authVerifyToken(token) {
    const response = await myAxios.post("/admin/verify-token", token);
    return response;
  },

  async createTeam(token, data) {
    const response = await myAxios.post("/teams/add", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  },

  async updateTeam(token, data) {
    const response = await myAxios.patch("/teams/" + data.id, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  },

  async deleteTeam(token, data) {
    const response = await myAxios.delete("/teams/" + data.id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  },

  async createFixture(token, data) {
    const response = await myAxios.post("/fixtures/add", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  },

  async updateFixture(token, data) {
    const response = await myAxios.patch("/fixtures/" + data.id, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  },

  async deleteFixture(token, data) {
    const response = await myAxios.delete("/fixtures/" + data.id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  },
};
