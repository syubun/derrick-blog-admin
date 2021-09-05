import request from '@/utils/request'

export function getSerie(params) {
  return request({
    url: '/serie',
    method: 'get',
    params,
  })
}
export function patchSerie(id, data) {
  return request({
    url: `/serie/${id}`,
    method: 'patch',
    data,
  })
}
export function putSerie(id, data) {
  return request({
    url: `/serie/${id}`,
    method: 'put',
    data,
  })
}
export function deleteSerie(id) {
  return request({
    url: `/serie/${id}`,
    method: 'delete',
  })
}

export function createSerie(data) {
  return request({
    url: `/serie`,
    method: 'post',
    data,
  })
}
