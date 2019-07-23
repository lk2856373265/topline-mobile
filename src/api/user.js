
import request from '@/utils/request'
/**
 * 封装用户相关接口请求函数
 */
/**
 * 用户登录
 */
export const login = ({ mobile, code }) => {
  // 执行其它逻辑
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data: {
      mobile,
      code
    }
  })
}
/**
 * 拉黑用户(加入黑名单)
 */
export const addBlackList = userId => {
  // 执行其它逻辑
  return request({
    method: 'POST',
    url: '/app/v1_0/user/blacklists',
    data: {
      target: userId
    }
  })
}
/**
 * 关注用户
 */
export const followUser = userId => {
  // 执行其它逻辑
  return request({
    method: 'POST',
    url: '/app/v1_0/user/followings',
    data: {
      target: userId
    }
  })
}
/**
 * 取消关注用户
 */
export const unFollowUser = userId => {
  // 执行其它逻辑
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/followings/${userId}`
  })
}
