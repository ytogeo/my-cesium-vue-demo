<script setup>
import { removeAllData, addGltf, add3DTiles, addGeojson } from "../cesiumUtils/DataLoader/data-loader";
</script>
<template style="padding-right: 50px">
    <el-sub-menu index="1">
        <template #title>添加数据</template>
        <el-menu-item @click="addGltf">示例GLTF</el-menu-item>
        <el-menu-item @click="add3DTiles">示例3D Tiles</el-menu-item>
        <el-menu-item @click="addGeojson">示例GeoJson</el-menu-item>
        <el-menu-item @click="removeAllData">清除数据</el-menu-item>
    </el-sub-menu>
</template>

<style>
/*修改菜单子项宽度*/
.el-menu--collapse .el-menu .el-submenu,
.el-menu--popup {
    min-width: 120px !important;
}

.el-menu-item {
    border: 0;
}
</style>
