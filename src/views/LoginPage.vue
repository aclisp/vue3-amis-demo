<script setup lang="ts">
import AMISRenderer from '@/components/AMISRenderer.vue';
import schema from './LoginPage.json';
import { getNodeById } from '@/utils/get-node-by-id';

const loginForm = getNodeById('login-form', schema);
loginForm.api.adaptor = (payload: any) => {
	console.log('loginForm.api.adaptor:payload=%o', payload);
	// TODO save payload to store
	return {};
};
</script>

<template>
	<AMISRenderer :schema="schema" />
</template>
