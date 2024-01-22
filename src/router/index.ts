import { createRouter, createWebHistory } from 'vue-router';
import MainFrame from '@/views/MainFrame.vue';
import LandingPage from '@/views/LandingPage.vue';
import { useAuthStore } from '@/stores/auth';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'mainFrame',
			component: MainFrame,
			children: [
				{
					path: '/',
					name: 'home',
					component: () => import('@/views/HomeView.vue'),
				},
				{
					path: '/about',
					name: 'about',
					component: () => import('@/views/AboutView.vue'),
				},
				{
					path: '/user-profile',
					name: 'user-profile',
					component: () => import('@/views/UserProfile.vue'),
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

router.beforeEach(() => {
	const auth = useAuthStore();
	auth.hydrate();
});

export default router;
