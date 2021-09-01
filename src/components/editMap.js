/*
 * @Author: gongwannan
 * @Date: 2021-08-31 16:43:51
 * @LastEditTime: 2021-08-31 17:57:20
 * @LastEditors: gongwannan
 * @Description: 
 * @FilePath: \gaodeDemo\src\components\editMap.js
 */
import {
    ref
} from 'vue'
export default function editMap() {
    
    window.map.on("click", markOnMap);

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
            this.throttle(openInfo)(e);
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
    return markOnMap
}