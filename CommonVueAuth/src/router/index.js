import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import { useAuthStore } from '@/stores/authStore'

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
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/change-password',
      name: 'change-password',
      component: () => import('../views/users/ChangePassword.vue'),
    },
  ],
})

router.beforeEach((to,from,next) => {
  const authStore = useAuthStore()

  const publicPages = ["/login","/register"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = authStore.isLoggedIn;

  if(authRequired && !loggedIn){
    next("/login");
  }else if(to.path == "/login"){
    authStore.clearAuthDetails();
    next();
  }
  else{
    next();
  }
})
export default router
