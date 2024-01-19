<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import 'amis/sdk/sdk.js';
import 'amis/sdk/sdk.css';
import 'amis/sdk/iconfont.css';
import 'amis/sdk/helper.css';
import { useRouter } from 'vue-router';

const props = defineProps({
	/** The amis JSON schema */
	schema: {
		type: Object,
		required: true,
	},
	/** 赋予 amis 顶层数据域的值 */
	locals: {
		type: Object,
		default: () => ({}),
	},
	/** 控制 amis 的属性，一般都用不上 */
	props: {
		type: Object,
		default: () => ({}),
	},
	/** 环境变量，用于控制 amis 的行为，需要使用 amis 用户实现部分接口 */
	env: {
		type: Object,
		default: () => ({}),
	},
});

/** The amis component is ready */
const emit = defineEmits(['ready']);

let amisInstance: any;

onMounted(() => {
	const scoped = window.amisRequire('amis/embed');
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { normalizeLink } = window.amisRequire('amis');
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
