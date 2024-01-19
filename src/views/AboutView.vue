<script setup lang="ts">
import AMISRenderer from '@/components/AMISRenderer.vue';

const schema = {
	type: 'page',
	body: 'Hello World!',
};
</script>

<template>
	<div>456 about</div>
	<AMISRenderer :schema="schema" />
</template>
