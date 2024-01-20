<script setup lang="ts"></script>

<template>
	<el-container class="layout-container">
		<el-aside width="200px">
			Pages
			<div><router-link to="/">Home</router-link></div>
			<div><router-link to="/about">About</router-link></div>
			<div><router-link to="/new">New</router-link></div>
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
</style>
