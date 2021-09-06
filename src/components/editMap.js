/*
 * @Author: gongwannan
 * @Date: 2021-09-03 14:54:54
 * @LastEditTime: 2021-09-03 16:20:26
 * @LastEditors: gongwannan
 * @Description: 
 * @FilePath: \gaodeDemo\src\components\editMap.js
 */
import {
    ref
} from 'vue'

let markType = ref("type1")

function markOne() {
    markType.value = "type1";
    map.on("click", markOnMap);
    map.off("click", rangeDraw);
}

function markTwo() {
    markType.value = "type2";
    map.on("click", markOnMap);
    map.off("click", rangeDraw);
}

function range() {
    map.on("click", rangeDraw);
    map.off("click", markOnMap);
}

function rangeClose() {
    polyEditor.close();
}

function rangeDraw(e) {
    let lng = e.lnglat.getLng();
    let lat = e.lnglat.getLat();
    polygonDraw("polyEditor", {
        path: [
            [lng, lat],
            [lng + 0.1, lat],
            [lng + 0.1, lat + 0.1],
            [lng, lat + 0.1],
        ],
        strokeColor: randomColor(),
        strokeWeight: 6,
        strokeOpacity: 0.2,
        fillOpacity: 0.4,
        fillColor: randomColor(),
        zIndex: 50,
        draggable: true,
    });
}

function randomColor() {
    return "#" + Math.floor(0xffffff * Math.random()).toString(16);
}
// 多边形的绘制与编辑
function polygonDraw(polygonName, params) {
    var polygon = new window.AMap.Polygon(params);
    window.map.add(polygon);
    // 缩放地图到合适的视野级别
    window.map.setFitView([polygon]);
    polygon.on("mouseover", (e) => {
        throttle(openInfo, 2000)(e);
    });
    polygon.on("mouseleave", (e) => {});
    window[polygonName] = new AMap.PolyEditor(window.map, polygon);
    polygon.on("click", (e) => {
        window[polygonName].open();
        console.log(window[polygonName]);
    });
}

function markOnMap(e) {
    let lng = e.lnglat.getLng();
    let lat = e.lnglat.getLat();
    var startIcon = new AMap.Icon({
        // 图标尺寸
        size: new AMap.Size(25, 34),
        // 图标的取图地址
        image: "//a.amap.com/jsapi_demos/static/demo-center/icons/dir-marker.png",
        // 图标所用图片大小
        imageSize: new AMap.Size(135, 40),
        // 图标取图偏移量
        imageOffset: new AMap.Pixel(-9, -3),
    });
    var viaMarker = null;
    if (markType.value == "type1") {
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
        throttle(openInfo, 2000)(e);
    });
    map.add([viaMarker]);
}

function openInfo(e) {
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
}

function throttle(fn) {
    let task;
    return function () {
        if (!task) {
            task = setTimeout(() => {
                task = null;
                fn.apply(this, arguments);
            });
        }
    };
}

export {
    markOne,
    markTwo,
    range,
    rangeClose
}