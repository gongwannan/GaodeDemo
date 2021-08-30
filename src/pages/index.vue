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
import remoteLoad from "@/utils/remoteLoad.js";
import { MapKey, MapCityName } from "@/config/config";
export default {
  props: ["lat", "lng"],
  data() {
    return {
      dragStatus: false,
      AMapUI: null,
      AMap: null,
      map: null,
      markType: "type1",
    };
  },
  methods: {
    // 实例化地图
    initMap() {
      // 加载PositionPicker，loadUI的路径参数为模块名中 'ui/' 之后的部分
      let AMapUI = (this.AMapUI = window.AMapUI);
      let AMap = (this.AMap = window.AMap);
      AMapUI.loadUI(["misc/PositionPicker"], (PositionPicker) => {
        let mapConfig = {
          zoom: 16,
          cityName: MapCityName,
        };
        if (this.lat && this.lng) {
          mapConfig.center = [this.lng, this.lat];
        }
        let map =
          (window.map =
          this.map =
            new AMap.Map("js-container", mapConfig));
        // 加载地图搜索插件
        AMap.service("AMap.PlaceSearch", () => {
          this.placeSearch = new AMap.PlaceSearch({
            pageSize: 5,
            pageIndex: 1,
            citylimit: true,
            city: MapCityName,
            map: map,
            panel: "js-result",
          });
        });
        // 启用工具条
        AMap.plugin(["AMap.ToolBar"], function () {
          map.addControl(
            new AMap.ToolBar({
              position: "RB",
            })
          );
        });
        // 创建地图拖拽
        let positionPicker = new PositionPicker({
          mode: "dragMap", // 设定为拖拽地图模式，可选'dragMap'、'dragMarker'，默认为'dragMap'
          map: map, // 依赖地图对象
        });
        // 拖拽完成发送自定义 drag 事件
        positionPicker.on("success", (positionResult) => {
          // 过滤掉初始化地图后的第一次默认拖放
          if (!this.dragStatus) {
            this.dragStatus = true;
          } else {
            this.$emit("drag", positionResult);
          }
        });
        // 启动拖放
        positionPicker.start();
        map.on("click", this.markOnMap);
      });
    },
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
    openInfo(e) {
      //构建信息窗体中显示的内容
      var info = [];
      info.push(
        '<div><div><img style="float:left;" src=" https://webapi.amap.com/images/autonavi.png "/></div> '
      );
      info.push('<div style="padding:0px 0px 0px 4px;"><b>高德软件</b>');
      info.push("电话 : 010-84107000   邮编 : 100102");
      info.push("地址 :北京市朝阳区望京阜荣街10号首开广场4层</div></div>");
      let infoWindow = new window.AMap.InfoWindow({
        content: info.join("<br/>"), //使用默认信息窗体框样式，显示信息内容
      });
      infoWindow.open(map, e.lnglat);
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
    markOnMap(e) {
      let lng = e.lnglat.getLng();
      let lat = e.lnglat.getLat();
      var startIcon = new AMap.Icon({
        // 图标尺寸
        size: new AMap.Size(25, 34),
        // 图标的取图地址
        image:
          "//a.amap.com/jsapi_demos/static/demo-center/icons/dir-marker.png",
        // 图标所用图片大小
        imageSize: new AMap.Size(135, 40),
        // 图标取图偏移量
        imageOffset: new AMap.Pixel(-9, -3),
      });
      var viaMarker = null;
      if (this.markType == "type1") {
        viaMarker = new AMap.Marker({
          position: new AMap.LngLat(lng, lat),
          // 将一张图片的地址设置为 icon
          icon: "//a.amap.com/jsapi_demos/static/demo-center/icons/dir-via-marker.png",
          // 设置了 icon 以后，设置 icon 的偏移量，以 icon 的 [center bottom] 为原点
          offset: new AMap.Pixel(-13, -30),
        });
      } else {
        // 将 icon 传入 marker
        viaMarker = new AMap.Marker({
          position: new AMap.LngLat(lng, lat),
          icon: startIcon,
          offset: new AMap.Pixel(-13, -30),
        });
      }
      viaMarker.on("click", (e) => {
        console.log(e);
      });
      viaMarker.on("mouseover", (e) => {
        this.openInfo(e);
      });
      map.add([viaMarker]);
    },
  },
  async created() {
    // 已载入高德地图API，则直接初始化地图
    if (window.AMap && window.AMapUI && AMap.PolyEditor) {
      this.initMap();
      // 未载入高德地图API，则先载入API再初始化
    } else {
      await remoteLoad(
        `https://webapi.amap.com/maps?v=1.4.15&key=${MapKey}&plugin=AMap.PolyEditor`
      );
      await remoteLoad("https://webapi.amap.com/ui/1.0/main.js");
      await remoteLoad(
        "https://a.amap.com/jsapi_demos/static/demo-center/js/demoutils.js"
      );
      this.initMap();
    }
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
