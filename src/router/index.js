import Vue from "vue";
import Router from "vue-router";

import UserTeamView from "../components/User/Teams.vue";
import UserFixtureView from "../components/User/Fixture.vue";
import Login from "../components/Login.vue";

import TeamView from "../components/Admin/Teams.vue";
import FixtureView from "../components/Admin/Fixture.vue";
import CreateTeamView from "../components/Admin/CreateTeam.vue";
import CreateFixtureView from "../components/Admin/CreateFixture.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      component: UserTeamView,
    },
    {
      path: "/fixture",
      component: UserFixtureView,
    },
    {
      path: "/login",
      component: Login,
    },
    {
      path: "/admin-team",
      component: TeamView,
    },
    {
      path: "/create-team",
      component: CreateTeamView,
    },
    {
      path: "/admin-fixture",
      component: FixtureView,
    },
    {
      path: "/create-fixture",
      component: CreateFixtureView,
    },
  ],
});
