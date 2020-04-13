<template>
  <v-row>
    <v-col cols="12" align="center" justify="center">
      <v-sheet max-width="1000" elevation="4" tile class="mt-8">
        <div class="head-line pt-4">Draw some pixel art</div>
        <v-row>
          <v-col>
            <div class="pixel-painter mt-2">
              <div class="canvas">
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
              <div class="tools">
                <button
                  v-for="(btn, i) in buttons"
                  :key="i"
                  v-bind:style="{ backgroundColor: btn.color }"
                  v-bind:class="{ active : btn.active }"
                  v-bind:data-fn="btn.fn"
                  v-on:click="clickBtn(btn.fn, btn.color, i)"
                  class="btn"
                >{{btn.fn}}</button>
              </div>
            </div>
          </v-col>
          <v-col cols="4">
            <v-color-picker v-model="colors" class="mt-2 mr-12"></v-color-picker>
          </v-col>
        </v-row>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
//import Demo from "./demo.vue";

export default {
  data: () => ({
    colors: {},
    w: 25,
    h: 25,
    default_color: "transparent",
    selected_color: "red",
    pixels: [],
    buttons: [
      { fn: "eraser", color: "pink", active: false },
      { fn: "clear", color: "red", active: false },
      { fn: "save", color: "red", active: false }
    ]
  }),
  methods: {
    init: function() {
      this.resetCanvas();
    },
    resetCanvas: function() {
      var new_pixels = [];
      for (var i = 0; i < this.w * this.h; i++) {
        new_pixels.push(this.default_color);
      }
      this.pixels = new_pixels;
    },

    saveCanvas: function() {
      var req = {
        w: this.w,
        h: this.h,
        pixels: this.pixels
      };
      console.log(req);
    },

    clickBtn: function(fn, color) {
      switch (fn) {
        case "color":
          this.selected_color = color;
          break;
        case "eraser":
          this.selected_color = "transparent";
          break;
        case "clear":
          this.resetCanvas();
          break;
        case "save":
          this.saveCanvas();
          break;
      }
    },

    mouseDown: function(i, tf) {
      this.drawing = tf;
      if (tf) this.mouseOver(i);
    },
    mouseOver: function(i) {
      if (this.drawing) {
        this.$set(this.pixels, i, this.colors.hex);
      }
    }
  },

  components: {
    //Demo
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
  width: 500px;
  height: 500px;
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
.pixel-painter .tools .btn {
  all: unset;
  width: 66px;
  height: 66px;
  border: 1px solid white;
  margin: 10px -1px;
  position: relative;
  text-align: center;
  color: white;
}
</style>
