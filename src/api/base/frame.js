import { createAPI } from '@/utils/request'
// import request from '../../utils/request-code'

export const login = data => createAPI('/api/user-service/user/login', 'post', data)
export const register = data => createAPI('/frame/register', 'post', data)
export const logout = data => createAPI('/frame/logout', 'post', data)
export const passwd = data => createAPI('/frame/passwd', 'post', data)
// export const profile = data => createAPI('/frame/profile', 'post', data)
export const code = clientToken => createAPI('/api/user-service/user/imageCode/' + clientToken, 'get', 'blob')

// export function code (clientToken) {
//   return request({
//     url: '/api/user-service/user/imageCode/' + clientToken,
//     method: 'get',
//     responseType: 'blob' // 选择接收方式为blob
//   })
// }
