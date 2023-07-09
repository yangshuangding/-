import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
// import { getToken } from '@/utils/auth'

const request = axios.create({
  baseURL: 'https://likede2-admin.itheima.net/likede', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// 添加请求拦截器
request.interceptors.request.use(function (config) {
  // config就是请求的信息
  // 对config进行处理，然后发起请求

  // console.log(config.headers.Authorization)

  // 请求发送之前给每一个请求头加上token
  if (store.getters.token) {
    config.headers.Authorization = `Bearer ${store.getters.token}`
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
request.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么

  // axios默认包裹了data
  // 判断是不是Blob
  if (response.data instanceof Blob) return response.data // 返回了Blob对象
  // 在每次响应数据返回的时候解构
  const { data, message, success } = response.data
  if (success) {
    return data
  } else {
    Message.error(message)
    return Promise.reject(message)
  }
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  if (error.response.status === 401) {
    // Message.warning('token过期！')
    // store.dispatch('user/storeDelToken')
    // router.push('/login')
  } else {
    Message.error('错了')
  }

  // const status = error.response.status

  // 判断错误状态码是否为401
  // if (status === 401) return window.location.href = '/login.html'

  return Promise.reject(error)
})

export default request
