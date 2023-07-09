import { createAPI } from '@/utils/request'

export const peopleList = data => createAPI('/api/user-service/user/search', 'get', data)

// 角色列表
export const roleList = data => createAPI('/api/user-service/role', 'get', data)

// 负责区域
export const areaList = data => createAPI('/api/vm-service/region/search', 'get', data)

// 新增人员
export const addPeople = data => createAPI('/api/user-service/user', 'post', data)

// 删除人员
export const delPeople = data => createAPI(`/api/user-service/user/${data}`, 'delete')

// 修改人员
export const updataPeople = data => createAPI(`/api/user-service/user/${data.id}`, 'put', data)

// 人员工作量列表
export const searchUserWork = data => createAPI('/api/user-service/user/searchUserWork', 'get', data)

// 获取用户基本信息
export const kunList = id => createAPI(`/api/user-service/user/${id}`, 'get')

// 获取用户工作量
export const getUserWork = data => createAPI('/api/task-service/task/userWork', 'get', data)

// 获取人员统计头部信息
export const getStatistics = data => createAPI(`/api/task-service/task/taskReportInfo/${data.start}/${data.end}`, 'get')

// 工单状态统计
export const getStatus = data => createAPI(`/api/task-service/task/collectReport/${data.start}/${data.end}`, 'get')
