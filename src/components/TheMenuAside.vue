<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
  <el-menu :router="true" :default-active="route.path">
    <el-menu-item index="/">
      <el-icon><Menu /></el-icon>
      <span>系统概况&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
    </el-menu-item>
    <el-menu-item index="/about">
      <el-icon><Document /></el-icon>
      <span>会员管理</span>
    </el-menu-item>
    <el-menu-item index="/department">
      <el-icon><OfficeBuilding /></el-icon>
      <span>部门成员</span>
    </el-menu-item>
    <el-menu-item index="/user-profile">
      <el-icon><Setting /></el-icon>
      <span>系统设置</span>
    </el-menu-item>
  </el-menu>
</template>
