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
    name: 'user',
    meta: { title: '用户管理', icon: 'example' },
    redirect:'/user/info',
    children: [
      {
        meta: { title: '所有用户', icon: 'table' },
        name:'userInfo',
        path:'/user/info',
        component:()=>import('@/views/user/user')
      },
      {
        path:'/user/status',
        name:'userStatus',
        component:()=>import('@/views/user/userStatus'),
        meta:{title:'冻结用户管理',icon:'form'}
      },
      {
        path: '/user/audit',
        name: 'userAduit',
        component: () => import('@/views/user/userAuth'),
        meta: { title: '用户权限', icon: 'table' }
      },
      {
        path: '/user/vertify',
        name: 'userVertify',
        meta:{title: '用户认证',icon: 'form'},
        redirect:'/user/vertify/pending',
        component:() => import('@/views/layout/components/AppMain'),
        children: [
          {
            path:'/user/vertify/pending',
            name:'待处理',
            component: () => import('@/views/user/auditPending'),
            meta:{title: '待处理',icon: 'form'}
          },
          {
            path:'/user/vertify/handled',
            name:'已处理',
            component: () => import('@/views/user/auditHandled'),
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
    redirect:'/product/info',
    meta: { title: '商品管理', icon: 'example' },
    children: [
      {
        path: '/product/info',
        name: 'productInfo',
        component: () => import('@/views/products/products'),
        meta: { title: '所有商品', icon: 'form' },
      },
      {
        path:'/product/category',
        name: 'productCategory',
        meta:{title:'商品种类管理',icon:'form'},
        component: () => import('@/views/products/category'),
      },
      {
        path: '/product/audit',
        name: 'productAdudit',
        redirect:'/product/audit/pending',
        component: () => import('@/views/products/products'),
        meta: { title: '商品认证', icon: 'form' },
        children: [
          {
            path:'/product/audit/pending',
            name:'productAuditPending',
           // component:() => import('@view/form/index'),
            meta:{title: '待处理',icon: 'form'}
          },
          {
            path:'/product/audit/handled',
            name:'productAuditHandled',
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
        name: 'orderAll',
        component: () => import('@/views/form/index'),
        meta: { title: '所有订单', icon: 'form' }
      },
      {
        path: '/order/solve',
        name: 'orderSolve',
        component: () => import('@/views/form/index'),
        meta: { title: '订单详情', icon: 'form' },
        children: [
          {
            path:'/order/solve/pending',
            name:'orderSolvePending',
           // component:() => import('@view/form/index'),
            meta:{title: '待处理',icon: 'form'}
          },
          {
            path:'/order/solve/handled',
            name:'orderSolveHandled',
           // component:() => import('@view/form/index'),
            meta:{title: '已处理',icon: 'form'}
          }
        ]
      }
    ]
  },
  {
    path:'/permission',
    meta: {title:'权限管理',icon:'form'},
    name: 'asset',
    component: Layout,
    children:[{
      path:'/permission/all',
      name:'allRoles',
     // component:() => import('@view/form/index'),
      meta:{title: '所有角色',icon: 'form'}
    },
    {
      path:'/permission/addRole',
      name:'addRole',
     // component:() => import('@view/form/index'),
      meta:{title: '新增角色',icon: 'form'}
    }],
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
    name: 'mall',
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
