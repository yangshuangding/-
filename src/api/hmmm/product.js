import { createAPI } from '@/utils/request'

// 商品列表
export const list = data => createAPI('/api/vm-service/sku/search', 'get', data)
// 修改商品类型
export const edit = data =>
  createAPI(`/api/vm-service/sku/${data.skuId}`, 'put', data)
// 新增商品类型
export const addService = data => createAPI('/api/vm-service/sku', 'POST', data)
// 商品类型列表
export const listType = data =>
  createAPI('/api/vm-service/skuClass/search', 'get', data)
// 商品数据导入
export const upload = data =>
  createAPI('/api/vm-service/sku/upload', 'POST', data)
