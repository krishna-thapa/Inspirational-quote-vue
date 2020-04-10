<template>
  <div>
    <v-content>
      <v-container class="fill-height">
        <v-row>
          <v-col cols="12">
            <QuoteApi />
          </v-col>
          <v-col cols="12">
            <DictionaryApi>
              <h2>dfg</h2>
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
  data: () => ({})
};
</script>

<style scoped src="@/assets/styles/background.css">
</style>