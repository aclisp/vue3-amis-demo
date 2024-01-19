<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import 'amis/sdk/sdk.js';
import 'amis/sdk/sdk.css';
import 'amis/sdk/iconfont.css';
import 'amis/sdk/helper.css';
import { useRouter } from 'vue-router';

const props = defineProps({
	schema: {
		type: Object,
		required: true,
	},
	locals: {
		type: Object,
		default: () => ({}),
	},
	props: {
		type: Object,
		default: () => ({}),
	},
	env: {
		type: Object,
		default: () => ({}),
	},
});

const emit = defineEmits(['ready']);

let amisInstance: any;

onMounted(() => {
	const scoped = window.amisRequire('amis/embed');
	const { normalizeLink } = window.amisRequire('amis');
	const router = useRouter();
	const instance = scoped.embed(
		'#amis-component',
		props.schema,
		{
			data: {
				...props.locals,
			},
			...props.props,
		},
		{
			...props.env,
		},
		() => {
			emit('ready', { instance });
		},
	);
	amisInstance = instance;
});

onUnmounted(() => {
	amisInstance?.unmount();
});
</script>

<template>
	<div id="amis-component"></div>
</template>
