import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import VueResource from "vue-resource";
import "material-design-icons/iconfont/material-icons.css";
import "@fortawesome/fontawesome-free/css/all.css";
import router from "./router";
import store from "./store";
import Vuelidate from "vuelidate";

Vue.config.productionTip = false;

Vue.use(VueResource);
Vue.use(Vuelidate);

new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
