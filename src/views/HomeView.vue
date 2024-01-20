<script setup lang="ts">
import AMISRenderer from '@/components/AMISRenderer.vue';
import schema from './HomeView.json';
</script>

<template>
	<AMISRenderer :schema="schema" />
</template>
