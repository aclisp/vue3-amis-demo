import { createRouter, createWebHistory } from 'vue-router';
import MainFrame from '@/views/MainFrame.vue';
import LandingPage from '@/views/LandingPage.vue';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			redirect: '/home',
			name: 'mainFrame',
			component: MainFrame,
			children: [
				{
					path: '/home',
					name: 'home',
					component: () => import('@/views/HomeView.vue'),
				},
				{
					path: '/about',
					name: 'about',
					component: () => import('@/views/AboutView.vue'),
				},
				{
					path: '/new',
					name: 'new',
					component: () => import('@/views/NewView.vue'),
				},
			],
		},
		{
			path: '/landing',
			name: 'landing',
			component: LandingPage,
		},
		{
			path: '/login',
			name: 'login',
			component: () => import('@/views/LoginPage.vue'),
		},
	],
});

export default router;
