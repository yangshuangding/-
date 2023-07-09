import Layout from '@/module-dashboard/pages/layout'
const _import = require('@/router/import_' + process.env.NODE_ENV)

export default [

  {
    path: '/point',
    component: Layout,
    redirect: 'noredirect',
    name: 'point',
    meta: {
      title: '点位管理',
      icon: 'documentation'
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
      icon: 'table'
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
      icon: 'table'
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
      icon: 'table'
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
      icon: 'component'
    },
    children: [
      {
        path: 'policy-management',
        component: _import('hmmm/pages/policyManagement'),
        name: 'policy-management',
        meta: { title: '策略管理', noCache: true, icon: 'peoples' }
      }
    ]
  },
  // {
  //   path: '/order',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   name: 'order',
  //   meta: {
  //     title: '面试技巧',
  //     icon: 'form'
  //   },
  //   children: [
  //     {
  //       path: 'order-management',
  //       component: _import('hmmm/pages/orderManagement'),
  //       name: 'order-management',
  //       meta: { title: '面试技巧', noCache: true, icon: 'component' }
  //     }
  //   ]
  // }

  {
    path: '/reconciliation',
    component: Layout,
    redirect: 'noredirect',
    name: 'reconciliation',
    meta: {
      title: '对账统计',
      icon: 'form'
    },
    children: [
      {
        path: 'reconciliation-statistics',
        component: _import('hmmm/pages/reconciliation-statistics'),
        name: 'order-management',
        meta: { title: '对账统计', noCache: true, icon: 'component' }
      }
    ]
  }
]
