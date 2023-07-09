import { createAPI } from '@/utils/request'

// 获取销售额统计
export const list = data =>
  createAPI(
    `/api/order-service/report/amountCollect/${data.collectType}/${data.start}/${data.end}`
  )
// 获取销售量分布
export const regionCollect = data =>
  createAPI(`/api/order-service/report/regionCollect/${data.start}/${data.end}`)
// 合作商点位汇总统计
export const nodeCollect = data => createAPI('/api/vm-service/node/nodeCollect')
// 获取10个故障设备列表
export const FaultList = data => createAPI('/api/status-service/status/top10')
// 获取合作商总数
export const partner = data => createAPI('/api/user-service/partner/count')
// 获取点位总数
export const PointPosition = data => createAPI('/api/vm-service/node/count')
// 获取销售前几的商品
export const skuTop = data =>
  createAPI(`/api/order-service/report/skuTop/10/${data.start}/${data.end}`)
// 获取一定时间范围之内的订单总数
export const orderCount = data =>
  createAPI('/api/order-service/report/orderCount', 'get', data)
// 获取一定时间范围之内的收入
export const orderAmount = data =>
  createAPI('/api/order-service/report/orderAmount', 'get', data)
// 工单状态统计
export const service = data =>
  createAPI(`/api/task-service/task/taskReportInfo/${data.start}/${data.end}`)
