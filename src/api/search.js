import request from '@/utils/request'
/**
 * 封装搜索接口相关函数
 */
export const getSuggestion = q => {
  return request({
    method: 'GET',
    url: '/app/v1_0/suggestion',
    params: {
      q
    }
  })
}
