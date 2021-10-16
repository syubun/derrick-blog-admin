/**
 * @author chuzhixin 1204505056@qq.com
 * @description 路由攔截狀態管理，目前兩種模式：all模式與intelligence模式，其中partialRoutes是菜單暫未使用
 */
import { asyncRoutes, constantRoutes } from '@/router'
import { getRouterList } from '@/api/router'
import { convertRouter, filterRoutes } from '@/utils/routes'

const state = () => ({
  routes: [],
  partialRoutes: [],
})
const getters = {
  routes: (state) => state.routes,
  partialRoutes: (state) => state.partialRoutes,
}
const mutations = {
  setRoutes(state, routes) {
    state.routes = routes
  },
  setPartialRoutes(state, routes) {
    state.partialRoutes = routes
  },
}
const actions = {
  /**
   * @description intelligence模式設置路由
   * @param {*} { commit }
   * @returns
   */
  async setRoutes({ commit }) {
    const finallyRoutes = filterRoutes([...constantRoutes, ...asyncRoutes])
    commit('setRoutes', finallyRoutes)
    return [...asyncRoutes]
  },
  /**
   * @description all模式設置路由
   * @param {*} { commit }
   * @returns
   */
  async setAllRoutes({ commit }) {
    let { data } = await getRouterList()
    if (data[data.length - 1].path !== '*')
      data.push({ path: '*', redirect: '/404', hidden: true })
    const asyncRoutes = convertRouter(data)
    const finallyRoutes = filterRoutes([...constantRoutes, ...asyncRoutes])
    commit('setRoutes', finallyRoutes)
    return [...asyncRoutes]
  },
  /**
   * @descriptio
   * @param {*} { commit }n 畫廊布局、綜合布局設置路由
   * @param accessedRoutes 畫廊布局、綜合布局設置路由
   */
  setPartialRoutes({ commit }, accessedRoutes) {
    commit('setPartialRoutes', accessedRoutes)
  },
}
export default { state, getters, mutations, actions }
