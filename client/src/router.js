import Vue from "vue";
import Router from "vue-router";
import Search from "./views/Search.vue";
import Play from "./views/Play.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/search",
      alias: "/",
      name: "search",
      component: Search
    },
    {
      path: "/play/:song_id",
      name: "play",
      component: Play
    }
  ]
});
