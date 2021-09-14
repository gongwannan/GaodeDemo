/*
 * @Author: gongwannan
 * @Date: 2021-08-31 15:30:49
 * @LastEditTime: 2021-09-14 10:27:21
 * @LastEditors: gongwannan
 * @Description: 
 * @FilePath: \GaodeDemo\src\components\initMap.js
 */
import remoteLoad from "@/utils/remoteLoad.js";
import {
    MapKey,
    MapCityName
} from "@/config/config";
export default async function initMap(lat, lng) {
    // 已载入高德地图API，则直接初始化地图
    if (window.AMap && window.AMapUI && AMap.PolyEditor) {
        initLoadedMap();
        console.log('地图初始化完成')
        // 未载入高德地图API，则先载入API再初始化
    } else {
        await remoteLoad(
            `https://webapi.amap.com/maps?v=1.4.15&key=${MapKey}&plugin=AMap.PolyEditor`
        );
        await remoteLoad("https://webapi.amap.com/ui/1.0/main.js");
        await remoteLoad(
            "https://a.amap.com/jsapi_demos/static/demo-center/js/demoutils.js"
        );
        initLoadedMap();
        console.log('地图初始化完成')
    }
    // 初始化地图
    function initLoadedMap() {
        // 加载PositionPicker，loadUI的路径参数为模块名中 'ui/' 之后的部分
        let AMapUI = window.AMapUI;
        let AMap = window.AMap;
        AMapUI.loadUI(["misc/PositionPicker"], (PositionPicker) => {
            let mapConfig = {
                zoom: 16,
                cityName: MapCityName,
            };
            if (lat && lng) {
                mapConfig.center = [lng, lat];
            }
            let map = (window.map = new AMap.Map("js-container", mapConfig));
            // 加载地图搜索插件
            AMap.service("AMap.PlaceSearch", () => {
                let placeSearch = new AMap.PlaceSearch({
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
        });
    }
}