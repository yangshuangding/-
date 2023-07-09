import { createAPI } from '@/utils/request'

export const list = data => createAPI('/api/vm-service/policy/search', 'get', data)
