import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import Dashboard from '@/views/Dashboard.vue'
import Pastor from '@/views/Pastor.vue'
import DetailPastor from '@/views/DetailPastor.vue'
import Konsultasi from '@/views/Konsultasi.vue'
import Perlawatan from '@/views/Perlawatan.vue'
import Profile from '@/views/Profile.vue'
import Admin from '@/views/Admin.vue'
import DetailUser from '@/views/AdminDetailUser.vue'
import DetailBlog from '@/views/DetailBlog.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: { requiresAuth: true }
    },
    {
      path: '/pastor',
      name: 'pastor',
      component: Pastor,
      props: route => ({ isConsultation: route.query.isConsultation }),
      meta: { requiresAuth: true }
    },
    {
      path: '/detailpastor/:id',
      name: 'detailpastor',
      props: true,
      component: DetailPastor,
      meta: { requiresAuth: true }
    },
    {
      path: '/detailblog/:id',
      name: 'detailblog',
      props: true,
      component: DetailBlog
    },
    {
      path: '/konsultasi/:id',
      name: 'konsultasi',
      props: true,
      component: Konsultasi,
      meta: { requiresAuth: true }
    },
    {
      path: '/perlawatan/:id',
      name: 'perlawatan',
      props: true,
      component: Perlawatan,
      meta: { requiresAuth: true }
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: { requiresAuth: true }
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
      path: '/admin/detailuser/:id',
      name: 'admindetailuser',
      component: DetailUser,
      props: true,
      meta: {requiresAuth: true, requiresAdmin: true}
    },
    {
      path: '/blog',
      name: 'blog',
      component: () => import('@/views/Blog.vue'),
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('@/views/Contact.vue'),
      
    }

  ]
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token');
  const userRole = JSON.parse(localStorage.getItem('role'));

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next({ name: 'login' });
    } else if (to.matched.some(record => record.meta.requiresAdmin) && !userRole.isAdmin){
      next({ name: 'dashboard'});
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router
