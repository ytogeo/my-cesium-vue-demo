<script>
import * as Cesium from "cesium";

let viewer = null;
/**
* mapbox地图
*/
let darkMap = new Cesium.MapboxStyleImageryProvider({
    username: "houchaogis",
    styleId: "clg7s6veu000k01p3q9xjadf2",
    accessToken: "pk.eyJ1IjoiaG91Y2hhb2dpcyIsImEiOiJjbGc3c3Njem4wbXVqM3NxeWFpbnJleHZnIn0.WRlYOVdh-05m6LJTt9u_IQ",
});

/**
 * 天地图影像与注记
 */
let tdtLayer = new Cesium.UrlTemplateImageryProvider({
    url: "http://t7.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=49b046e65d94afd82ff0b5b7b69012fa",
    minimumLevel: 3,
    maximumLevel: 18,
});
let tdtNoteLayer = new Cesium.UrlTemplateImageryProvider({
    url: "http://t7.tianditu.gov.cn/cia_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cia&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=49b046e65d94afd82ff0b5b7b69012fa",
    minimumLevel: 3,
    maximumLevel: 18,
});

export default {
    viewer,
    darkMap,
    tdtLayer,
    tdtNoteLayer,
};
</script>
