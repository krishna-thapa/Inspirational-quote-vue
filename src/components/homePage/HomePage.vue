<template>
  <div>
    <v-content :class="selectedBackground">
      <v-container class="fill-height">
        <v-layout row justify-center align-center>
          <v-flex xs7 sm7>
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
                    <v-icon>mdi-refresh</v-icon>
                  </v-btn>
                  <v-card-text class="grey--text">
                    <v-row align="center" justify="center">
                      <v-icon large>format_quote</v-icon>
                    </v-row>
                    <div class="quote-content" v-html="quote.body"></div>
                    <v-row align="center" justify="center">
                      <div class="subheading author-content" v-html="'- ' + quote.author"></div>
                    </v-row>
                    <span class="my-4 subtitle-1" v-for="tag in quote.tags" :key="tag">
                      <v-icon small>mdi-tag</v-icon>
                      • {{ tag }}
                    </span>
                  </v-card-text>
                  <v-card-actions>
                    <v-list-item class="grow">
                      <v-switch label="Auto-Refreshing Quote" v-model="random"></v-switch>
                      <v-row align="center" justify="end">
                        <v-icon class="mr-1">mdi-heart</v-icon>
                        <span class="subheading mr-2">{{ quote.favorites_count }}</span>
                        <span class="mr-1">·</span>
                        <v-icon class="mr-1">mdi-thumb-up</v-icon>
                        <span class="subheading mr-2">{{ quote.upvotes_count }}</span>
                        <span class="mr-1">·</span>
                        <v-icon class="mr-1">mdi-thumb-down</v-icon>
                        <span class="subheading mr-2">{{ quote.downvotes_count }}</span>
                        <span class="mr-1">·</span>
                        <v-btn
                          text
                          icon
                          color="light-blue darken-1"
                          @click.stop="window.open('https://twitter.com/intent/tweet/?text='+quote.quote+'&hashtags=quotes,taha_azzabi');"
                        >
                          <v-icon class="mr-1" large>mdi-twitter</v-icon>
                        </v-btn>
                      </v-row>
                    </v-list-item>
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
        <v-btn dark text @click.native="snackbar = false">Close</v-btn>
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
