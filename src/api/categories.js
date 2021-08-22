import request from '@/utils/request'

export function getCategorie() {
  return request({
    url: '/categorie',
    method: 'get',
  })
}
export function patchCategorie(id, data) {
  return request({
    url: `/categorie/${id}`,
    method: 'patch',
    data,
  })
}
export function putCategorie(id, data) {
  return request({
    url: `/categorie/${id}`,
    method: 'put',
    data,
  })
}
export function deleteCategorie(id) {
  return request({
    url: `/categorie/${id}`,
    method: 'delete',
  })
}

export function createCategorie(data) {
  return request({
    url: `/categorie`,
    method: 'post',
    data,
  })
}
