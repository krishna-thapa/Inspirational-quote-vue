<template>
  <v-card>
    <div class="progress-linear-holder absolute">
      <v-progress-linear v-show="loader" :indeterminate="true"></v-progress-linear>
    </div>
    <div>
      <transition name="fade">
        <v-img
          class="white--text"
          :src="imgSource"
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
          :aspect-ratio="16 / 3"
        >
          <v-card-title class="headline" dark>Word of the Day</v-card-title>
          <v-card-text lass="white--text">
            <p class="display-1 text--primary">
              {{ wod.word }}
              <v-btn text icon color="primary" @click="getWordAudio()">
                <v-icon large>volume_up</v-icon>
              </v-btn>
            </p>
            <p>{{ wod.partOfSpeech }}</p>
            <div class="text--primary">{{ wod.defination }}</div>
            <div v-for="example in wod.examples" :key="example.id">
              <p>{{ example.text }}</p>
            </div>
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
    APIKEY: "",
    imgSource: require("@/assets/pictures/Phewa_lake.jpg")
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
            examples: response.body.examples
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
        .get(this.audioUrl1 + "banfana" + this.audioUrl2 + this.APIKEY)
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
  }
};
</script>
<style>
</style>
