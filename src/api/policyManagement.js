import { createAPI } from '@/utils/request'
// import request from '../../utils/request-code'

// export const getList = data => createAPI('/api/vm-service/policy/vmList/', 'get', data)
export const getList = data => createAPI('/api/vm-service/policy/search', 'get', data)
// 新增
export const getAddList = data => createAPI('/api/vm-service/policy', 'POST', data)
// 删除
export const deleteList = data => createAPI('/api/vm-service/policy/' + data.id, 'DELETE', data)
// 修改
export const editList = data => createAPI('/api/vm-service/policy/' + data.policyId, 'PUT', data)
// 详情
export const detailsList = id => createAPI('/api/vm-service/policy/vmList/' + id, 'GET')
