<template>
  <v-list-item class="todo-item">
    <v-list-item-action>
      <v-checkbox color="primary" v-model="todo.done"> </v-checkbox>
    </v-list-item-action>
    <v-list-item-content>
      <v-list-item-title
        v-html="todo.text"
        v-bind:class="[todo.done ? 'done' : '']"
      ></v-list-item-title>
    </v-list-item-content>
    <v-list-item-action>
      <v-icon color="primary" @click="dialog = true">delete</v-icon>
    </v-list-item-action>
    <v-dialog v-model="dialog" max-width="240">
      <v-card>
        <v-card-title>Confirm Removal</v-card-title>
        <v-card-text>Remove?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="cyan" text @click="dialog = false">
            Cancel
          </v-btn>
          <v-btn
            color="cyan"
            text
            @click="
              removeTodo(todo);
              dialog = false;
            "
          >
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-list-item>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Todo",
  props: ["todo"],
  data() {
    return {
      dialog: false
    };
  },
  computed: {
    text() {
      return this.todo.text;
    }
  },
  methods: {
    ...mapActions(["toggleTodo", "removeTodo"])
  }
};
</script>

<style scoped>
.done {
  text-decoration: line-through;
}

.todo-item {
  height: auto;
  padding-top: 12px;
  padding-bottom: 12px;
}
</style>
