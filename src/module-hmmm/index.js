/*
 * @Author: admin
 * @Description: 黑马面面
 * @Date: 2018-04-13 16:13:27
 * @Last Modified by: taoshiwei
 * @Last Modified time: 2019-04-29 16:56:35
 */

// vue-router
import { asyncRouterMap } from '@/router'
import routerMaps from './router'
// vuex
import app2 from './store/app2'

export default {
  install (module, store) {
    // 注册路由
    for (const iterator of routerMaps) {
      asyncRouterMap.push(iterator)
    }
    // asyncRouterMap.push(routerMaps[0])
    // 注册状态管理
    if (store !== undefined) {
      store.registerModule('app2', app2)
    }
  }
}

// cd C:\\Users\\Administrator\\Desktop\\build\\toutitao-25-1 && git pull && npm i && npm run build && cd ./dist && cp -r -f ./ C:\\phpstudy_pro\\WWW\\weldon.net.cn\\toutiao
