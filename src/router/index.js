import { createRouter, createWebHistory } from 'vue-router'

import Main from '@/views/Main/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main,
      children:[
        {path:'',
        name:'home',
        component:()=>import('@/views/Main/home.vue')
        },
      ]
    },
    {
      path: '/login',
      name: 'about',
      component: () => import('@/views/Login/index.vue')
    }
  ]
})

export default router
