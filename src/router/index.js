import Vue from 'vue'
import Router from 'vue-router'
// import store from '@/store'
// import { Message } from 'element-ui'
import NProgress from 'nprogress'
import Layout from '@/module-dashboard/pages/layout'
import { getToken } from '@/utils/auth'
// import { login } from '../api/base/frame'
// import pointRouter from '@/module-hmmm/router'

// 定义
const _import = require('./import_' + process.env.NODE_ENV) // 懒加载 导包
const whiteList = ['/login', '/authredirect'] // 白名单 无需跳转

// 配置
Vue.use(Router)
NProgress.configure({ showSpinner: false }) // NProgress Configuration

/**
 * 基础路由
 *
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [
  {
    path: '/login',
    component: _import('dashboard/pages/login'),
    hidden: true
  },
  {
    path: '/authredirect',
    component: _import('dashboard/pages/authredirect'),
    hidden: true
  },
  { path: '/404', component: _import('dashboard/pages/404'), hidden: true },
  { path: '/401', component: _import('dashboard/pages/401'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: _import('dashboard/pages/dashboard'),
        name: 'dashboard',
        meta: { title: '帝可得', icon: 'el-icon-s-home', noCache: true }
      }
    ]
  },
  {
    path: '/workorder',
    component: Layout,
    redirect: 'noredirect',
    name: 'workorder',
    meta: {
      title: '工单管理',
      icon: 'el-icon-s-order'
    },
    children: [
      {
        path: 'operational-tickets',
        component: _import('manage/pages/operational-tickets'),
        name: 'Operational-tickets',
        meta: { title: '运营工单', noCache: true, icon: 'component' }
      },
      {
        path: 'O&M-tickets',
        name: 'O&M-tickets',
        component: _import('manage/pages/O&M-tickets'),
        meta: { title: '运维工单', noCache: true, icon: 'component' }
      }
    ]
  },
  {
    path: '/point',
    component: Layout,
    redirect: 'noredirect',
    name: 'point',
    meta: {
      title: '点位管理',
      icon: 'el-icon-location-information'
    },
    children: [
      {
        path: 'regional',
        component: _import('hmmm/pages/regional'),
        name: 'regional',
        meta: { title: '区域管理', noCache: true, icon: 'component' }
      },
      {
        path: 'point-management',
        component: _import('hmmm/pages/point-management'),
        name: 'point-management',
        meta: { title: '点位管理', noCache: true, icon: 'component' }
      },
      {
        path: 'partner',
        component: _import('hmmm/pages/partner'),
        name: 'partner',
        meta: { title: '合作商管理', noCache: true, icon: 'component' }
      }
      // {
      //   path: 'randoms',
      //   component: _import('hmmm/pages/questions-randoms'),
      //   name: 'questions-randoms',
      //   meta: { title: '组题列表', noCache: true, icon: 'component' }
      // }
    ]
  },
  {
    path: '/device',
    component: Layout,
    redirect: 'noredirect',
    name: 'device',
    meta: {
      title: '设备管理',
      icon: 'el-icon-monitor'
    },
    children: [
      {
        path: 'device-management',
        component: _import('hmmm/pages/device-management'),
        name: 'device-management',
        meta: { title: '设备管理', noCache: true, icon: 'component' }
      },
      {
        path: 'device-status',
        component: _import('hmmm/pages/device-status'),
        name: 'device-status',
        meta: { title: '设备状态', noCache: true, icon: 'component' }
      },
      {
        path: 'device-type',
        component: _import('hmmm/pages/device-type'),
        name: 'device',
        meta: { title: '设备类型管理', noCache: true, icon: 'component' }
      }
    ]
  },
  {
    path: '/people',
    component: Layout,
    redirect: 'noredirect',
    name: 'people',
    meta: {
      title: '人员管理',
      icon: 'el-icon-s-custom'
    },
    children: [
      {
        path: 'people-list',
        component: _import('hmmm/pages/PeopleList'),
        name: 'people-list',
        meta: { title: '人员列表', noCache: true, icon: 'component' }
      },
      {
        path: 'human-statistics',
        component: _import('hmmm/pages/HumanStatistics'),
        name: 'human-statistics',
        meta: { title: '人效统计', noCache: true, icon: 'component' }
      },
      {
        path: 'listWorkloads',
        component: _import('hmmm/pages/listWorkloads'),
        name: 'listWorkloads',
        meta: { title: '工作量列表', noCache: true, icon: 'component' }
      }
    ]
  },
  {
    path: '/product',
    component: Layout,
    redirect: 'noredirect',
    name: 'product',
    meta: {
      title: '商品管理',
      icon: 'el-icon-box'
    },
    children: [
      {
        path: 'product-type',
        component: _import('hmmm/pages/productType'),
        name: 'people-type',
        meta: { title: '商品类型', noCache: true, icon: 'component' }
      },
      {
        path: 'merchandise',
        component: _import('hmmm/pages/merchandise'),
        name: 'merchandise',
        meta: { title: '商品管理', noCache: true, icon: 'component' }
      }
    ]
  },
  {
    path: '/policy',
    component: Layout,
    redirect: 'noredirect',
    name: 'policy',
    meta: {
      title: '策略管理',
      icon: 'el-icon-view'
    },
    children: [
      {
        path: 'policy-management',
        component: _import('hmmm/pages/policyManagement'),
        name: 'policy-management',
        meta: { title: '策略管理', noCache: true, icon: 'el-icon-view' }
      }
    ]
  },
  {
    path: '/order',
    component: Layout,
    redirect: 'noredirect',
    name: 'order',
    meta: {
      title: '订单管理',
      icon: 'el-icon-tickets'
    },
    children: [
      {
        path: 'order-management',
        component: _import('hmmm/pages/orderManagement'),
        name: 'order-management',
        meta: { title: '订单管理', noCache: true, icon: 'el-icon-tickets' }
      }
    ]
  },
  {
    path: '/reconciliation',
    component: Layout,
    redirect: 'noredirect',
    name: 'reconciliation',
    meta: {
      title: '对账统计',
      icon: 'el-icon-s-order'
    },
    children: [
      {
        path: 'reconciliation-statistics',
        component: _import('hmmm/pages/reconciliation-statistics'),
        name: 'reconciliation-statistics',
        meta: { title: '对账统计', noCache: true, icon: 'el-icon-s-order' }
      }
    ]
  }
]

/**
 * 配置路由
 **/
const router = new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  if (getToken()) {
    // determine if there has token
    /* has token */
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done() // if current page is dashboard will not triggerafterEach hook, so manually handle it
    } else {
      next()
    }
  } else {
    /* has no token */
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next()
    } else {
      next('/login') // 否则全部重定向到登录页
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})

/**
 * 导出 基础路由
 **/
export default router

/**
 * 导出 业务路由
 **/
export const asyncRouterMap = [{ path: '*', redirect: '/404', hidden: true }]
