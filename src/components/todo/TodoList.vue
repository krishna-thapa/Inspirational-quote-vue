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
          <strong class="mx-3 info--text text--darken-3">All: {{ todos.length }}</strong>
          <v-divider vertical></v-divider>
          <strong class="mx-3 info--text text--darken-3">Remaining: {{ remainingTasks }}</strong>
          <v-divider vertical></v-divider>
          <strong class="mx-3 black--text">Completed: {{ completedTasks }}</strong>
          <v-spacer></v-spacer>
          <v-progress-circular :value="progress" color="#0091ea" class="mr-6"></v-progress-circular>
        </v-row>

        <v-divider class="mb-3"></v-divider>
        <v-dialog persistent v-model="editing" max-width="400" :data="modalData">
          <v-card>
            <v-card-title>Edit Item:</v-card-title>
            <v-card-text>
              <v-text-field
                :value="modalData.text"
                v-model="editedText"
                clearable
                color="primary"
                counter="50"
                :rules="rules"
              ></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="cyan" @click="cancelItem()">Cancel</v-btn>
              <v-btn color="cyan" @click="editTodo(editedText)">OK</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <template v-for="(item, i) in todos">
          <v-divider v-if="i !== 0" :key="`${i}-divider`"></v-divider>
          <v-list-item :key="`${i}-${item.text}`">
            <v-list-item-action>
              <v-checkbox
                :input-value="item.done"
                @change="toggleTodo(item)"
                :color="(item.done && 'grey') || 'primary'"
              >
                <template v-slot:label>
                  <div
                    :class="(item.done && 'grey--text') || 'primary--text'"
                    class="ml-4"
                    v-text="item.text"
                  ></div>
                </template>
              </v-checkbox>
            </v-list-item-action>

            <v-spacer></v-spacer>

            <v-scroll-x-transition>
              <v-icon class="mr-4" color="green darken-2" @click="openModal(item)">edit</v-icon>
            </v-scroll-x-transition>
            <v-scroll-x-transition>
              <v-icon slot="activator" color="error" @click="removeTodo(item)">mdi-delete</v-icon>
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
    editing: false,
    modalData: "",
    editedText: "",
    rules: [v => (v != null && v.length <= 50) || "Max 50 characters"]
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
    ...mapActions(["toggleTodo", "removeTodo", "editTodo"]),
    doneEdit(item) {
      const text = this.editedText.trim();
      console.log(item);
      this.editTodo({
        item,
        text
      });
      this.editing = false;
    },
    openModal(item) {
      this.modalData = item;
      this.editedText = this.modalData.text;
      this.editing = true;
    },
    cancelItem() {
      this.editing = false;
      this.modalData = "";
    }
  }
};
</script>
