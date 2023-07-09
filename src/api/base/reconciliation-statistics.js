import { createAPI } from '@/utils/request'

// 获取一定日期范围之内的合作商分成汇总数据
export const list = data => createAPI('/api/order-service/report/partnerCollect', 'get', data)

// 获取一定时间范围之内的分成总数
export const total = data => createAPI('/api/order-service/report/totalBill', 'get', data)

// 获取一定时间范围之内的收入
export const amount = data => createAPI('/api/order-service/report/orderAmount', 'get', data)

// 获取一定时间范围之内的订单总数
export const count = data => createAPI('/api/order-service/report/orderCount', 'get', data)

// 获取销售额统计
export const collect = data => createAPI(`/api/order-service/report/amountCollect/${data.collectType}/${data.start}/${data.end}`, 'get')

// 合作商点位汇总统计
export const nodeCollect = data => createAPI('/api/vm-service/node/nodeCollect', 'get', data)
