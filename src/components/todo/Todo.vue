<!--template->
  <v-list-tile class="todo-item" :class="{ 'editing': editing}">
    <v-list-tile-action>
      <v-checkbox @change="toggleTodo(todo)" color="primary" label="hello" v-if="!editing"></v-checkbox>
      <v-icon color="primary" v-else>edit</v-icon>
    </v-list-tile-action>
    <template></template>
  </v-list-tile>
</!--template->

<script>
export default {
  data: () => ({
    editing: false
  })
};
</script>

<style scoped>
.todo-item {
  height: auto;
  padding-top: 12px;
  padding-bottom: 12px;
}
</style>