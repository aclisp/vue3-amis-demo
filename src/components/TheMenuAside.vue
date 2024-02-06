<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();
const openedSubMenus = ['system-functions'];
</script>

<template>
  <el-menu :router="true" :default-active="route.path" :default-openeds="openedSubMenus">
    <el-menu-item index="/">
      <el-icon><Menu /></el-icon>
      <span>系统概况&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
    </el-menu-item>
    <el-sub-menu index="system-functions">
      <template #title>
        <el-icon><Collection /></el-icon>
        <span>系统功能</span>
      </template>
      <el-menu-item index="/about">
        <el-icon><Document /></el-icon>
        <span>产品管理</span>
      </el-menu-item>
      <el-menu-item index="/department">
        <el-icon><OfficeBuilding /></el-icon>
        <span>部门成员</span>
      </el-menu-item>
    </el-sub-menu>
    <el-menu-item index="/user-profile">
      <el-icon><Setting /></el-icon>
      <span>系统设置</span>
    </el-menu-item>
  </el-menu>
</template>
