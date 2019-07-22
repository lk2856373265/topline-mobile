import axios from 'axios'
import store from '@/store'
import JSONbig from 'json-bigint'
import router from '@/router'
/**
 * axios.create 用于创建一个 axios 实例，该实例和 axios 的功能是一模一样的
 * 说白了就是克隆了一个 axios
 * 为什么要这样做：我们可以拥有多个不同的请求函数，而他们的配置可能是不一样的
 * 例如有些项目中可能会涉及到使用不同的接口路径
 *    http://toutiao.course.itcast.cn
 *    http://a.com
 *    http://b.com
 */
const request = axios.create({
  // baseURL: 'http://toutiao.course.itcast.cn'
  baseURL: 'http://ttapi.research.itcast.cn'
})
request.defaults.transformResponse = [function (data) {
  try {
    // data 数据可能不是标准的 JSON 格式字符串，否则会导致 JSONbig.parse(data) 转换失败报错
    return JSONbig.parse(data)
  } catch (err) {
    // 无法转换的数据直接原样返回
    return data
  }
}]
// Add a request interceptor
request.interceptors.request.use(function (config) {
  // Do something before request is sent
  const { user } = store.state
  // 如果已登录，则为请求接口统一添加用户token
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// Add a response interceptor
request.interceptors.response.use(function (response) {
  // Do something with response data

  // 如果响应结果对象中有 data，则直接返回这个 data 数据
  // 如果响应结果对象中没有 data，则不作任何处理，直接原样返回这个数据
  return response.data.data || response.data
}, async error => {
  if (error.response.status === 401) {
    // 看一下有没有 user （有user 就有refresh_token）
    const user = store.state.user
    // 如果没有user ,则跳转到登录页去登录
    if (!user) {
      router.push({
        name: 'login'
      })
      return
    }
    // 如果有user ,请求接口使用refresh_token 获取新的访问token
    try {
      // 注意：请求刷新token 不要使用request
      const { data } = await axios({
        method: 'PUT',
        url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
        headers: {
          Authorization: `Bearer ${user.refresh_token}`
        }
      })
      // 拿到新的登录令牌
      // 更新用户token
      store.commit('setUser', {
        token: data.data.token,
        refresh_token: user.refresh_token
      })
      // 把本次因为token过期而发送失败的请求继续发出去
      return request(error.config)
    } catch (refreshErr) {
      // 刷新token 请求失败，直接去登录页
      router.push({
        name: 'login'
      })
    }
  }
  // Do something with response error
  return Promise.reject(error)
})

export default request
