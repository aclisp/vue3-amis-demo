<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
	<el-container class="layout-container">
		<el-aside width="200px">
			<div class="brand">
				<span class="title">VUE3 AMIS DEMO</span>
			</div>
			<el-scrollbar>
				<el-menu :router="true" :default-active="route.path">
					<el-menu-item index="/home">
						<el-icon><Menu /></el-icon>
						<span>Home</span>
					</el-menu-item>
					<el-menu-item index="/about">
						<el-icon><Document /></el-icon>
						<span>About</span>
					</el-menu-item>
					<el-menu-item index="/new">
						<el-icon><Setting /></el-icon>
						<span>New</span>
					</el-menu-item>
				</el-menu>
			</el-scrollbar>
		</el-aside>
		<el-main>
			<router-view />
		</el-main>
	</el-container>
</template>

<style scoped>
.layout-container {
	height: 100vh;
}

.el-aside {
	background-color: #f0f2f5;
	line-height: 1.5;
}

.brand {
	background-color: #409eff;
	color: white;
	height: 56px;
	display: flex;
	align-items: center;
	justify-content: center;
	font-style: italic;
}
</style>
