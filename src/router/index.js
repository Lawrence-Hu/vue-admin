import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'dashboard',
    meta:{title:'控制台',icon:'form'},
    children: [{
      path: '/dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },

  {
    path: '/user',
    component: Layout,
    redirect: '/user',
    name: 'user',
    meta: { title: '用户管理', icon: 'example' },
    children: [
      {
        path:'/user/add',
        meta:{title:'冻结用户管理',icon:'form'}
      },
      {
        path: '/user/audit',
        name: 'Aduit',
        component: () => import('@/views/table/index'),
        meta: { title: '用户权限', icon: 'table' }
      },
      {
        path: '/user/info',
        name: 'info',
        component: () => import('@/views/table/index'),
        meta: { title: '用户信息', icon: 'table' },
        children: [
          {
            path:'/user/pending',
            name:'待处理',
           // component:() => import('@view/form/index'),
            meta:{title: '待处理',icon: 'form'}
          },
          {
            path:'/user/handled',
            name:'已处理',
           // component:() => import('@view/form/index'),
            meta:{title: '已处理',icon: 'form'}
          }
        ]
      }
    ]
  },

  {
    path: '/product',
    component: Layout,
    name:'product',
    meta: { title: '商品管理', icon: 'example' },
    children: [
      {
        path: '/product/info',
        name: '商品管理',
        component: () => import('@/views/form/index'),
        meta: { title: '商品管理', icon: 'form' },
        children:[
          {
            path:'/product/category',
            meta:{title:'商品种类管理',icon:'form'},
          },
          {
            path:'/product/delete',
            meta:{title:'删除商品',icon:'form'},
          }
        ]
      },
      {
        path: '/product/aduit',
        name: '商品认证',
        component: () => import('@/views/form/index'),
        meta: { title: '商品认证', icon: 'form' },
        children: [
          {
            path:'/product/aduit/pending',
            name:'待处理',
           // component:() => import('@view/form/index'),
            meta:{title: '待处理',icon: 'form'}
          },
          {
            path:'/product/aduit/handled',
            name:'已处理',
           // component:() => import('@view/form/index'),
            meta:{title: '已处理',icon: 'form'}
          }
        ]
      }
    ]
  },
  {
    path: '/order',
    component: Layout,
    name:'order',
    meta: { title: '订单管理', icon: 'example' },
    children: [
      {
        path: '/order/all',
        name: '所有订单',
        component: () => import('@/views/form/index'),
        meta: { title: '所有订单', icon: 'form' }
      },
      {
        path: '/order/solve',
        name: 'order',
        component: () => import('@/views/form/index'),
        meta: { title: '订单详情', icon: 'form' },
        children: [
          {
            path:'/order/solve/pending',
            name:'待处理',
           // component:() => import('@view/form/index'),
            meta:{title: '待处理',icon: 'form'}
          },
          {
            path:'/order/solve/handled',
            name:'已处理',
           // component:() => import('@view/form/index'),
            meta:{title: '已处理',icon: 'form'}
          }
        ]
      }
    ]
  },

  {
    path: '/asset',
    meta: {title:'资产管理',icon:'form'},
    name: 'asset',
    component: Layout,
    children:[{
      path: '/asset/detail',
      name:'assetDetail',
    }],
  },
  {
    path: '/mall',
    meta: {title:'商城管理',icon:'form'},
    name: 'asset',
    component: Layout,
    children:[{
      path: '/mall/home',
      name:'mallHome',
      meta:{title:'商品主页管理',icon:'form'},
      children:[
        {
        meta:{title:'商品种类管理',icon:'form'},
        path:'/mall/categories'
      },
      {
        meta:{title:'轮播图管理',icon:'form'},
        path:'/mall/carousel'
      }]
    }],
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
