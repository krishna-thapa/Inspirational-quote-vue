<template>
  <v-app>
    <NavigationBar />
    <v-content :class="selectedBackground">
      <router-view></router-view>
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