
<!-- NOT IN USE ATM
<template>
  <div class="text-center ma-2">
    <v-snackbar color="error" v-model="snackbar">
      {{ errorMessage }}
      <v-btn dark text @click.native="snackbar = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: "ErrorMsg",
  data: () => ({
    snackbar: Boolean,
    errorMessage: ""
  }),
  props: {
    error: {
      type: Boolean
    },
    errorMsg: {
      type: String
    }
  },
  mounted() {
    this.snackbar = this.error;
    this.errorMessage = this.errorMsg;
  }
};
</script>