<template>
  <div>
    <v-app-bar color="deep-purple accent-4" dense dark>
      <v-toolbar app>
        <v-app-bar-nav-icon class="hidden-sm-and-up" @click="sidebar = !sidebar"></v-app-bar-nav-icon>

        <v-toolbar-title>
          <router-link to="/" tag="span" style="cursor: pointer">{{ appTitle }}</router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-xs-only">
          <v-btn flat v-for="item in menuItems" :key="item.title" :to="item.path">
            <v-icon left dark>{{ item.icon }}</v-icon>
            {{ item.title }}
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </v-app-bar>

    <v-navigation-drawer v-model="sidebar" absolute temporary dark>
      <v-list-item>
        <v-list-item-avatar>
          <!--v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img-->
          <v-icon large>account_circle</v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>John Leider</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item v-for="item in menuItems" :key="item.title" :to="item.path">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      appTitle: "Inspirational Quote",
      sidebar: false,
      menuItems: [
        { title: "Home", path: "/home", icon: "home" },
        { title: "Search", path: "/home", icon: "mdi-magnify" },
        { title: "Sign Up", path: "/signup", icon: "face" },
        { title: "Sign In", path: "/signin", icon: "lock_open" }
      ]
    };
  }
};
</script>

<style>
</style>