<template>
  <div>
    <v-app-bar color="primary" dense>
      <v-toolbar>
        <v-app-bar-nav-icon class="hidden-sm-and-up" @click="sidebar = !sidebar"></v-app-bar-nav-icon>
        <v-toolbar-title>
          <router-link to="/" tag="span" style="cursor: pointer" class="app-title nav-text">
            <v-icon large color="#5288c7">favorite</v-icon>
            {{ appTitle }}
          </router-link>
        </v-toolbar-title>
        <v-spacer />
        <v-toolbar-title>
          <div
            @click="clicked"
            class="clock-style d-none d-md-block nav-text"
            :class="faded"
            style="cursor: pointer"
          >
            <span v-if="Htime">{{ homeTime }}</span>
            <span v-if="Atime">{{ awayTime }}</span>
          </div>
        </v-toolbar-title>
        <v-spacer />
        <v-toolbar-items class="hidden-xs-only">
          <v-btn icon v-for="item in menuItems" :key="item.title" :to="item.path" class="mx-2">
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon dark v-on="on">{{ item.icon }}</v-icon>
              </template>
              <span>{{ item.title }}</span>
            </v-tooltip>
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
          <v-list-item-title>Krishna Thapa</v-list-item-title>
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
</template>https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg

<script>
import moment from "moment-timezone";

export default {
  data() {
    return {
      appTitle: "Inspirational Quote",
      sidebar: false,
      menuItems: [
        { title: "Home", path: "/apiDemo/dictionaryApi", icon: "home" },
        { title: "Search", path: "/search", icon: "mdi-magnify" },
        { title: "Sign Up", path: "/signup", icon: "face" },
        { title: "Sign In", path: "/signin", icon: "lock_open" }
      ],
      Htime: true,
      Atime: false,
      faded: "",
      homeTime: moment.tz(moment(), "Europe/London").format("llll UK"),
      awayTime: moment.tz(moment(), "Asia/Kathmandu").format("llll NP")
    };
  },
  methods: {
    clicked() {
      if (this.Htime) {
        (this.faded = "faded"),
          setTimeout(() => {
            this.faded = "";
            this.Htime = false;
            this.Atime = true;
          }, 200);
      } else if (this.Atime) {
        (this.faded = "faded"),
          setTimeout(() => {
            this.faded = "";
            this.Atime = false;
            this.Htime = true;
          }, 200);
      }
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Grand+Hotel");

.app-title {
  font-size: 1.7em;
  font-weight: 550;
}

.clock-style {
  text-align: center;
  font-size: 1.2em;
}

.nav-text {
  font-family: "Grand Hotel", sans-serif;
  color: #5288c7;
}

.faded {
  opacity: 0;
  transition: 0.2s;
}
</style>