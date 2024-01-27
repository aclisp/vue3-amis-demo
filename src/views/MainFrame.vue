<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const auth = useAuthStore();

function goLogin() {
  router.push('/login');
}

function goUserProfile() {
  router.push('/user-profile');
}
</script>

<template>
  <el-container class="layout-container">
    <el-header height="56px" class="layout-header">
      <div class="logo"></div>
      <div class="flex-grow"></div>
      <el-link v-if="auth.isLoginUser" @click="goUserProfile" class="layout-header-item" :underline="false">
        当前用户已登录
        <el-icon><TopRight /></el-icon>
      </el-link>
      <el-link v-else @click="goLogin" class="layout-header-item" :underline="false">
        登入系统查看更多信息
        <el-icon><TopRight /></el-icon>
      </el-link>
    </el-header>
    <el-container>
      <el-aside width="150px">
        <el-scrollbar>
          <el-menu :router="true" :default-active="route.path">
            <el-menu-item index="/">
              <el-icon><Menu /></el-icon>
              <span>系统概况&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            </el-menu-item>
            <el-menu-item index="/about">
              <el-icon><Document /></el-icon>
              <span>会员管理</span>
            </el-menu-item>
            <el-menu-item index="/user-profile">
              <el-icon><Setting /></el-icon>
              <span>系统设置</span>
            </el-menu-item>
          </el-menu>
        </el-scrollbar>
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
.brand {
  background-color: #409eff;
  color: white;
  font-style: italic;
  font-weight: 500;
  font-size: 16px;
}
.logo {
  background-image: url('	https://aisuda.bce.baidu.com/amis/static/logo_408c434.png');
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
