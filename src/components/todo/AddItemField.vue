<template>
  <v-form ref="form">
    <v-text-field
      v-model="newTodoTitle"
      :error-messages="errors.collect('newTodoTitle')"
      name="newTodoTitle"
      counter="25"
      data-vv-as="Todo"
      color="cyan"
      label="What to do?"
      @keydown.enter.prevent="addTodo"
      :rules="rules"
      ref="field"
      append-outer-icon="add"
      @click:append-outer="addTodo"
      clearable
      hide-details="auto"
    />
  </v-form>
</template>

<script>
export default {
  name: "AddItemField",
  data() {
    return {
      newTodoTitle: "",
      isValid: {
        unique: value =>
          this.$store.state.todos.filter(todo => todo.title === value)
            .length === 0
      },
      rules: [
        value => !!value || "Required.",
        v => (v != null && v.length <= 25) || "Max 25 characters",
        value =>
          this.isValid.unique((value || "").trim()) ||
          `The todo is already in the list` // TODO: Not working atm
      ]
    };
  },
  methods: {
    addTodo() {
      this.$validator.validateAll();
      if (
        this.isVeeValidationPassed() &&
        this.isValid.unique(this.newTodoTitle)
      ) {
        this.$store.dispatch("addTodo", this.newTodoTitle.trim());
        this.newTodoTitle = "";
        this.$refs.field.blur();
        this.$validator.reset();
        this.$refs.form.reset();
      }
    },
    isVeeValidationPassed() {
      return Object.values(this.fields).reduce(
        (valid, field) => valid && field.valid,
        true
      );
    }
  }
};
</script>
