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
import { ref, onMounted } from "vue";
import initMap from "./initMap";
const editMap = () => import("./editMap");
export default {
  props: ["lat", "lng"],
  async setup(props) {
    let markType = ref("type1");
    initMap(props.lat, props.lng);
    // await initMap(props.lat, props.lng);
    let markOnMap = editMap();
    return {
      markType,
      markOnMap,
    };
  },
  data() {
    return {};
  },
  methods: {
    markOne() {
      this.markType = "type1";
      map.on("click", this.markOnMap);
      map.off("click", this.rangeDraw);
    },
    markTwo() {
      this.markType = "type2";
      map.on("click", this.markOnMap);
      map.off("click", this.rangeDraw);
    },
    range() {
      map.on("click", this.rangeDraw);
      map.off("click", this.markOnMap);
    },
    rangeclose() {
      this.polyEditor.close();
    },
    rangeDraw(e) {
      let lng = e.lnglat.getLng();
      let lat = e.lnglat.getLat();
      this.polygonDraw("polyEditor", {
        path: [
          [lng, lat],
          [lng + 0.1, lat],
          [lng + 0.1, lat + 0.1],
          [lng, lat + 0.1],
        ],
        strokeColor: this.randomColor(),
        strokeWeight: 6,
        strokeOpacity: 0.2,
        fillOpacity: 0.4,
        fillColor: this.randomColor(),
        zIndex: 50,
        draggable: true,
      });
    },
    randomColor() {
      return "#" + Math.floor(0xffffff * Math.random()).toString(16);
    },
    // 多边形的绘制与编辑
    polygonDraw(polygonName, params) {
      var polygon = new window.AMap.Polygon(params);
      window.map.add(polygon);
      // 缩放地图到合适的视野级别
      window.map.setFitView([polygon]);
      polygon.on("mouseover", (e) => {
        this.openInfo(e);
      });
      polygon.on("mouseleave", (e) => {});
      this[polygonName] = new AMap.PolyEditor(window.map, polygon);
      polygon.on("click", (e) => {
        this[polygonName].open();
        console.log(this[polygonName]);
      });
    },
    // 在地图上标点
  },
};
</script>

<style lang="css">
.m-map {
  height: 80vh;
  width: 100vw;
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
