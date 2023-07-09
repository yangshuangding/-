import { createAPI } from '@/utils/request'

// 商品类型列表
export const list = data =>
  createAPI('/api/vm-service/skuClass/search', 'get', data)
// 修改商品类型
export const edit = data =>
  createAPI(`/api/vm-service/skuClass/${data.classId}`, 'put', data)
// 删除商品类型
export const delets = data =>
  createAPI(`/api/vm-service/skuClass/${data.classId}`, 'DELETE', data)
// 新增商品类型
export const addService = data =>
  createAPI('/api/vm-service/skuClass', 'POST', data)
