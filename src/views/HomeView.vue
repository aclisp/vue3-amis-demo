<script setup lang="ts">
import AMISRenderer from '@/components/AMISRenderer.vue';

const schema = {
	type: 'page',
	body: 'My Sweet Home!',
};
</script>

<template>
	<AMISRenderer :schema="schema" />
</template>
