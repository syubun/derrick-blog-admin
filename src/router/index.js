import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login'),
    hidden: true,
  },
  {
    path: '/403',
    name: '403',
    component: () => import('@/views/403'),
    hidden: true,
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404'),
    hidden: true,
  },
]
export const asyncRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    meta: {
      title: '首頁',
      icon: 'home-4-line',
      affix: true,
    },
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import('@/views/index'),
        meta: {
          title: '首頁',
          icon: 'home-4-line',
          affix: true,
        },
      },
    ],
  },
  {
    path: '/articleManagement',
    component: Layout,
    redirect: '/articleManagement/categories',
    alwaysShow: true,
    meta: {
      title: '文章管理',
      icon: 'apps-line',
    },
    children: [
      {
        path: 'categories',
        name: 'categoriesList',
        component: () => import('@/views/categories/index'),
        meta: {
          title: '類別區塊',
          icon: 'table-2',
        },
      },
      // {
      //   path: 'article',
      //   name: 'articleList',
      //   component: () => import('@/views/article/index'),
      //   meta: {
      //     title: '文章',
      //     icon: 'table-2',
      //   },
      // },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    hidden: true,
  },
]
const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
})

export default router
