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
          meta: {
            public: true,
          },
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
      meta: {
        public: true,
      },
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: () => import('@/views/LoginPage.vue'),
      meta: {
        public: true,
      },
    },
  ],
});

router.beforeEach(async (to) => {
  const auth = useAuthStore();
  await auth.hydrate();

  if (to.meta?.public !== true && !auth.isLoggedIn) {
    if (to.fullPath) {
      return '/login?redirect=' + encodeURIComponent(to.fullPath);
    } else {
      return '/login';
    }
  }
});

router.afterEach(() => {
  const app = useAppStore();
  app.drawer = false;
});

export default router;
