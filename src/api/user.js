import request from '@/utils/request'

export async function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data,
  })
}

export async function socialLogin(data) {
  return request({
    url: '/user/socialLogin',
    method: 'post',
    data,
  })
}

export function getUserInfo() {
  //此處為了兼容mock.js使用data傳遞accessToken，如果使用mock可以走headers
  return request({
    url: '/user/information',
    method: 'get',
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post',
  })
}

export function register() {
  return request({
    url: '/user/register',
    method: 'post',
  })
}
