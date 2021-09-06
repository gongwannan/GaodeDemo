<!--
 * @Author: gongwannan
 * @Date: 2021-08-30 11:00:05
 * @LastEditTime: 2021-09-03 17:59:12
 * @LastEditors: gongwannan
 * @Description: 
 * @FilePath: \gaodeDemo\src\components\map.vue
-->
<template>
  <div class="m-map">
    <div id="js-container" class="map">正在加载数据 ...</div>
    <button @click="markOne()">标记1</button>
    <button @click="markTwo()">标记2</button>
    <button @click="range()">围栏划分</button>
    <button @click="rangeclose()">围栏划分结束</button>
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
  created() {
    let customFunc = this.debounce(console.log);
    window.addEventListener("mousemove", customFunc);
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="css">
.m-map {
  height: 95vh;
  width: 95vw;
  position: relative;
}
.m-map .map {
  width: 100%;
  height: 100%;
}
.m-map .search {
  position: absolute;
  top: 10px;
  left: 10px;
  width: 285px;
  z-index: 1;
}
.m-map .search input {
  width: 180px;
  border: 1px solid #ccc;
  line-height: 20px;
  padding: 5px;
  outline: none;
}
.m-map .search button {
  line-height: 26px;
  background: #fff;
  border: 1px solid #ccc;
  width: 50px;
  text-align: center;
}
.m-map .result {
  max-height: 300px;
  overflow: auto;
  margin-top: 10px;
}
</style>
