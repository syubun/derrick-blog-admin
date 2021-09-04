import axios from 'axios'
import {
  baseURL,
  contentType,
  debounce,
  requestTimeout,
  successCode,
} from '@/config'
import store from '@/store'
import qs from 'qs'
import router from '@/router'
import { isArray } from '@/utils/validate'
import { message } from 'ant-design-vue'

import { jsonToHump, jsonToUnderline } from '@/utils/hump'

let loadingInstance

/**
 * @description 處理code異常
 * @param {*} code
 * @param {*} msg
 */
const handleCode = (code, msg) => {
  switch (code) {
    case 401:
      message.error(msg || '登錄失效')
      store.dispatch('user/resetAll').catch(() => {})
      break
    case 403:
      router.push({ path: '/401' }).catch(() => {})
      break
    case 429:
      message.error(msg || '多次請求，暫時封鎖')
      break
    default:
      message.error(msg || `後端接口${code}異常`)
      break
  }
}

/**
 * @description axios初始化
 */
const instance = axios.create({
  baseURL,
  timeout: requestTimeout,
  headers: {
    'Content-Type': contentType,
  },
})

/**
 * @description axios請求攔截器
 */
instance.interceptors.request.use(
  (config) => {
    config.data = jsonToUnderline(config.data)
    if (store.getters['user/accessToken'])
      config.headers.Authorization = `Bearer ${store.getters['user/accessToken']}`
    if (
      config.data &&
      config.headers['Content-Type'] ===
        'application/x-www-form-urlencoded;charset=UTF-8'
    )
      config.data = qs.stringify(config.data)
    if (debounce.some((item) => config.url.includes(item))) {
      //這裡寫加載動畫
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

/**
 * @description axios響應攔截器
 */
instance.interceptors.response.use(
  (response) => {
    if (loadingInstance) loadingInstance.close()

    const { data, config, status } = response
    const { message } = data
    // 操作正常Code數組
    const codeVerificationArray = isArray(successCode)
      ? [...successCode]
      : [...[successCode]]
    // 是否操作正常
    if (codeVerificationArray.includes(status)) {
      return jsonToHump(data)
    } else {
      handleCode(status, message)
      return Promise.reject(
        'vue-admin-beautiful請求異常攔截:' +
          JSON.stringify({ url: config.url, status, message }) || 'Error'
      )
    }
  },
  (error) => {
    if (loadingInstance) loadingInstance.close()
    const { response, message } = error
    if (error.response && error.response.data) {
      const { status, data } = response
      handleCode(status, data.msg || data.message || message)
      return Promise.reject(error)
    } else {
      let { message } = error
      if (message === 'Network Error') {
        message = '後端接口連接異常'
      }
      if (message.includes('timeout')) {
        message = '後端接口請求超時'
      }
      if (message.includes('Request failed with status code')) {
        const code = message.substr(message.length - 3)
        message = '後端接口' + code + '異常'
      }
      message.error(message || `後端接口未知異常`)
      return Promise.reject(error)
    }
  }
)

export default instance
