import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import VueResource from "vue-resource";
import "material-design-icons/iconfont/material-icons.css";
import "@fortawesome/fontawesome-free/css/all.css";
import router from "./router";

Vue.config.productionTip = false;

Vue.use(VueResource);

new Vue({
  vuetify,
  router,
  render: (h) => h(App),
}).$mount("#app");
