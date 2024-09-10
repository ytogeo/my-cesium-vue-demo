/**
 * @file mapButtonChangeLayer.js
 * 图层修改按钮功能实现
 */
import * as Cesium from "cesium";
import global from "../../global.vue";

export default class ChangeLayerTool {
    init(viewer) {
        this.viewer = viewer;
    }
    //切换图层为暗色地图
    changeToDarkMap() {
        this.viewer.imageryLayers.remove(global.tdtLayer);
        this.viewer.imageryLayers.remove(global.tdtNoteLayer);
        this.viewer.imageryLayers.addImageryProvider(global.darkMap);
    }
    //切换图层为天地图影像
    changeToImageryMap() {
        this.viewer.imageryLayers.remove(global.darkMap);
        this.viewer.imageryLayers.addImageryProvider(global.tdtLayer);
        this.viewer.imageryLayers.addImageryProvider(global.tdtNoteLayer);
    }
}
