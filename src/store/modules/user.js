/**
 * @description 登錄、獲取用戶信息、退出登錄、清除accessToken邏輯，不建議修改
 */
import { getUserInfo, login, logout } from '@/api/user'
import {
  getAccessToken,
  removeAccessToken,
  setAccessToken,
} from '@/utils/accessToken'
import { title, tokenName } from '@/config'
import { message, notification } from 'ant-design-vue'

const state = () => ({
  accessToken: getAccessToken(),
  username: '',
  avatar: '',
})
const getters = {
  accessToken: (state) => state.accessToken,
  username: (state) => state.username,
  avatar: (state) => state.avatar,
}
const mutations = {
  /**
   * @description 設置accessToken
   * @param {*} state
   * @param {*} accessToken
   */
  setAccessToken(state, accessToken) {
    state.accessToken = accessToken
    setAccessToken(accessToken)
  },
  /**
   * @description 設置用戶名
   * @param {*} state
   * @param {*} username
   */
  setUsername(state, username) {
    state.username = username
  },
  /**
   * @description 設置頭像
   * @param {*} state
   * @param {*} avatar
   */
  setAvatar(state, avatar) {
    state.avatar = avatar
  },
}
const actions = {
  /**
   * @description 登錄攔截放行時，設置虛擬角色
   * @param {*} { commit, dispatch }
   */
  setVirtualRoles({ commit, dispatch }) {
    dispatch('acl/setFull', true, { root: true })
    commit('setAvatar', 'https://i.gtimg.cn/club/item/face/img/2/15922_100.gif')
    commit('setUsername', 'admin(未開啟登錄攔截)')
  },
  /**
   * @description 登錄
   * @param {*} { commit }
   * @param {*} userInfo
   */
  async login({ commit }, userInfo) {
    const { result } = await login(userInfo)
    const accessToken = result[tokenName]
    if (accessToken) {
      commit('setAccessToken', accessToken)
      const hour = new Date().getHours()
      const thisTime =
        hour < 8
          ? '早上好'
          : hour <= 11
          ? '上午好'
          : hour <= 13
          ? '中午好'
          : hour < 18
          ? '下午好'
          : '晚上好'
      notification.open({
        message: `歡迎登錄${title}`,
        description: `${thisTime}！`,
      })
    } else {
      message.error(`登錄接口異常，未正確返回${tokenName}...`)
    }
  },
  /**
   * @description 獲取用戶信息接口 這個接口非常非常重要，如果沒有明確底層前邏輯禁止修改此方法，錯誤的修改可能造成整個框架無法正常使用
   * @param {*} { commit, dispatch, state }
   * @returns
   */
  async getUserInfo({ commit, dispatch }) {
    const { result } = await getUserInfo()
    if (!result) {
      message.error(`驗證失敗，請重新登錄...`)
      return false
    }
    let { name, detail, roles, ability } = result
    if (name && roles && Array.isArray(roles)) {
      dispatch('acl/setRole', roles, { root: true })
      if (ability && ability.length > 0)
        dispatch('acl/setAbility', ability, { root: true })
      commit('setUsername', name)
      commit('setAvatar', detail.avatar)
    } else {
      message.error('用戶信息接口異常')
    }
  },

  /**
   * @description 退出登錄
   * @param {*} { dispatch }
   */
  async logout({ dispatch }) {
    await logout(state.accessToken)
    await dispatch('resetAll')
  },
  /**
   * @description 重置accessToken、roles、ability、router等
   * @param {*} { commit, dispatch }
   */
  async resetAll({ dispatch }) {
    await dispatch('setAccessToken', '')
    await dispatch('acl/setFull', false, { root: true })
    await dispatch('acl/setRole', [], { root: true })
    await dispatch('acl/setAbility', [], { root: true })
    removeAccessToken()
  },
  /**
   * @description 設置token
   */
  setAccessToken({ commit }, accessToken) {
    commit('setAccessToken', accessToken)
  },
}
export default { state, getters, mutations, actions }
