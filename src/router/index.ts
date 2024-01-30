import { createRouter, createWebHistory } from 'vue-router';
import MainFrame from '@/views/MainFrame.vue';
import LandingPage from '@/views/LandingPage.vue';
import { useAuthStore } from '@/stores/auth';
import { useAppStore } from '@/stores/app';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'MainFrame',
      component: MainFrame,
      children: [
        {
          path: '/',
          name: 'HomeView',
          component: () => import('@/views/HomeView.vue'),
        },
        {
          path: '/about',
          name: 'AboutView',
          component: () => import('@/views/AboutView.vue'),
        },
        {
          path: '/department',
          name: 'DepartmentView',
          component: () => import('@/views/DepartmentView.vue'),
        },
        {
          path: '/user-profile',
          name: 'UserProfile',
          component: () => import('@/views/UserProfile.vue'),
        },
      ],
    },
    {
      path: '/landing',
      name: 'LandingPage',
      component: LandingPage,
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: () => import('@/views/LoginPage.vue'),
    },
  ],
});

router.beforeEach(async () => {
  const auth = useAuthStore();
  await auth.hydrate();
});

router.afterEach(() => {
  const app = useAppStore();
  app.drawer = false;
});

export default router;
