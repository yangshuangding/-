import { createAPI } from '@/utils/request'

export const WorkorderList = data => createAPI('/api/order-service/order/search', 'get', data)
