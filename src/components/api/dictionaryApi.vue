<template>
  <v-card dark class="full-width mt-2" style="min-height: 100px;">
    <div class="progress-linear-holder absolute">
      <v-progress-linear v-show="loader" :indeterminate="true"></v-progress-linear>
    </div>
    <div>
      <transition name="fade">
        <v-img
          class="black--text"
          :src="imgSource"
          gradient="to bottom, rgba(0,0,0,.05), rgba(0,0,0,.2)"
          :aspect-ratio="16 / 3"
        >
          <v-card-title primary-title class="justify-center">
            <h1 class="word-of-day">
              {{ wod.word | capitalize }}
              <v-btn text icon color="primary" @click="getWordAudio()">
                <v-icon large>volume_up</v-icon>
              </v-btn>
            </h1>
          </v-card-title>
          <v-card-subtitle class="text-center black--text">
            <i>{{ wod.partOfSpeech }}</i> | Pro-noun
          </v-card-subtitle>
          <v-card-text class="text-center">
            <div class="text--primary full-width">Meaning: {{ wod.defination }}</div>
            <div class="mt-3" v-for="example in wod.examples" :key="example.id">{{ example.text }}</div>
          </v-card-text>
          <v-card-actions>
            <v-list-item class="grow">
              <v-btn color="light-blue darken-1" @click.stop="openWordLink()">
                <v-icon class="mr-2">link</v-icon>Learn More on:
                <u>{{ wod.word }}</u>
              </v-btn>
              <v-row align="center" justify="end">
                <v-btn text icon>
                  <v-icon class="mr-1" large color="white">mdi-heart</v-icon>
                </v-btn>
                <span class="mr-1">·</span>
                <v-btn text icon color="light-blue darken-1" @click.stop="postOnTwitter()">
                  <v-icon class="mr-1" large>mdi-twitter</v-icon>
                </v-btn>
              </v-row>
            </v-list-item>
          </v-card-actions>
        </v-img>
      </transition>
      <div class="text-center ma-2">
        <v-snackbar color="error" v-model="snackbar">
          {{ errorMessage }}
          <v-btn dark text @click.native="snackbar = false">Close</v-btn>
        </v-snackbar>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "DictionaryApi",
  data: () => ({
    responseBody: "",
    wod: {
      word: "",
      defination: "",
      partOfSpeech: "",
      examples: ""
    },
    audioWord: "",
    loader: false,
    errorMessage: "",
    snackbar: false,
    baseUrl: "https://api.wordnik.com/v4/words.json/wordOfTheDay?api_key=",
    audioUrl1: "https://api.wordnik.com/v4/word.json/",
    audioUrl2: "/audio?useCanonical=false&limit=50&api_key=",
    APIKEY: "u1m1rcn6yqik1ti4wt0mb7ltqcz2gtp0xnbnacly5l05mgiis",
    imgSource: require("@/assets/pictures/white_bg.jpg")
  }),
  methods: {
    getWOD() {
      this.loader = true;
      this.$http
        .get(this.baseUrl + this.APIKEY)
        .then(response => {
          this.wod = {
            word: response.body.word,
            defination: response.body.definitions[0].text,
            partOfSpeech: response.body.definitions[0].partOfSpeech,
            examples: response.body.examples.slice(0, 2)
          };
          this.loader = false;
        })
        .catch(error => {
          this.errorMessage =
            "Sorry, we can't get new word of the day right now: " + error;
          this.snackbar = true;
        });
    },
    getWordAudio() {
      this.audioUrl = "";
      this.loader = true;
      this.$http
        .get(this.audioUrl1 + this.wod.word + this.audioUrl2 + this.APIKEY)
        .then(
          response => {
            this.audioWord = response.body[0].fileUrl;
            new Audio(this.audioWord).play();
            this.loader = false;
          },
          errorResponse => {
            this.errorMessage =
              "Sorry, we can't get audio of the word right now: " +
              errorResponse.body.message;
            this.snackbar = true;
            this.loader = false;
          }
        )
        .catch(error => {
          this.errorMessage =
            "Sorry, we can't get new word of the day right now: " + error;
          this.snackbar = true;
        });
    },
    postOnTwitter() {
      window.open(
        "https://twitter.com/intent/tweet/?text=" +
          this.wod.word +
          "&hashtags=wordoftheday"
      );
    },
    openWordLink() {
      window.open("https://www.wordnik.com/words/" + this.wod.word);
    }
  },
  created() {
    this.getWOD();
  },
  filters: {
    capitalize(word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }
  }
};
</script>

<style>
.word-of-day {
  font-size: 5.25em;
  letter-spacing: 0.03em;
  line-height: 0.9em;
  display: inline-block;
  font-weight: 300;
  font-family: "Playfair Display", serif;
  text-align: center;
  height: 100px;
}
</style>
