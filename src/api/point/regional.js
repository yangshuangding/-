/*
 * @Author: taoshiwei
 * @Date: 2023-06-12 14:39:32
 * @Last Modified by: taoshiwei
 * @Last Modified time: 2023-06-20 14:57:26
 *
 * 区域管理
 */
import { createAPI } from '@/utils/request'

// 区域列表
export const list = data =>
  createAPI('/api/vm-service/region/search', 'get', data)
// 新增区域
export const newlyAdded = data =>
  createAPI('/api/vm-service/region', 'POST', data)
// 修改区域
export const modify = data =>
  createAPI('/api/vm-service/region/' + data.id, 'PUT', data)
// 获取区域详情
export const details = id =>
  createAPI('/api/vm-service/region/' + id, 'get')
// 删除区域
export const deletes = id => createAPI('/api/vm-service/region/' + id, 'DELETE')
// 商圈列表
export const listOfBusinessDistricts = data =>
  createAPI('/api/vm-service/businessType', 'get', data)
// 合作商搜索
export const partner = data =>
  createAPI('/api/user-service/partner/search', 'get', data)
// 新增合作商
export const addPartners = data =>
  createAPI('/api/user-service/partner', 'POST', data)
// 重置合作商密码
export const resetting = data =>
  createAPI('/api/user-service/partner/resetPwd/' + data.id, 'PUT', data)
// 修改合作商
export const modifyPartner = data =>
  createAPI('/api/user-service/partner/' + data.id, 'PUT', data)
// 点位搜索
export const pointSearch = data =>
  createAPI('/api/vm-service/node/search', 'get', data)
// 新增点位
export const addNewPoints = data =>
  createAPI('/api/vm-service/node', 'POST', data)
// 修改点位
export const modifyingPoints = data =>
  createAPI('/api/vm-service/node/' + data.id, 'PUT', data)
// 点位详情
export const pointDetails = id =>
  createAPI('/api/vm-service/node/vmList/' + id, 'get')
// 删除点位
export const deletePoint = id =>
  createAPI('/api/vm-service/node/' + id, 'DELETE')
// 删除合作商
export const deletePartner = id =>
  createAPI('/api/user-service/partner/' + id, 'DELETE')
