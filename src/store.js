import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    backgrounds: [
      "blue-yellow",
      "orange-yellow",
      "purple-blue",
      "sky-blue",
      "green-blue",
      "pink",
    ],
    selectedBackground: "pink",
  },
  getters: {},
  mutations: {
    UPDATE_BACKGROUND: (state, background) => {
      state.selectedBackground = background;
    },
  },
});
