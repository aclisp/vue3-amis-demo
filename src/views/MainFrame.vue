<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const menuCollapsed = ref(false);

function toggleMenuCollapsed() {
	menuCollapsed.value = !menuCollapsed.value;
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
				<el-menu-item index="/home">
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
		<el-main>
			<router-view />
		</el-main>
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
</style>
