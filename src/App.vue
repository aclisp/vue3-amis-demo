<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
	<RouterLink to="/">Home</RouterLink>
	<RouterLink to="/about">About</RouterLink>
	<RouterLink to="/new">New</RouterLink>
	<RouterView />
</template>

<style scoped></style>
