<template>
  <div>
    <v-row>
      <v-col cols="12">
        <QuoteApi />
      </v-col>
      <v-col cols="12">
        <DictionaryApi />
      </v-col>
    </v-row>
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