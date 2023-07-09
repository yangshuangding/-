import { createAPI } from '@/utils/request'
// import request from '../../utils/request-code'

// export const WorkorderList = data => createAPI('/api/task-service/task/search', 'get', data)
export const WorkorderList = data => createAPI('/api/task-service/task/search', 'get', data)

// 新增
export const addListData = data => createAPI('/api/task-service/task/create', 'POST', data)
// 运营人员
export const OperationPersonnel = data => createAPI('/api/user-service/user/search', 'GET', data)
// 工单类型
export const WorkOrderType = data => createAPI('/api/task-service/taskType/list', 'GET', data)

// 补货详情
export const replenishmentList = data => createAPI('/api/task-service/taskDetails/' + data.id, 'GET', data)

// 获取售货机货道详情
export const channelList = id => createAPI('/api/vm-service/channel/channelList/' + id, 'GET')
