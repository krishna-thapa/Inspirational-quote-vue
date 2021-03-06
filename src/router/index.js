import Vue from "vue";
import Router from "vue-router";

const routerOptions = [
  { path: "/", component: "homePage/HomePage" },
  { path: "/apiDemo", component: "api/apiExamples" },
  { path: "/signAccount", component: "auth/SignAccount" },
  { path: "/todo", component: "todo/TodoList" },
  { path: "/draw", component: "canvas/Canvas" },
  { path: "*", component: "NotFound" }
];

const routes = routerOptions.map(route => {
  return {
    ...route,
    component: () => import(`../components/${route.component}.vue`)
  };
});

Vue.use(Router);

export default new Router({
  mode: "history",
  routes
});
