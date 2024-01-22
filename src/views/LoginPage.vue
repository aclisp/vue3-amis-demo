<script setup lang="ts">
import AMISRenderer from '@/components/AMISRenderer.vue';
import schema from './LoginPage.json';
import { getNodeById } from '@/utils/get-node-by-id';
import { useAuthStore } from '@/stores/auth';

const auth = useAuthStore();
const loginForm = getNodeById('login-form', schema);

loginForm.api.adaptor = (payload: any) => {
	auth.hydrate({ authResponse: payload.data });
	return {};
};
</script>

<template>
	<AMISRenderer :schema="schema" />
</template>
