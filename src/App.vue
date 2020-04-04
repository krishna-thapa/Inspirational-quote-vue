<template>
  <v-app>
    <NavigationBar />

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
//import HomePage from "./components/homePage/HomePage";
import NavigationBar from "./components/navigationBar/NavigationBar";

export default {
  name: "App",

  components: {
    //HomePage,
    NavigationBar
  },

  data: () => ({
    //
  })
};
</script>
