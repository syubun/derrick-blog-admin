import request from '@/utils/request'

export function getNewsfeedApi(params = undefined) {
  return request({
    url: 'newsfeed',
    method: 'get',
    params,
  })
}

export function putNewsfeedApi(id, data) {
  return request({
    url: `/newsfeed/${id}`,
    method: 'put',
    data,
  })
}
export function postNewsfeedApi(data) {
  return request({
    url: '/newsfeed',
    method: 'post',
    data,
  })
}
