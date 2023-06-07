import { createRouter, createWebHistory } from 'vue-router'

import Main from '@/views/Home/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'',
      redirect:'/main'
    },
    {
      path: '/main',
      name: 'main',
      component: Main,
      children:[
        {
          path:'',
          redirect:'/main/home'
        },
        {path:'home',
        name:'home',
        meta:{keepalive:false},
        component:()=>import('@/views/Home/home.vue'),
        },
        {path:'center',
          name:'center',
          meta:{keepalive:true},
          component:()=>import("@/views/Home/homeCenter.vue")
        },
        {path:'user',
        name:'user',
        meta:{keepalive:false},
        component:()=>import("@/views/Home/user.vue")
        },
        {path:'about',
          name:'about',
          meta:{keepalive:false},
          component:()=>import("@/views/Home/about.vue")
        },
        {path:'setting',
        name:'setting',
        meta:{keepalive:false},
        component:()=>import("@/views/Home/setting.vue")
      },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login/index.vue')
    },
    {
      path: '/:catchAll(.*)',
      hidden: true,
      component: () => import('@/views/error.vue')//这个是我自己的路径
    }
  ]
})


router.beforeEach((to,from,next)=>{
  if(to.path !== '/login'){
      const token = localStorage.getItem('token')
      if(to.path !== '/login' && !token){next('/login')}
      else{   next()	}
  }
 else{
      next()	//访问的的不是后台主页
  }
})

export default router
