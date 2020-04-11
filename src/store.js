import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const STORAGE_KEY = "todos-db";

export default new Vuex.Store({
  state: {
    backgrounds: [
      "blue-yellow",
      "orange-yellow",
      "purple-blue",
      "sky-blue",
      "green-blue",
      "pink"
    ],
    selectedBackground: "pink",
    todos: JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "[]")
  },
  getters: {},
  mutations: {
    UPDATE_BACKGROUND: (state, background) => {
      state.selectedBackground = background;
    },
    ADD_TODO(state, todo) {
      state.todos.push(todo);
    },
    REMOVE_TODO(state, todo) {
      state.todos.splice(state.todos.indexOf(todo), 1);
    },
    EDIT_TODO(state, { todo, text = todo.text, done = todo.done }) {
      todo.text = text;
      todo.done = done;
    }
  },
  /*
  Actions are similar to mutations, the differences being that:
  Instead of mutating the state, actions commit mutations.
  Actions can contain arbitrary asynchronous operations.
  */
  actions: {
    addTodo({ commit }, text) {
      commit("ADD_TODO", {
        uid: Date.now(),
        text,
        done: false
      });
    },
    removeTodo({ commit }, todo) {
      commit("REMOVE_TODO", todo);
    },
    toggleTodo({ commit }, todo) {
      commit("EDIT_TODO", { todo, done: !todo.done });
    },
    editTodo({ commit }, { todo, value }) {
      commit("EDIT_TODO", { todo, text: value });
    },
    // haven't used this one yet
    toggleAll({ state, commit }, done) {
      state.todos.forEach(todo => {
        commit("EDIT_TODO", { todo, done });
      });
    },
    // haven't used this one yet
    clearCompleted({ state, commit }) {
      state.todos
        .filter(todo => todo.done)
        .forEach(todo => {
          commit("REMOVE_TODO", todo);
        });
    }
  },
  //Vuex stores accept the plugins option that exposes hooks for each mutation
  plugins: [
    store => {
      // called when the store is initialized
      store.subscribe((mutation, { todos }) => {
        // called after every mutation.
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
      });
    }
  ]
});
