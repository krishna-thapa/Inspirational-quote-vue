<template>
  <v-text-field
    v-model="newTodoTitle"
    name="newTodoTitle"
    counter="50"
    label="What's your dream?"
    @keydown.enter.prevent="addTodo"
    :rules="rules"
    solo
  >
    <v-fade-transition slot="append">
      <v-icon v-if="newTodoTitle" @click="addTodo">add_circle</v-icon>
    </v-fade-transition>
  </v-text-field>
</template>

<script>
export default {
  name: "AddItemFieldaddTodo",
  data() {
    return {
      newTodoTitle: "",
      isValid: {
        unique: value =>
          this.$store.state.todos.filter(todo => todo.title === value)
            .length === 0
      },
      rules: [
        v => (v != null && v.length <= 25) || "Max 25 characters",
        value =>
          this.isValid.unique((value || "").trim()) ||
          `The todo is already in the list` // TODO: Not working atm
      ]
    };
  },
  methods: {
    addTodo() {
      if (this.newTodoTitle) {
        this.$store.dispatch("addTodo", this.newTodoTitle.trim());
      }
      this.newTodoTitle = null;
    }
  }
};
</script>
