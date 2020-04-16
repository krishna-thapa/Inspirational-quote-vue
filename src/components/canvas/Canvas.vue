<template>
  <v-row>
    <v-col cols="12" align="center" justify="center">
      <v-sheet max-width="1000" min-height="600" elevation="4" tile class="mt-8">
        <div class="head-line pt-4">Draw some pixel art</div>
        <v-row>
          <v-col class="ml-6">
            <div class="pixel-painter mt-4">
              <div class="canvas" ref="canvas">
                <button
                  v-on:touchmove="mouseOver(i)"
                  v-on:touchstart="mouseDown(i, true)"
                  v-on:touchend="mouseDown(i, false)"
                  v-on:mouseover="mouseOver(i)"
                  v-on:mousedown="mouseDown(i, true)"
                  v-on:mouseup="mouseDown(i, false)"
                  v-for="(color, i) in pixels"
                  :key="i"
                  v-bind:style="{ backgroundColor: color }"
                  class="pixel"
                ></button>
              </div>
            </div>
          </v-col>
          <v-col>
            <v-row justify="space-around" class="order-md10">
              <v-color-picker v-model="colors" class="mt-4 mr-12"></v-color-picker>
            </v-row>
            <v-row class="ml-7">
              <div class="mt-10 ml-6">
                <v-btn :color="colors.hex" class="mr-4" v-on:click="current" rounded></v-btn>
                <v-btn
                  icon
                  v-for="btn in buttons"
                  :key="btn.fn"
                  class="mx-4"
                  v-on:click="clickBtn(btn.fn)"
                >
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-icon dark x-large v-on="on" :color="btn.color">{{ btn.icon }}</v-icon>
                    </template>
                    <span>{{ btn.fn | capitalize }}</span>
                  </v-tooltip>
                </v-btn>
              </div>
            </v-row>
            <v-row style="width: 11em">
              <v-progress-linear
                color="light-blue accent-4"
                indeterminate
                rounded
                height="6"
                class="mt-5"
                v-show="loader"
              ></v-progress-linear>
            </v-row>
          </v-col>
        </v-row>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
import domtoimage from "dom-to-image";
import download from "downloadjs";

export default {
  data: () => ({
    colors: {},
    eraserFlag: false,
    loader: false,
    w: 25,
    h: 25,
    transparent: "transparent",
    pixels: [],
    buttons: [
      { fn: "eraser", icon: "mdi-eraser", color: "light-blue accent-4" },
      { fn: "clear", icon: "delete_sweep", color: "red" },
      { fn: "save", icon: "mdi-content-save", color: "light-blue accent-4" }
    ]
  }),
  methods: {
    init: function() {
      this.resetCanvas();
    },
    resetCanvas: function() {
      var new_pixels = [];
      for (var i = 0; i < this.w * this.h; i++) {
        new_pixels.push(this.transparent);
      }
      this.pixels = new_pixels;
      this.eraserFlag = false;
    },

    current() {
      this.eraserFlag = false;
    },

    clickBtn: function(fn) {
      switch (fn) {
        case "eraser":
          this.eraserFlag = true;
          break;
        case "clear":
          this.resetCanvas();
          break;
        case "save":
          this.saveImage();
          break;
      }
    },

    mouseDown: function(i, tf) {
      this.drawing = tf;
      if (tf) this.mouseOver(i);
    },
    mouseOver: function(i) {
      if (this.drawing) {
        if (this.eraserFlag) {
          this.$set(this.pixels, i, this.transparent);
        } else {
          this.$set(this.pixels, i, this.colors.hex);
        }
      }
    },

    saveImage() {
      this.loader = true;

      try {
        setTimeout(async () => {
          const refs = this.$refs;
          const drawGrid = refs.canvas;
          const file = await domtoimage.toBlob(drawGrid);
          download(file, "vue-pixel-art.png", "image/png");
          this.loader = false;
        });
      } catch (error) {
        this.loader = false;
        console.error("oops, something went wrong!", error);
      }
    }
  },
  filters: {
    capitalize(word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }
  },
  created() {
    this.init();
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=VT323");

.head-line {
  font-family: VT323;
  font-size: 32px;
  font-style: italic;
  font-variant: normal;
  font-weight: 500;
  line-height: 9.9px;
  color: #0091ea;
}
.my-canvas {
  max-width: 500px;
  max-height: 500px;
  border: 1px #000 solid;
  background-color: lightgrey;
  display: -webkit-box;
  display: flex;
}

.pixel-painter .canvas {
  width: 500px;
  height: 500px;
  background-color: lightgrey;
  display: flex;
  flex-flow: row wrap;
}
.pixel-painter .canvas .pixel {
  all: inherit;
  width: 20px;
  height: 20px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  cursor: crosshair;
  position: relative;
}
.pixel-painter .canvas .pixel:after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.2);
  opacity: 0;
}
.pixel-painter .canvas .pixel:hover:after {
  opacity: 1;
}
</style>
