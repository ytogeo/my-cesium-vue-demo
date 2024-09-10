<!--切换图层地图按钮的组件-->

<script lang="ts" setup>
import global from "../../global.vue";
import ChangeLayerTool from "../../cesiumUtils/MapButtonGroup/mapButtonChangeLayer";
//引入静态图片资源（require对vite不管用，使用import）
import darkMapSample from "../../assets/dark_map_sample.jpg";
import tdtImagerySample from "../../assets/tdt_imagery_sample.jpg";


const changeLayerTool = new ChangeLayerTool();

import { onMounted, ref } from 'vue'

const dialogVisible = ref(false)//控制弹窗的显示与隐藏的响应式变量
const selectedLayer = ref("1")//控制选中的图层的响应式变量



</script>
<template>
    <!--打开图层切换弹窗时，使用加载好的global.viewer初始化图层切换tool，否则会读不到——这个viewer获取方式有没有问题？-->
    <el-button class="map-button" title="图层切换" circle @click="dialogVisible = true; changeLayerTool.init(global.viewer)">
        <el-icon :size="20">
            <Files />
        </el-icon></el-button>
    <!--图层切换弹窗-->
    <el-dialog class="change-layer-dialog" v-model="dialogVisible" title="选择图层" width="550" draggable>
        <el-row justify="center">
            <el-col :span="12" style="text-align: center;">
                <div class="map-option">
                    <el-image style="width: 150px; height: 150px;" :src="tdtImagerySample" />
                    <!--这里选中radio触发的事件应该是change而不是click，后者会触发两次-->
                    <el-radio v-model="selectedLayer" label="1"
                        @change="changeLayerTool.changeToImageryMap()">实景影像</el-radio>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="map-option">
                    <el-image style="width: 150px; height: 150px;" :src="darkMapSample" />
                    <!--这里选中radio触发的事件应该是change而不是click，后者会触发两次-->
                    <el-radio v-model="selectedLayer" label="2"
                        @change="changeLayerTool.changeToDarkMap()">矢量地图</el-radio>
                </div>
            </el-col>
        </el-row>
    </el-dialog>
</template>

<style lang="css" scoped>
/*对el button 焦点离不开导致交互有问题的解决方式*/
/*鼠标点击后移开，恢复本身样式（焦点未离开，但是未悬浮——elbutton bug的假焦点）*/
.map-button,
.map-button:focus:not(.map-button:hover) {
    background: white;
    /*把背景色改回来*/
    color: var(--el-button-text-color);
    /*把图标颜色改回来*/
    border-color: transparent;
    /*去除边框 */
}

/*点击未放开or悬浮：激活*/
.map-button:focus,
.map-button:hover {
    background: #eaf5ff;
    /*糊一层蓝色*/
    color: var(--el-button-hover-text-color);
    /*悬浮时，图标变色*/
}

.map-option {
    text-align: center;
    /*设置子元素的文本水平居中对齐*/
    display: flex;
    flex-direction: row;
    /*设置主轴方向是水平方向*/
    align-items: center;
    /*设置侧轴上，子元素的排列方式为居中对齐*/

}

.el-radio {
    margin-left: 10px;
}
</style>

<style>
/**
 * 对于el这样的第三方组件：需要在没有scoped的style中，通过选择器的方式来修改自定义类el-dialog中dialog部件的具体样式
 */

.change-layer-dialog .el-dialog__header {
    padding: calc(var(--el-dialog-padding-primary)) var(--el-dialog-padding-primary)
}

.change-layer-dialog .el-dialog__title {
    font-size: 15px;
}

.change-layer-dialog .el-dialog__body {
    padding: calc(var(--el-dialog-padding-primary)) var(--el-dialog-padding-primary);
    padding-right: 0px;
}
</style>