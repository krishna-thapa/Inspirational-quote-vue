<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8">
        <v-card class="elevation-12">
          <v-window v-model="step">
            <v-window-item :value="1">
              <v-row class="fixed-height">
                <v-col cols="12" md="8">
                  <v-card-text class="mt-8">
                    <h1
                      class="text-center display-2 light-blue--text text--laccent-4"
                    >Sign in to Wonderland</h1>
                    <div class="text-center" mt-4>
                      <v-btn class="mx-2" fab color="black" outlined>
                        <v-icon>fab fa-facebook-f</v-icon>
                      </v-btn>
                      <v-btn class="mx-2" fab color="black" outlined>
                        <v-icon>fab fa-google-plus-g</v-icon>
                      </v-btn>
                    </div>
                    <h4 class="text-center mlt-4">Ensure your email for registration</h4>
                    <v-form>
                      <v-text-field
                        name="Email"
                        label="Email"
                        prepend-icon="email"
                        type="text"
                        color="light-blue laccent-4"
                      ></v-text-field>
                      <v-text-field
                        name="Password"
                        label="Password"
                        id="password"
                        prepend-icon="lock"
                        type="password"
                        color="light-blue laccent-4"
                      ></v-text-field>
                    </v-form>
                    <h3 class="text-center mt-3">Forget your password?</h3>
                  </v-card-text>
                  <div class="text-center mt-3">
                    <v-btn rounded color="light-blue laccent-4" dark>SIGN IN</v-btn>
                  </div>
                </v-col>
                <v-col cols="12" md="4" class="background-color">
                  <v-card-text class="white--text mt-8">
                    <h1 class="text-center display-1">Welcome to Wonderland</h1>
                    <h5 class="text-center">Enter your personal details and see the secrets.</h5>
                  </v-card-text>
                  <div class="text-center">
                    <v-btn rounded outlined dark @click="step++">SIGN UP</v-btn>
                  </div>
                </v-col>
              </v-row>
            </v-window-item>
            <v-window-item :value="2">
              <v-row class="fixed-height">
                <v-col cols="12" md="4" class="background-color">
                  <v-card-text class="white--text mt-8">
                    <h1 class="text-center display-1">Welcome Back!</h1>
                    <h5 class="text-center">To see the wonders please login with your personal info</h5>
                  </v-card-text>
                  <div class="text-center">
                    <v-btn rounded outlined dark @click="step--">SIGN IN</v-btn>
                  </div>
                </v-col>
                <v-col cols="12" md="8">
                  <v-card-text class="mt-8">
                    <h1
                      class="text-center display-2 light-blue--text text--laccent-4"
                    >Create Account</h1>
                    <div class="text-center mt-4">
                      <v-btn class="mx-2" fab color="black" outlined>
                        <v-icon>fab fa-facebook-f</v-icon>
                      </v-btn>
                      <v-btn class="mx-2" fab color="black" outlined>
                        <v-icon>fab fa-google-plus-g</v-icon>
                      </v-btn>
                    </div>
                    <h4 class="text-center mt-4">Ensure your email for registration</h4>
                    <v-form>
                      <v-text-field
                        name="Name"
                        label="Name"
                        prepend-icon="person"
                        type="text"
                        color="light-blue laccent-4"
                      ></v-text-field>
                      <v-text-field
                        name="Email"
                        label="Email"
                        prepend-icon="email"
                        type="text"
                        color="light-blue laccent-4"
                      ></v-text-field>
                      <v-text-field
                        name="Password"
                        label="Password"
                        id="password"
                        prepend-icon="lock"
                        type="password"
                        color="light-blue laccent-4"
                      ></v-text-field>
                    </v-form>
                  </v-card-text>
                  <div class="text-center mt-n5">
                    <v-btn rounded color="light-blue laccent-4" dark>SIGN UP</v-btn>
                  </div>
                </v-col>
              </v-row>
            </v-window-item>
          </v-window>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    step: 1
  })
};
</script>

<style scoped>
.fill-height {
  height: 80%;
}

.fixed-height {
  height: 500px;
}

.background-color {
  background-color: #0091ea;
  background-image: linear-gradient(180deg, #03a9f4 55%, #0d47a1 100%);
}
</style>
