<template>
  <v-card class="mx-auto mt-12" max-width="500">
    <v-toolbar color="indigo" dark>
      <v-icon class="mx-4">list</v-icon>
      <v-toolbar-title>TODO Lists</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-toolbar>
    <v-card-text>
      <v-container fluid>
        <AddItemField ref="inputItem" />
        <v-list subheader>
          <Item v-for="(item, index) in todos" :key="index" :todo="item" />
        </v-list>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
import AddItemField from "../todo/AddItemField";
import Item from "../todo/Item";

export default {
  name: "TodoList",
  components: {
    AddItemField,
    Item
  },
  computed: {
    todos() {
      return this.$store.state.todos;
    }
  },
  methods: {
    addTodo() {
      this.$refs.inputItem.addTodo();
    }
  }
};
</script>
