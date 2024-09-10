/**
 * @file mapButtonChangeLayer.js
 * 图层修改按钮功能实现
 */

import store from "../../store/store.js";

export default class ChangeLayerTool {
    init(viewer) {
        this.viewer = viewer;
        this.darkMap=store.state.darkMap;
        this.tdtLayer=store.state.tdtLayer;
        this.tdtNoteLayer=store.state.tdtNoteLayer;
    }
    //切换图层为暗色地图
    changeToDarkMap() {
        console.log(this.viewer)
        this.viewer.imageryLayers.remove(this.tdtayer);
        this.viewer.imageryLayers.remove(this.tdtNoteLayer);
        this.viewer.imageryLayers.addImageryProvider(this.darkMap);
    }
    //切换图层为天地图影像
    changeToImageryMap() {
        this.viewer.imageryLayers.remove(this.darkMap);
        this.viewer.imageryLayers.addImageryProvider(this.tdtLayer);
        this.viewer.imageryLayers.addImageryProvider(this.tdtNoteLayer);
    }
}
