import request from '@/utils/request'

export function getBlogInfoDetailApi(id) {
  return request({
    url: `/info/${id}`,
    method: 'get',
  })
}

export function patchBlogInfo(id, data) {
  data.append('_method', 'put')
  return request({
    url: `/info/${id}`,
    method: 'post',
    data,
  })
}
