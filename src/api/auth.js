import request from '@/utils/request'

// 登录
export function login(data) {
  return request({
    url: `/api/auth/login`,
    method: 'post',
    data: data
  })
}

// 注册
export function register(data) {
  return request({
    url: `/api/auth/register`,
    method: 'post',
    data: data
  })
}
