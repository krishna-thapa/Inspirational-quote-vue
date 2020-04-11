<template>
  <v-card class="mx-auto mt-12" max-width="600">
    <v-toolbar color="indigo" dark>
      <v-icon class="mr-4" large>fa-notes-medical</v-icon>
      <v-toolbar-title style="font-size: 2rem;">TODO Lists</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon class="mx-2">
        <v-icon large>mdi-magnify</v-icon>
      </v-btn>
    </v-toolbar>
    <v-card-text>
      <v-container fluid>
        <AddItemField />
        <v-divider class="mt-3"></v-divider>
        <v-row class="my-1" align="center">
          <strong class="mx-3 info--text text--darken-3">
            All: {{ todos.length }}
          </strong>
          <v-divider vertical></v-divider>
          <strong class="mx-3 info--text text--darken-3">
            Remaining: {{ remainingTasks }}
          </strong>
          <v-divider vertical></v-divider>
          <strong class="mx-3 black--text">
            Completed: {{ completedTasks }}
          </strong>
          <v-spacer></v-spacer>
          <v-progress-circular
            :value="progress"
            class="mr-2"
          ></v-progress-circular>
        </v-row>

        <v-divider class="mb-3"></v-divider>

        <template v-for="(item, i) in todos">
          <v-divider v-if="i !== 0" :key="`${i}-divider`"></v-divider>
          <v-list-item :key="`${i}-${item.text}`">
            <v-list-item-action>
              <v-checkbox
                v-model="item.done"
                @change="toggleTodo(item)"
                :color="(item.done && 'grey') || 'primary'"
                v-if="!editing"
              >
                <template v-if="!editing" v-slot:label>
                  <div
                    :class="(item.done && 'grey--text') || 'primary--text'"
                    class="ml-4"
                    v-text="item.text"
                    @dblclick="editing = true"
                  ></div>
                </template>
              </v-checkbox>
              <v-icon color="primary" v-else>edit</v-icon>
            </v-list-item-action>

            <v-spacer></v-spacer>

            <v-scroll-x-transition>
              <v-icon v-if="item.done" color="success">
                check
              </v-icon>
            </v-scroll-x-transition>
            <v-scroll-x-transition>
              <v-icon
                slot="activator"
                v-if="item.done"
                color="error"
                @click="removeTodo(item)"
              >
                close
              </v-icon>
            </v-scroll-x-transition>
          </v-list-item>
        </template>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
import AddItemField from "../todo/AddItemField";
import { mapActions } from "vuex";

export default {
  name: "TodoList",
  data: () => ({
    editing: false
  }),
  components: {
    AddItemField
  },
  computed: {
    todos() {
      return this.$store.state.todos;
    },
    completedTasks() {
      return this.todos.filter(todo => todo.done).length;
    },
    progress() {
      return (this.completedTasks / this.todos.length) * 100;
    },
    remainingTasks() {
      return this.todos.length - this.completedTasks;
    }
  },
  methods: {
    ...mapActions(["toggleTodo", "removeTodo"])
  }
};
</script>
