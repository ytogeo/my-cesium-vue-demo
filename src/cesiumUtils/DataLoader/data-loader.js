import * as Cesium from "cesium";
import global from "../../global.vue";

export const addGltf = () => {
    let viewer = global.viewer;
    //武汉经纬度
    let lon = 114.304569;
    let lat = 30.593354;
    //添加一个飞机模型
    let plane = viewer.entities.add({
        name: "a model plane",
        position: Cesium.Cartesian3.fromDegrees(lon, lat, 5000.0),
        model: {
            uri: "../../data/Cesium_Air.glb",
            scale: 8,
            minimumPixelSize: 100.0,
        },
    });
    viewer.flyTo(plane);
};
export const add3DTiles = () => {
    let viewer = global.viewer;
    //添加武汉市建筑tileset
    viewer.scene.primitives.add(
        new Cesium.Cesium3DTileset({
            url: "../../data/wuhanTileset/tileset.json",
        })
    );
};

export const addGeojson = () => {
    let viewer = global.viewer;
    //返回的是一个加载完成的Promise
    let geojsonCompletePromise = new Cesium.GeoJsonDataSource.load("../../data/geojson/terrainGraph_lines.json", {
        stroke: Cesium.Color.HOTPINK,
        fill: Cesium.Color.PINK.withAlpha(0.5),
        strokeWidth: 3,
    });
    //加载完成后，添加到viewer中
    geojsonCompletePromise.then(function (dataSource) {
        viewer.dataSources.add(dataSource);
        viewer.flyTo(dataSource);
        let lines = dataSource.entities.values;
        for (var i = 0; i < lines.length; i++) {
            let line = lines[i];
            //添加注记
            line.label = {
                show: true,
                text: line.properties.ELEV.getValue().toString(),
                showBackground: true,
                font: "14px sans-serif",
                fillColor: Cesium.Color.SKYBLUE,
                outlineColor: Cesium.Color.BLACK,
                outlineWidth: 2,
                style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
            };
            //设置颜色
            if (line.properties.ELEV > 1300 && line.properties.ELEV < 1400) {
                line.polyline.material = Cesium.Color.GREENYELLOW;
            } else if (line.properties.ELEV > 1400 && line.properties.ELEV < 1500) {
                line.polyline.material = Cesium.Color.LIMEGREEN;
            } else if (line.properties.ELEV > 1500 && line.properties.ELEV < 1600) {
                line.polyline.material = Cesium.Color.YELLOWGREEN;
            } else if (line.properties.ELEV > 1600 && line.properties.ELEV < 1700) {
                line.polyline.material = Cesium.Color.FORESTGREEN;
            } else if (line.properties.ELEV > 1700 && line.properties.ELEV < 1800) {
                line.polyline.material = Cesium.Color.OLIVEDRAB;
            } else {
                line.polyline.material = Cesium.Color.GREEN;
            }

            //将高程信息添加至polyline

            for (var j = 0; j < line.polyline.positions._value.length; j++) {
                //笛卡尔坐标转WGS84经纬度
                var cartographic = Cesium.Cartographic.fromCartesian(line.polyline.positions._value[j]);
                //分别获取经纬
                let lon = Cesium.Math.toDegrees(cartographic.longitude);
                let lat = Cesium.Math.toDegrees(cartographic.latitude);
                //将坐标转回笛卡尔坐标系
                let value = Cesium.Cartesian3.fromDegrees(lon, lat, line.properties.ELEV.getValue());
                //设置带高程的坐标
                line.polyline.positions._value[j] = value;
            }

            /*
             *设置line（该entity）position，设置了position才能显示注记！
             */
            //以下这种方法是在点集的包围盒中心设label，但是这里的点集组成的是闭合等高线，label（高程注记）会跑到闭合的内部，不合适
            //一条线的点集
            // var pointsArray = line.polyline.positions.getValue();
            // //获取entity的polygon的中心点
            // var centerpoint = Cesium.BoundingSphere.fromPoints(pointsArray).center;
            // //将entity的position设置为centerpoint
            // line.position = centerpoint;
            //直接以线上第一个点的坐标为position
            line.position = line.polyline.positions._value[0];
        }
    });
};

export const removeAllData = () => {
    let viewer = global.viewer;
    viewer.dataSources.removeAll();
    viewer.entities.removeAll();
    viewer.scene.primitives.removeAll();
}