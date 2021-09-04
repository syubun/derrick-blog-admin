/**
 * @description tagsBar多標籤頁邏輯，前期借鑒了很多開源項目發現都有個共同的特點很繁瑣並不符合框架設計的初衷，後來在github用戶cyea的啟發下完成了重構，請勿修改
 */

const state = () => ({
  visitedRoutes: [],
})
const getters = {
  visitedRoutes: (state) => state.visitedRoutes,
}
const mutations = {
  /**
   * @description 添加標籤頁
   * @param {*} state
   * @param {*} route
   * @returns
   */
  addVisitedRoute(state, route) {
    let target = state.visitedRoutes.find((item) => item.path === route.path)
    if (target) {
      if (route.fullPath !== target.fullPath) Object.assign(target, route)
      return
    }
    state.visitedRoutes.push(Object.assign({}, route))
  },
  /**
   * @description 刪除當前標籤頁
   * @param {*} state
   * @param {*} route
   * @returns
   */
  delVisitedRoute(state, route) {
    state.visitedRoutes.forEach((item, index) => {
      if (item.path === route.path) state.visitedRoutes.splice(index, 1)
    })
  },
  /**
   * @description 刪除當前標籤頁以外其它全部多標籤頁
   * @param {*} state
   * @param {*} route
   * @returns
   */
  delOthersVisitedRoutes(state, route) {
    state.visitedRoutes = state.visitedRoutes.filter(
      (item) => item.meta.affix || item.path === route.path
    )
  },
  /**
   * @description 刪除當前標籤頁左邊全部多標籤頁
   * @param {*} state
   * @param {*} route
   * @returns
   */
  delLeftVisitedRoutes(state, route) {
    let index = state.visitedRoutes.length
    state.visitedRoutes = state.visitedRoutes.filter((item) => {
      if (item.name === route.name) index = state.visitedRoutes.indexOf(item)
      return item.meta.affix || index <= state.visitedRoutes.indexOf(item)
    })
  },
  /**
   * @description 刪除當前標籤頁右邊全部多標籤頁
   * @param {*} state
   * @param {*} route
   * @returns
   */
  delRightVisitedRoutes(state, route) {
    let index = state.visitedRoutes.length
    state.visitedRoutes = state.visitedRoutes.filter((item) => {
      if (item.name === route.name) index = state.visitedRoutes.indexOf(item)
      return item.meta.affix || index >= state.visitedRoutes.indexOf(item)
    })
  },
  /**
   * @description 刪除全部多標籤頁
   * @param {*} state
   * @param {*} route
   * @returns
   */
  delAllVisitedRoutes(state) {
    state.visitedRoutes = state.visitedRoutes.filter((item) => item.meta.affix)
  },
}
const actions = {
  /**
   * @description 添加標籤頁
   * @param {*} { commit }
   * @param {*} route
   */
  addVisitedRoute({ commit }, route) {
    commit('addVisitedRoute', route)
  },
  /**
   * @description 刪除當前標籤頁
   * @param {*} { commit }
   * @param {*} route
   */
  delVisitedRoute({ commit }, route) {
    commit('delVisitedRoute', route)
  },
  /**
   * @description 刪除當前標籤頁以外其它全部多標籤頁
   * @param {*} { commit }
   * @param {*} route
   */
  delOthersVisitedRoutes({ commit }, route) {
    commit('delOthersVisitedRoutes', route)
  },
  /**
   * @description 刪除當前標籤頁左邊全部多標籤頁
   * @param {*} { commit }
   * @param {*} route
   */
  delLeftVisitedRoutes({ commit }, route) {
    commit('delLeftVisitedRoutes', route)
  },
  /**
   * @description 刪除當前標籤頁右邊全部多標籤頁
   * @param {*} { commit }
   * @param {*} route
   */
  delRightVisitedRoutes({ commit }, route) {
    commit('delRightVisitedRoutes', route)
  },
  /**
   * @description 刪除全部多標籤頁
   * @param {*} { commit }
   */
  delAllVisitedRoutes({ commit }) {
    commit('delAllVisitedRoutes')
  },
}
export default { state, getters, mutations, actions }
