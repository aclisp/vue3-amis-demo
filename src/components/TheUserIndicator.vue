<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

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
  <el-link v-if="auth.isLoggedIn" @click="goUserProfile" class="layout-header-item" :underline="false">
    <el-avatar :src="auth.userAvatar"></el-avatar>
    <span class="ml-2">{{ auth.userName }}</span>
  </el-link>
  <el-link v-else @click="goLogin" class="layout-header-item" :underline="false">
    登入系统查看更多信息
    <el-icon><TopRight /></el-icon>
  </el-link>
</template>

<style scoped>
.layout-header-item {
  font-weight: 400;
}
</style>
