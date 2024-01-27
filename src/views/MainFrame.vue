<script setup lang="ts">
import { useAppStore } from '@/stores/app';
import { Expand } from '@element-plus/icons-vue';
import MenuAside from '@/components/MenuAside.vue';
import UserIndicator from '@/components/UserIndicator.vue';

const app = useAppStore();
</script>

<template>
  <el-container class="layout-container">
    <el-drawer v-model="app.drawer" size="50%" direction="ltr" :with-header="false">
      <MenuAside />
    </el-drawer>
    <el-header height="56px" class="layout-header">
      <el-button class="expand-toggle hidden-sm-and-up" :icon="Expand" circle @click="app.drawer = true" />
      <div class="logo"></div>
      <div class="flex-grow"></div>
      <UserIndicator />
    </el-header>
    <el-container>
      <el-aside width="150px" class="layout-aside hidden-xs-only">
        <MenuAside />
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
.layout-container {
  height: 100vh;
}
.layout-aside {
  height: 100vh;
}
.brand {
  background-color: #409eff;
  color: white;
  font-style: italic;
  font-weight: 500;
  font-size: 16px;
}
.logo {
  background-image: url('https://aisuda.bce.baidu.com/amis/static/logo_408c434.png');
  background-clip: border-box;
  background-color: rgba(0, 0, 0, 0);
  background-origin: padding-box;
  background-position-x: 0%;
  background-position-y: 50%;
  background-repeat: no-repeat;
  background-size: contain;
  background-attachment: scroll;
  height: 30px;
  width: 100px;
}
.expand-toggle {
  margin-right: 20px;
}
.layout-header {
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: var(--el-border-color);
  display: flex;
  align-items: center;
}
.layout-header-item {
  font-weight: 400;
}
</style>
