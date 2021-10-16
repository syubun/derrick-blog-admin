// 加載插件
const requirePlugin = require.context('./plugins', true, /\.js$/)
requirePlugin.keys().forEach((fileName) => {
  requirePlugin(fileName)
})
