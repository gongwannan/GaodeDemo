<!--
 * @Author: your name
 * @Date: 2021-08-05 14:03:38
 * @LastEditTime: 2021-09-14 10:26:47
 * @LastEditors: gongwannan
 * @Description: 
 * @FilePath: \GaodeDemo\src\pages\index.vue
-->
<template>
  <div class="content">
    <Map></Map>
    <canvas id="drawing" class="canvas"></canvas>
    <div v-translate>name</div>
  </div>
</template>

<script lang="ts">
import Map from "../components/map.vue";
export default {
  setup() {},
  components: { Map },
  data() {
    return {};
  },
  methods: {},
  mounted() {
    let debounceFunc = this.debounceSimple(console.log, 500);
    window.addEventListener("mousemove", debounceFunc);
    let drawing: any = document.getElementById("drawing");
    console.log(drawing);
    if (drawing.getContext) {
      let context = drawing.getContext("2d");
      context.fillStyle = "red";
      context.fillRect(0, 0, 50, 50);
    }
  },
};
</script>

<style lang="sass" scoped>
.content
  height: 100vh
  width: 100vw

.canvas
  height: 100px
  width: 100px
</style>