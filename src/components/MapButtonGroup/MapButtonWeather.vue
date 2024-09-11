<template>
    <el-button title="天气模拟" circle>
        <el-icon :size="20">
            <PartlyCloudy />
        </el-icon></el-button>
    <!--天气选择弹窗——从图层切换那里复制来的，未修改-->
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

<script setup>

</script>

<style lang="css" scoped></style>
