<!--
 * @Author: gongwannan
 * @Date: 2021-08-30 11:00:05
 * @LastEditTime: 2021-09-14 14:22:09
 * @LastEditors: gongwannan
 * @Description: 
 * @FilePath: \GaodeDemo\src\components\map.vue
-->
<template>
  <div class="m-map">
    <div id="js-container" class="map">正在加载数据 ...</div>
    <button @click="markOne()">标记1</button>
    <button @click="markTwo()">标记2</button>
    <button @click="range()">围栏划分</button>
    <button @click="rangeClose()">围栏划分结束</button>
  </div>
</template>

<script>
import initMap from "./initMap";
import { markOne, markTwo, range, rangeClose } from "./editMap.js";
let timer, context, args;
export default {
  props: ["lat", "lng"],
  setup(props) {
    initMap(props.lat, props.lng);
    return { markOne, markTwo, range, rangeClose };
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="sass" scoped>
</style>
