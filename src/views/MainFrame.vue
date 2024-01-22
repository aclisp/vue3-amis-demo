<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const menuCollapsed = ref(false);
const auth = useAuthStore();
const isLogin = computed(() => {
	return !!auth.accessToken;
});

function toggleMenuCollapsed() {
	menuCollapsed.value = !menuCollapsed.value;
}

function goLogin() {
	router.push('/login');
}

function goUserProfile() {
	router.push('/new');
}
</script>

<template>
	<el-container direction="horizontal" class="layout-container">
		<el-scrollbar>
			<el-menu :router="true" :default-active="route.path" :collapse="menuCollapsed">
				<el-menu-item v-if="menuCollapsed" class="brand" @click="toggleMenuCollapsed" index="">
					<el-icon><Expand /></el-icon>
					<span>格律诗之家</span>
				</el-menu-item>
				<el-menu-item v-else class="brand" @click="toggleMenuCollapsed" index="">
					<el-icon><Fold /></el-icon>
					<span>格律诗之家</span>
				</el-menu-item>
				<el-menu-item index="/">
					<el-icon><Menu /></el-icon>
					<span>系统概况&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
				</el-menu-item>
				<el-menu-item index="/about">
					<el-icon><Document /></el-icon>
					<span>会员管理</span>
				</el-menu-item>
				<el-menu-item index="/new">
					<el-icon><Setting /></el-icon>
					<span>系统设置</span>
				</el-menu-item>
			</el-menu>
		</el-scrollbar>
		<el-container>
			<el-header height="56px">
				<el-row class="header-items">
					<div class="flex-grow"></div>
					<el-link v-if="isLogin" @click="goUserProfile" class="header-item" :underline="false">
						当前用户已登录
						<el-icon><TopRight /></el-icon>
					</el-link>
					<el-link v-else @click="goLogin" class="header-item" :underline="false">
						登入系统查看更多信息
						<el-icon><TopRight /></el-icon>
					</el-link>
				</el-row>
			</el-header>
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
.el-header {
	border-bottom-style: solid;
	border-bottom-width: 1px;
	border-bottom-color: var(--el-border-color);
	display: flex;
	flex-direction: column;
	justify-content: center;
}
.header-items {
	display: flex;
}
.header-item {
	font-weight: 400;
}
</style>
