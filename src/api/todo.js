import request from '@/utils/request'

export function list(params) {
  return request({
    url: `/api/todo/list`,
    method: 'get',
    params: params
  })
}

export function info(id) {
  return request({
    url: `/api/todo/${id}`,
    method: 'get'
  })
}

export function add(data) {
  return request({
    url: `/api/todo`,
    method: 'post',
    data: data
  })
}

export function update(id, data) {
  return request({
    url: `/api/todo/${id}`,
    method: 'patch',
    data: data
  })
}

export function remove(id) {
  return request({
    url: `/api/todo/${id}`,
    method: 'delete'
  })
}
