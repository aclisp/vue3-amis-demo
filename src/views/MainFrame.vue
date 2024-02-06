<script setup lang="ts">
import { useAppStore } from '@/stores/app';
import { ArrowRight } from '@element-plus/icons-vue';
import TheMenuAside from '@/components/TheMenuAside.vue';
import TheUserIndicator from '@/components/TheUserIndicator.vue';
import { ref } from 'vue';

const app = useAppStore();
const toggle = ref(null);

function resetToggle() {
  const elButton = toggle.value as any;
  elButton.ref.blur();
}
</script>

<template>
  <el-container class="layout-container">
    <el-drawer v-model="app.drawer" @close="resetToggle" size="60%" direction="ltr" :with-header="false">
      <TheMenuAside />
    </el-drawer>
    <el-header height="56px" class="layout-header">
      <el-button
        ref="toggle"
        class="expand-toggle hidden-sm-and-up"
        :icon="ArrowRight"
        size="large"
        text
        @click="app.drawer = true"
      />
      <div class="logo"></div>
      <div class="flex-grow"></div>
      <TheUserIndicator />
    </el-header>
    <el-container>
      <el-aside width="150px" class="layout-aside hidden-xs-only">
        <TheMenuAside />
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
  height: calc(100vh - var(--el-header-height));
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
  margin-left: -20px;
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
