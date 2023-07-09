
import { createAPI } from '@/utils/request'

// 设备类型列表
export const typelist = data => createAPI('/api/vm-service/vmType/search', 'get', data)

// 设备类型修改
export const updatedevicetype = data => createAPI(`/api/vm-service/vmType/${data.typeId}`, 'put', data)

// 设备类型添加
export const add = data => createAPI('/api/vm-service/vmType', 'post', data)

// 设备类型图片修改
export const uploadimg = data => createAPI('/api/vm-service/sku/fileUpload', 'POST', data)

// 设备类型列表删除
export const remove = id =>
  createAPI(`/api/vm-service/vmType/${id}`, 'delete')

// 设备类型详情
export const typedetail = id =>
  createAPI(`/api/vm-service/vmType/${id}`, 'get')

// 设备列表
export const list = data => createAPI('/api/vm-service/vm/search', 'get', data)

// 设备销售量
export const orderCount = data => createAPI('/api/order-service/report/orderCount', 'get', data)

// 设备销售额
export const orderAmount = data => createAPI('/api/order-service/report/orderAmount', 'get', data)

// 设备补货次数
export const supplyCount = data => createAPI(`/api/task-service/task/supplyCount/${data.innerCode}/${data.start}/${data.end}`, 'get')

// 设备维修次数
export const repairCount = data => createAPI(`/api/task-service/task/repairCount/${data.innerCode}/${data.start}/${data.end}`, 'get')

// 设备商品销量
export const skuCollect = data => createAPI(`/api/order-service/report/skuCollect/${data.innerCode}/${data.start}/${data.end}`, 'get')

// 点位列表
export const nodelist = data => createAPI('/api/vm-service/node/search', 'get', data)

// 新增设备
export const adddevice = data => createAPI('/api/vm-service/vm', 'post', data)

// 修改设备点位
export const editdevice = data => createAPI(`/api/vm-service/vm/${data.id}/${data.nodeId}`, 'put')

// 获取销售策略
export const policylist = data => createAPI('/api/vm-service/policy', 'get', data)

// 应用销售策略
export const editpolicy = data => createAPI('/api/vm-service/vm/applyPolicy', 'PUT', data)

// 查询销售策略
export const viewpolicy = id => createAPI(`/api/vm-service/policy/vmPolicy/${id}`, 'get')

// 取消销售策略
export const cancelpolicy = data => createAPI(`/api/vm-service/vm/cancelPolicy/${data.innerCode}/${data.policyId}`, 'PUT')

// 获取货道详情
export const channelList = id => createAPI(`/api/vm-service/channel/channelList/${id}`, 'get')

// 商品搜索
export const prodsearch = data => createAPI('/api/vm-service/sku/search', 'get', data)

// top10
export const top10 = id => createAPI(`/api/vm-service/sku/businessTop10/${id}`, 'get')
