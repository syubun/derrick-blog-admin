import request from '@/utils/request'

export function getArticle(params) {
  return request({
    url: '/article',
    method: 'get',
    params,
  })
}
export function patchArticle(id, data) {
  return request({
    url: `/article/${id}`,
    method: 'patch',
    data,
  })
}
export function putArticle(id, data) {
  return request({
    url: `/article/${id}`,
    method: 'put',
    data,
  })
}
export function deleteArticle(id) {
  return request({
    url: `/article/${id}`,
    method: 'delete',
  })
}

export function createArticle(data) {
  return request({
    url: `/article`,
    method: 'post',
    data,
  })
}
export function articleCountApi(params = undefined) {
  return request({
    url: '/article/count',
    method: 'get',
    params,
  })
}
