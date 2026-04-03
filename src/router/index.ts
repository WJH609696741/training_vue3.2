import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import Layout from '../layout/index.vue'

//此处路由暂时写死，后端路由已获取到，但是未进行拼接
const staticRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录页'
    },
    component: () => import('../views/login/index.vue'),
  },
  {
    path: '/',
    name: 'index',
    meta: {
      title: '模板页'
    },
    component: Layout,
    redirect: '/dashboard',
    children: []
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: staticRoutes
})

export default router
