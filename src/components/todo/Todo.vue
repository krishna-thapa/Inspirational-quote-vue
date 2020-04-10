<template>
  <v-container>
    <v-layout row wrap>
      <div class="text-xs-center">
        <h1 class="primary--text display-3 font-weight-medium my-3">TODOS</h1>
        <v-card>
          <v-list class="pa-1">
            <v-list-item>
              <v-list-item-action>
                <v-checkbox
                  :input-value="allChecked"
                  @change="toggleAll(!allChecked)"
                  color="primary"
                  v-if="todos.length > 0"
                ></v-checkbox>
                <v-icon color="primary" v-else>check</v-icon>
              </v-list-item-action>
              <v-text-field
                :label="'New todo input'"
                @keydown.enter="addTodo"
                autofocus
                autocomplete="off"
                clearable
                color="primary"
                text
                hide-details
                maxlenngth="1023"
                placeholder="What needs to be done?"
                solo
                v-model="newTodo"
              ></v-text-field>
            </v-list-item>
          </v-list>
        </v-card>
        <!-- main page -->
        <v-card class="mt-3" v-show="todos.length">
          <v-progress-linear class="my-0" v-model="progressPercentage"></v-progress-linear>
          <v-card-actions class="px-3" v-show="todos.length">
            <span class="primary--text">{{ remaining }} {{ remaining | pluralize('item') }} left</span>
            <v-spacer></v-spacer>
            <v-btn-toggle class="elevation-2" mandatory v-model="visibility" v-show="todos.length">
              <v-btn
                :key="key"
                :to="key"
                :value="key"
                class="mx-0"
                color="primary"
                text
                small
                v-for="(val, key) in filters"
              >{{ key | capitalize }}</v-btn>
            </v-btn-toggle>
          </v-card-actions>
          <v-list class="pa-0">
            <template v-for="todo in filteredTodos">
              <v-divider :key="`${todo.uid}-divider`"></v-divider>
              <TodoItem :key="todo.uid" :todo="todo" />
            </template>
          </v-list>
        </v-card>
        <v-btn
          color="primary"
          @click="clearCompleted"
          block
          class="mt-3"
          depressed
          rounded
          v-show="todos.length > remaining"
        >Clear completed</v-btn>
      </div>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
import TodoItem from "../todo/TodoItem";

const filters = {
  all: todos => todos,
  active: todos => todos.filter(todo => !todo.done),
  completed: todos => todos.filter(todo => todo.done)
};

export default {
  components: {
    TodoItem
  },
  data: () => ({
    newTodo: "",
    filters: filters,
    //visibility: this.filter,
    visibility: "all"
  }),
  computed: {
    todos() {
      return this.$store.state.todos;
    },
    allChecked() {
      return this.todos.every(todo => todo.done);
    },
    filteredTodos() {
      return filters[this.visibility](this.todos);
    },
    remaining() {
      return this.todos.filter(todo => !todo.done).length;
    },
    progressPercentage() {
      const len = this.todos.length;
      return ((len - this.remaining) * 100) / len;
    }
  },
  methods: {
    ...mapActions(["toggleAll", "clearCompleted"]),
    addTodo() {
      const text = this.newTodo.trim();
      if (text) {
        this.$store.dispatch("addTodo", text);
      }
      this.newTodo = "";
    }
  },
  filters: {
    // 1 item and 2 items
    pluralize: (item, word) => (item === 1 ? word : word + "s"),
    // capitalize first letter of the word
    capitalize: str => str.charAt(0).toUpperCase() + str.slice(1)
  }
};
</script>