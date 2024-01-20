<script setup lang="ts">
import AMISRenderer from '@/components/AMISRenderer.vue';

const schema = {
	type: 'page',
	body: 'Login Please!',
};
</script>

<template>
	<AMISRenderer :schema="schema" />
</template>
