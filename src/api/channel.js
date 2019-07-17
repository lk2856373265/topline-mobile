/**
 * 封装频道相关接口请求函数
 */
import request from '@/utils/request'

/**
 * 获取首页频道列表
 * 已登录(携带token)：用户频道列表
 * 未登录：推荐频道列表
 */
export const getUserChannels = () => {
  // 执行其它逻辑
  return request({
    method: 'GET',
    url: '/app/v1_0/user/channels'
  })
}
/**
 * 获取所有频道列表
 */
export const getAllChannels = () => {
  // 执行其它逻辑
  return request({
    method: 'GET',
    url: '/app/v1_0/channels'
  })
}
/**
 * 批量修改用户频道列表（重置）
 * channels: []
 *  {id: 频道id, seq: 顺序序号}
 * 数据的顺序都是从2开始
 * 因为推荐是用户默认的频道，推荐从1开始
 */
export const resetUserChannels = (channels) => {
  // 执行其它逻辑
  return request({
    method: 'PUT',
    url: '/app/v1_0/user/channels',
    data: {
      channels
    }
  })
}
