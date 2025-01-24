import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import { useAuthStore } from '@/stores/authStore'
import { jwtDecode } from "jwt-decode";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: { layout: 'empty' },

    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
      meta: { layout: 'empty' },

    },
    {
      path: '/forget-password',
      name: 'ForgetPassword',
      component: () => import('../views/ForgetPasswordView.vue'),
      meta: { layout: 'empty' },

    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('../views/UserView.vue'),
    },
    {
      path: '/personal-details',
      name: 'personalDetails',
      component: () => import('../views/PersonalDetailsView.vue'),
    },
    {
      path: '/highlights',
      name: 'highlights',
      component: () => import('../views/HighlightView.vue'),
    },
    {
      path: '/account-links',
      name: 'accountLinks',
      component: () => import('../views/AccountLinksView.vue'),
    },
    {
      path: '/educations',
      name: 'educations',
      component: () => import('../views/EducationView.vue'),
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('../views/SettingView.vue'),
    },
    {
      path: '/skill-types',
      name: 'skillTypes',
      component: () => import('../views/SkillTypeView.vue'),
    },
    {
      path: '/skills',
      name: 'skills',
      component: () => import('../views/SkillsView.vue'),
    },
    {
      path: '/experiences',
      name: 'experiences',
      component: () => import('../views/ExperienceView.vue'),
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue'),
    },
  ],
})


router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  const publicPages = ["/login", "/register", "/forget-password"];
  const adminPages = ["/users"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = authStore.isLoggedIn;
  if (loggedIn) {
    try {
      const decodedToken = jwtDecode(authStore.jwt);
      const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

      // Check if token is expired
      if (decodedToken.exp < currentTime) {
        authStore.clearAuthDetails();
        next("/login");
        return;
      }
    } catch (error) {
      console.error("Invalid token or decoding error:", error);
      authStore.clearAuthDetails();
      next("/login");
      return;
    }
  }

  if (authRequired && !loggedIn) {
    next("/login");
  } else if (to.path === "/login") {
    authStore.clearAuthDetails();
    next();
  } else if (adminPages.includes(to.path)) {
    if (authStore.role === "Admin") {
      next();
    } else {
      next("/");
    }
  }
  else {
    next();
  }
});

export default router
