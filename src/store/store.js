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
            username: "houchaogis",
            styleId: "clg7s6veu000k01p3q9xjadf2",
            accessToken: "pk.eyJ1IjoiaG91Y2hhb2dpcyIsImEiOiJjbGc3c3Njem4wbXVqM3NxeWFpbnJleHZnIn0.WRlYOVdh-05m6LJTt9u_IQ",
        }),
        tdtLayer: new Cesium.UrlTemplateImageryProvider({
            url: "http://t7.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=49b046e65d94afd82ff0b5b7b69012fa",
            minimumLevel: 3,
            maximumLevel: 18,
        }),
        tdtNoteLayer: new Cesium.UrlTemplateImageryProvider({
            url: "http://t7.tianditu.gov.cn/cia_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cia&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=49b046e65d94afd82ff0b5b7b69012fa",
            minimumLevel: 3,
            maximumLevel: 18,
        }),
    },
    //mutations: 通过调用store.commit('xxx')，调用mutation中的方法，更改store中的值
    mutations: {
        //调用：store.commit('setViewer', viewer)
        setViewer(state, viewer) {
            state.viewer = viewer;
        },
    },
});

export default store;