import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import BookManagement from '../components/BookManagement.vue'
import Login from '@/components/Login.vue';
import Register from '@/components/Register.vue';
import Logout from '@/components/Logout.vue';
import BookChangeCuckoo from '@/components/BookChangeCuckoo.vue';
import ContactUs from '@/components/ContactUs.vue';
import {isAuthenticated} from '@/auth';
import BookDetail from '@/components/BookDetail.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/books-manager',
      name: 'books-manager',
      component: BookManagement,
      meta: {
        'requiresAuth' : true
      }
    },
    {
      path: '/',
      name: 'cuckoo',
      component: BookChangeCuckoo,
      meta: {
        'requiresAuth' : true
      }
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/logout',
      component: Logout
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/cuckoo',
      component: BookChangeCuckoo,
      meta: {
        'requiresAuth' : true
      }
    },
    {
      path: '/contact',
      component: ContactUs
    },
    {
      path: '/book/:param1/:param2/:param3',
      name: 'BookDetail',
      component: BookDetail,
      meta: {
        'requiresAuth' : true
      }
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next('/login');
  } else {
    next();
  }
})

export default router
