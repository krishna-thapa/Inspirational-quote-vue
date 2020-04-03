<template>
  <div id="homepage">
    <v-content :class="selectedBackground">
      <v-container fill-height>
        <v-layout row justify-center align-center>
          <v-flex xs6 sm6>
            <v-card class="full-width" style="min-height: 250px;">
              <div class="progress-linear-holder absolute">
                <v-progress-linear v-show="loader" :indeterminate="true"></v-progress-linear>
              </div>
              <transition name="fade">
                <div v-if="quote">
                  <v-btn
                    absolute
                    dark
                    fab
                    top
                    right
                    :class="selectedBackground"
                    @click.stop="refreshQuote"
                  >
                    <v-icon>refresh</v-icon>
                  </v-btn>
                  <v-card-text class="grey--text">
                    <v-icon large class="block center">format_quote</v-icon>
                    <div class="quote-content" v-html="quote.body"></div>
                    <div class="subheading right-align mb-0" v-html="'- ' + quote.author"></div>
                  </v-card-text>
                  <v-card-actions class="align-start">
                    <v-btn
                      flat
                      icon
                      color="light-blue darken-1"
                      @click.stop="window.open('https://twitter.com/intent/tweet/?text='+quote.quote+'&hashtags=quotes,taha_azzabi');"
                    >
                      <v-icon>fab fa-twitter</v-icon>
                    </v-btn>
                    <v-switch label="Auto-Refreshing Quote" v-model="random"></v-switch>
                  </v-card-actions>
                </div>
              </transition>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
      <p>fdgsdfgsdfg</p>
      <v-snackbar color="error" v-model="snackbar">
        {{ errorMessage }}
        <v-btn dark flat @click.native="snackbar = false">Close</v-btn>
      </v-snackbar>
    </v-content>
  </div>
</template>

<script>

export default {
  name: "HomePage",
  data: () => ({
    quote: "",
    random: false,
    loader: false,
    errorMessage: "",
    randomQuote: "",
    snackbar: false,
    backgrounds: [
      "blue-yellow",
      "orange-yellow",
      "purple-blue",
      "sky-blue",
      "green-blue",
      "pink"
    ],
    selectedBackground: "pink"
  }),
  methods: {
    refreshQuote() {
      this.quote = "";
      this.randomBackground();
      this.loader = true;
      this.$http
        .get("https://favqs.com/api/qotd")
        .then(response => {
          this.quote = response.body.quote;   
          this.loader = false;
        })
        .catch(error => {
          this.errorMessage = "Sorry, we can't get new quote right now" + error;
          this.snackbar = true;
        });
    },
    randomBackground() {
      this.selectedBackground = this.backgrounds[
        Math.floor(Math.random() * this.backgrounds.length)
      ];
    },
    clearRandomQuote() {
      this.random = false;
      clearInterval(this.randomQuote);
    }
  },
  created() {
    this.refreshQuote();
  },
  watch: {
    random(val) {
      if (val) {
        this.sliderTime = true;
        this.refreshQuote();
        this.randomQuote = setInterval(this.refreshQuote, 9000);
      } else {
        this.clearRandomQuote();
      }
    }
  }
};
</script>

<style scoped src="@/assets/styles/background.css">
</style>
