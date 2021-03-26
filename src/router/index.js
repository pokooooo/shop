import Vue from 'vue'
import VueRouter from 'vue-router'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import('../views/Login')
  },
  {
    path: '/home',
    component: () => import('../views/Home'),
    children: [
      {
        path: '/',
        redirect: '/welcome'
      },
      {
        path: '/welcome',
        component: () => import('../views/right/Welcome')
      },
      {
        name: 'users',
        path: '/users',
        component: () => import('../views/right/Users')
      },
      {
        name: 'rights',
        path: '/rights',
        component: () => import('../views/right/Rights')
      },
      {
        name: 'roles',
        path: '/roles',
        component: () => import('../views/right/Roles')
      },
      {
        name: 'categories',
        path: '/categories',
        component: () => import('../views/right/GoodsCategory')
      },
      {
        name: 'params',
        path: '/params',
        component: () => import('../views/right/GoodsParams')
      }

    ]
  }

]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to,from,next) => {
  NProgress.start()
  // to 要访问的路径
  // from 从哪个路径来
  // next 是否放行
  if(to.path === '/login') return next()
  if(window.sessionStorage.getItem('token')) next()
  else next('/login')
})

router.afterEach(() => {
  NProgress.done()
})

export default router
