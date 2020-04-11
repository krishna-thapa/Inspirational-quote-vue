<!--<template>
  <v-list-item class="todo-tem" :class="{'editing' : editing }">
    <v-list-item-action>
      <v-checkbox
        :input-value="todo.done"
        @change="toggleTodo(todo)"
        color="primary"
        v-if="!editing"
      ></v-checkbox>
      <v-icon color="primary" v-else>edit</v-icon>
    </v-list-item-action>
    <template v-if="!editing">
      <v-list-item-content
        :class="{ 'primary--text': todo.done }"
        @dblclick="editing = true"
      >{{ todo.text }}</v-list-item-content>
      <v-list-item-action>
        <v-btn color="red lighten-3" @click="removeTodo(todo)" text icon>
          <v-icon>close</v-icon>
        </v-btn>
      </v-list-item-action>
    </template>
    <v-text-field
      :value="todo.text"
      @blur="doneEdit"
      @keyup.enter="doneEdit"
      @keyup.esc="cancelEdit"
      clearable
      color="primary"
      flat
      hide-details
      maxlength="1023"
      ref="input"
      solo
      v-else
      v-focus="editing"
    ></v-text-field>
  </v-list-item>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: ["todo"],
  data: () => ({
    editing: false
  }),
  methods: {
    ...mapActions(["editTodo", "removeTodo", "toggleTodo"]),
    doneEdit(e) {
      const value = e.target.value.trim();
      const { todo } = this;
      if (!value) {
        this.removeTodo(todo);
      } else if (this.editing) {
        this.editTodo({
          todo,
          value
        });
        this.editing = false;
      }
    },
    cancelEdit() {
      this.editing = false;
    }
  }
};
</script>