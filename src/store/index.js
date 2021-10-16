/**
 * @author chuzhixin 1204505056@qq.com
 * @description 導入所有 vuex 模塊，自動加入namespaced:true，用於解決vuex命名衝突，請勿修改。
 */
import { createStore } from 'vuex'

const files = require.context('./modules', false, /\.js$/)
const modules = {}
files.keys().forEach((key) => {
  modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
})
Object.keys(modules).forEach((key) => {
  modules[key]['namespaced'] = true
})
export default createStore({
  modules,
})
