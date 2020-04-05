<template>
  <div id="dictionaryApi">
    <v-card>
      <v-card-text>
        <div>Word of the Day</div>
        <p class="display-1 text--primary">be•nev•o•lent</p>
        <p>adjective</p>
        <div class="text--primary">
          well meaningcccccccccccc and kindly. well meaningcccccccccccc and kindly well meaningcccccccccccc and kindly
          <slot></slot>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn text color="deep-purple accent-4">Learn More</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "DictionaryApi"
};
</script>
<style>
.full-width {
  width: 100%;
}
</style>
