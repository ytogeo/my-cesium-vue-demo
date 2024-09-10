<script setup>
//import HelloWorld from './components/HelloWorld.vue'
import { onMounted, ref } from "vue"; //引入生命周期
import * as Cesium from "cesium";
import store     from "./store/store.js"
// 引入界面组件
import MenuOfDataLoader from "./components/MenuOfDataLoader.vue";
import MenuOfAnalysis from "./components/MenuOfAnalysis.vue";
import MapButtonGroup from "./components/MapButtonGroup/MapButtonGroup.vue";
//武汉经纬度
let lon = 114.304569;
let lat = 30.593354;
let defaultAccessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyYTQ1YWM4Yi1jMWQ2LTRjODktYWUwZi1iN2E3MGY0YTc4NzUiLCJpZCI6MTI2OTc3LCJpYXQiOjE2Nzc3NDg2MTB9.1sM-0Hkm_FzlYZFqnTQlYyLVWZcJqg8EelxDssdjl28";
Cesium.Ion.defaultAccessToken = defaultAccessToken; //使用Cesium @1.84.0

// 生命周期钩子：mounted-页面加载完成后执行cesium初始化init函数
onMounted(() => {
    init();
});

function init() {
    const viewer = new Cesium.Viewer("cesium-container", {
        geocoder: false,
        homeButton: false,
        sceneModePicker: false,
        baseLayerPicker: false,
        navigationHelpButton: false,
        animation: false,
        timeline: false,
        fullscreenButton: false,
        vrButton: false,
        infoBox: false,
        terrainProvider: Cesium.createWorldTerrain({
            requestWaterMask: true,
        }),
        shouldAnimate: true,
    });
    viewer.imageryLayers.removeAll();//清除默认影像图层
    viewer.scene.globe.depthTestAgainstTerrain = true;
    store.commit("setViewer", viewer);
    // 加载自己引入的影像与注记图层
    viewer.imageryLayers.addImageryProvider(store.state.tdtLayer);
    viewer.imageryLayers.addImageryProvider(store.state.tdtNoteLayer);
    //修改摄像头位置（初始）
    viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(lon, lat, 15000.0),
        orientation: {
            pitch: Cesium.Math.toRadians(-90.0),
            roll: 0,
        },
    });

    /**
     * 修改鼠标操作
     */
    viewer.scene.screenSpaceCameraController.zoomEventTypes = [
        Cesium.CameraEventType.WHEEL, //滚轮缩放
    ];
    viewer.scene.screenSpaceCameraController.tiltEventTypes = [
        Cesium.CameraEventType.MIDDLE_DRAG, //右键拖拽旋转
    ];
}
</script>

<template>
    <!--顶部左侧：LOGO-->
    <el-menu class="header-menu" id="left-menu" mode="horizontal" :ellipsis="false">
        <!--引入DataLoader组件-->
        <el-menu-item><i class="demo-icon"></i>我的CesiumDemo</el-menu-item>
    </el-menu>
    <!--顶部右侧：操作菜单-->
    <el-menu class="header-menu" id="right-menu" mode="horizontal" :ellipsis="false">
        <!--菜单：引入各Menu组件-->
        <MenuOfAnalysis></MenuOfAnalysis>
        <MenuOfDataLoader></MenuOfDataLoader>
    </el-menu>
    <!--页面主体：Cesium容器-->
    <div id="cesium-container"></div>
    <!--页面底部：地图按钮组-->
    <div id="map-buttons">
        <MapButtonGroup></MapButtonGroup>
    </div>
</template>

<style scoped>
.header-menu {
    position: absolute;
    top: 20px;
    height: 40px;
    z-index: 999;
}

#left-menu {
    left: 10px;
}

#right-menu {
    right: 10px;
}

.demo-icon {
    position: relative;
    top: 2px;
    right: 5px;
    width: 35px;
    height: 35px;
    background-image: url("./assets/vue-cesium.png");
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
}

#map-buttons {
    position: absolute;
    bottom: 15px;
    left: 20px;
    z-index: 999;
}
</style>
