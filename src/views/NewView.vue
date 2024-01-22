<script setup lang="ts">
import AMISRenderer from '@/components/AMISRenderer.vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const router = useRouter();
const auth = useAuthStore();

function logout() {
	auth.dehydrate();
	router.push('/');
}

const schema = {
	type: 'page',
	body: {
		type: 'flex',
		direction: 'column',
		items: [
			'A Whole New World!',
			{
				type: 'divider',
			},
			{
				type: 'button',
				className: 'max-w-xs',
				label: '退出登录',
				onClick: logout,
			},
		],
	},
};
</script>

<template>
	<AMISRenderer :schema="schema" />
</template>
