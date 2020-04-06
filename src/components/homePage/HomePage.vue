<template>
  <div>
    <v-content :class="selectedBackground">
      <v-container class="fill-height">
        <v-row>
          <v-col cols="12">
            <QuoteApi
              v-bind:background="selectedBackground"
              v-on:backgroundUpdated="updateBackground"
            />
          </v-col>
          <v-col cols="12">
            <DictionaryApi>
              <h2>{{ selectedBackground }}</h2>
            </DictionaryApi>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </div>
</template>

<script>
import DictionaryApi from "../api/dictionaryApi";
import QuoteApi from "../api/quoteApi";

export default {
  name: "HomePage",
  components: { DictionaryApi, QuoteApi },
  data: () => ({
    selectedBackground: "pink"
  }),
  methods: {
    // get the emitted value from child
    updateBackground(newBackground) {
      this.selectedBackground = newBackground;
    }
  }
};
</script>

<style scoped src="@/assets/styles/background.css">
</style>