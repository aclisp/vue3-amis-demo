<script setup lang="ts">
import AMISRenderer from '@/components/AMISRenderer.vue';
import schema from './AboutView';
</script>

<template>
	<AMISRenderer :schema="schema" />
</template>
