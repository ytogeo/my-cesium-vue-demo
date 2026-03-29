/**
 * 使用vuex进行全局变量管理
 */
import Vuex from 'vuex';
import * as Cesium from "cesium";

const store = new Vuex.Store({
    //state: 存储全局变量
    state: {
        viewer: null,
        darkMap: new Cesium.MapboxStyleImageryProvider({
            username: import.meta.env.VITE_MAPBOX_USERNAME,
            styleId: import.meta.env.VITE_MAPBOX_STYLE_ID,
            accessToken: import.meta.env.VITE_MAPBOX_TOKEN,
        }),
        tdtLayer: new Cesium.UrlTemplateImageryProvider({
            url: `https://t7.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${import.meta.env.VITE_TIANDITU_TOKEN}`,
            minimumLevel: 3,
            maximumLevel: 18,
        }),
        tdtNoteLayer: new Cesium.UrlTemplateImageryProvider({
            url: `https://t7.tianditu.gov.cn/cia_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cia&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${import.meta.env.VITE_TIANDITU_TOKEN}`,
            minimumLevel: 3,
            maximumLevel: 18,
        }),
    },
    //mutations: 通过调用store.commit('xxx')，调用mutation中的方法，更改store中state内变量的值
    mutations: {
        //调用：store.commit('setViewer', viewer)
        setViewer(state, viewer) {
            state.viewer = viewer;
        },
    },
});

export default store;