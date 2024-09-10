<!--地图操作按钮组的组件。问题：组件要拆到什么程度合适呢？-->
<template>
    <el-button-group size="large">
        <el-row> <MapButtonWeather></MapButtonWeather></el-row>
        <el-row> <MapButtonChangeLayer></MapButtonChangeLayer></el-row>
    </el-button-group>
</template>

<script setup>
    import MapButtonChangeLayer from "./MapButtonChangeLayer.vue";
    import MapButtonWeather from "./MapButtonWeather.vue";
</script>

<style lang="css" scoped>
    .el-row {
        margin-bottom: 8px;
    }
    .el-button-group {
        border-color: transparent; /*去除边框*/
    }
</style>
