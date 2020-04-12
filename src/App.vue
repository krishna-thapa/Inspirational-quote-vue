<template>
  <v-app>
    <NavigationBar />
    <v-content :class="selectedBackground">
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
import NavigationBar from "./components/navigationBar/NavigationBar";

export default {
  name: "App",
  components: {
    NavigationBar
  },
  data: () => ({}),
  computed: {
    ...mapState(["selectedBackground"])
  }
};
</script>

<style scoped src="@/assets/styles/background.css">
</style>